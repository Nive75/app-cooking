import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type PeriodKind = 'firstHalf' | 'secondHalf';

function pad2(n: number) {
  return n.toString().padStart(2, '0');
}

function formatLocalDate(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function startOfLocalDay(d: Date) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
}

// Monday = 0 ... Sunday = 6
function mondayIndex(d: Date) {
  return (d.getDay() + 6) % 7;
}

function startOfWeekMonday(d: Date) {
  const date = startOfLocalDay(d);
  date.setDate(date.getDate() - mondayIndex(date));
  return date;
}

function endOfWeekSunday(d: Date) {
  const date = startOfLocalDay(d);
  date.setDate(date.getDate() + (6 - mondayIndex(date)));
  return date;
}

function lastDayOfMonth(year: number, month0: number) {
  return new Date(year, month0 + 1, 0).getDate();
}

function computeFortnightPeriod(now: Date) {
  const today = startOfLocalDay(now);
  const year = today.getFullYear();
  const month0 = today.getMonth();
  const day = today.getDate();

  const kind: PeriodKind = day <= 15 ? 'firstHalf' : 'secondHalf';
  const anchorStartDay = kind === 'firstHalf' ? 1 : 16;
  const anchorEndDay = kind === 'firstHalf' ? 15 : lastDayOfMonth(year, month0);

  const anchorStart = new Date(year, month0, anchorStartDay);
  const anchorEnd = new Date(year, month0, anchorEndDay);

  const periodStart = startOfWeekMonday(anchorStart);
  const periodEnd = endOfWeekSunday(anchorEnd);

  const period = {
    kind,
    today,
    anchorStart,
    anchorEnd,
    periodStart,
    periodEnd,
  };
  return period;
}

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(referenceDate?: string) {
    const now = referenceDate ? new Date(`${referenceDate}T12:00:00`) : new Date();
    const { kind, today, anchorStart, anchorEnd, periodStart, periodEnd } =
      computeFortnightPeriod(now);

    // "À venir" (Option A): from today to end of current period
    const upcomingStart = today;
    const upcomingEnd = periodEnd;

    const [recipesCount, favoritesCount, upcomingCount, latestRecipe] = await Promise.all([
      this.prisma.recipe.count(),
      this.prisma.recipe.count({
        // Type assertion avoids stale IDE/tsserver excess-property errors after schema changes
        where: { is_favorite: true } as Prisma.RecipeWhereInput,
      }),
      this.prisma.mealPlan.count({
        where: {
          date: {
            gte: upcomingStart,
            lte: upcomingEnd,
          },
        },
      }),
      this.prisma.recipe.findFirst({
        orderBy: { created_at: 'desc' },
        select: { created_at: true },
      }),
    ]);

    let latestCreatedAt: Date | null = null;
    if (latestRecipe) {
      latestCreatedAt = latestRecipe.created_at;
    }
    let latestDaysAgo: number | null = null;
    if (latestCreatedAt) {
      const nowStart = startOfLocalDay(new Date()).getTime();
      const createdStart = startOfLocalDay(latestCreatedAt).getTime();
      latestDaysAgo = Math.floor((nowStart - createdStart) / (1000 * 60 * 60 * 24));
    }

    let latestCreatedAtFormatted: string | null = null;
    if (latestCreatedAt) {
      latestCreatedAtFormatted = formatLocalDate(latestCreatedAt);
    }

    const summary = {
      period: {
        kind,
        // anchors are the "01-15" or "16-end" raw bounds
        anchorStart: formatLocalDate(anchorStart),
        anchorEnd: formatLocalDate(anchorEnd),
        // real bounds used for planning: aligned to Monday->Sunday
        start: formatLocalDate(periodStart),
        end: formatLocalDate(periodEnd),
      },
      kpis: {
        recipes: recipesCount,
        upcoming: upcomingCount,
        favorites: favoritesCount,
        latestCreatedAt: latestCreatedAtFormatted,
        latestDaysAgo,
      },
    };
    return summary;
  }
}


