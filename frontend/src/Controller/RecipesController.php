<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class RecipesController extends AbstractController
{
    #[Route('/recipes', name: 'app_recipes')]
    public function index(): Response
    {
        return $this->render('recipes/index.html.twig', [
            'page_title' => 'Mes Recettes',
        ]);
    }

    #[Route('/recipes/new', name: 'app_recipes_new')]
    public function new(): Response
    {
        return $this->render('recipes/new.html.twig', [
            'page_title' => 'Créer une recette',
        ]);
    }
}

