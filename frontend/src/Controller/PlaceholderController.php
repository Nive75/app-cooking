<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PlaceholderController extends AbstractController
{
    #[Route('/favorites', name: 'app_favorites')]
    public function favorites(): Response
    {
        return $this->render('dashboard/index.html.twig', [
            'page_title' => 'Favoris',
        ]);
    }

    #[Route('/shopping-list', name: 'app_shopping_list')]
    public function shoppingList(): Response
    {
        return $this->render('dashboard/index.html.twig', [
            'page_title' => 'Liste de courses',
        ]);
    }

    #[Route('/settings', name: 'app_settings')]
    public function settings(): Response
    {
        return $this->render('dashboard/index.html.twig', [
            'page_title' => 'Paramètres',
        ]);
    }

    #[Route('/help', name: 'app_help')]
    public function help(): Response
    {
        return $this->render('dashboard/index.html.twig', [
            'page_title' => 'Aide',
        ]);
    }
}

