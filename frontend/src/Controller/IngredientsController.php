<?php

namespace App\Controller;

use App\Form\IngredientType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class IngredientsController extends AbstractController
{
    public function __construct(
        private readonly HttpClientInterface $httpClient
    ) {
    }
    
    private function getBackendUrl(): string
    {
        return $_ENV['APP_BACKEND_URL'] ?? $_SERVER['APP_BACKEND_URL'] ?? 'http://backend:3000';
    }

    #[Route('/ingredients', name: 'app_ingredients')]
    public function index(): Response
    {
        return $this->render('ingredients/index.html.twig', [
            'page_title' => 'Mes Ingrédients',
        ]);
    }

    #[Route('/ingredients/new', name: 'app_ingredients_new')]
    public function new(Request $request): Response
    {
        $form = $this->createForm(IngredientType::class, null, [
            'is_edit' => false,
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            
            try {
                // Envoyer les données à l'API backend
                $response = $this->httpClient->request('POST', "{$this->getBackendUrl()}/api/ingredients", [
                    'json' => $data,
                    'headers' => [
                        'Content-Type' => 'application/json',
                    ],
                ]);

                if ($response->getStatusCode() === 201) {
                    $this->addFlash('success', 'Ingrédient créé avec succès !');
                    return $this->redirectToRoute('app_ingredients');
                }
            } catch (\Exception $e) {
                $this->addFlash('error', 'Erreur lors de la création de l\'ingrédient : ' . $e->getMessage());
            }
        }

        return $this->render('ingredients/new.html.twig', [
            'page_title' => 'Créer un ingrédient',
            'form' => $form,
        ]);
    }

    #[Route('/ingredients/{id}/edit', name: 'app_ingredients_edit')]
    public function edit(int $id, Request $request): Response
    {
        try {
            // Récupérer l'ingrédient depuis l'API
            $response = $this->httpClient->request('GET', "{$this->getBackendUrl()}/api/ingredients/{$id}");
            $ingredient = $response->toArray();
        } catch (\Exception $e) {
            $this->addFlash('error', 'Ingrédient introuvable');
            return $this->redirectToRoute('app_ingredients');
        }

        $form = $this->createForm(IngredientType::class, $ingredient, [
            'is_edit' => true,
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            
            try {
                // Mettre à jour l'ingrédient via l'API
                $response = $this->httpClient->request('PATCH', "{$this->getBackendUrl()}/api/ingredients/{$id}", [
                    'json' => $data,
                    'headers' => [
                        'Content-Type' => 'application/json',
                    ],
                ]);

                if ($response->getStatusCode() === 200) {
                    $this->addFlash('success', 'Ingrédient modifié avec succès !');
                    return $this->redirectToRoute('app_ingredients');
                }
            } catch (\Exception $e) {
                $this->addFlash('error', 'Erreur lors de la modification de l\'ingrédient : ' . $e->getMessage());
            }
        }

        return $this->render('ingredients/edit.html.twig', [
            'page_title' => 'Modifier l\'ingrédient',
            'form' => $form,
            'ingredient' => $ingredient,
        ]);
    }
}
