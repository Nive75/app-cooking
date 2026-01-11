<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints as Assert;

class RecipeType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('titre', TextType::class, [
                'label' => 'Titre de la recette',
                'required' => true,
                'attr' => [
                    'class' => 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent',
                    'placeholder' => 'Ex: Salade César',
                    'maxlength' => 255,
                ],
                'constraints' => [
                    new Assert\NotBlank(['message' => 'Le titre est obligatoire']),
                    new Assert\Length([
                        'max' => 255,
                        'maxMessage' => 'Le titre ne peut pas dépasser {{ limit }} caractères',
                    ]),
                ],
            ])
            ->add('description', TextareaType::class, [
                'label' => 'Description',
                'required' => true,
                'attr' => [
                    'class' => 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent',
                    'placeholder' => 'Décrivez votre recette...',
                    'rows' => 5,
                ],
                'constraints' => [
                    new Assert\NotBlank(['message' => 'La description est obligatoire']),
                ],
            ])
            ->add('temps_preparation', IntegerType::class, [
                'label' => 'Temps de préparation (minutes)',
                'required' => false,
                'attr' => [
                    'class' => 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent',
                    'placeholder' => 'Ex: 30',
                    'min' => 0,
                ],
                'constraints' => [
                    new Assert\Type(['type' => 'integer', 'message' => 'Le temps de préparation doit être un nombre']),
                    new Assert\GreaterThanOrEqual(['value' => 0, 'message' => 'Le temps de préparation doit être positif']),
                ],
            ])
            ->add('image_url', UrlType::class, [
                'label' => 'URL de l\'image',
                'required' => false,
                'attr' => [
                    'class' => 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent',
                    'placeholder' => 'https://exemple.com/image.jpg',
                ],
                'constraints' => [
                    new Assert\Url(['message' => 'L\'URL de l\'image n\'est pas valide']),
                ],
            ])
            ->add('is_favorite', CheckboxType::class, [
                'label' => 'Recette favorite',
                'required' => false,
                'attr' => [
                    'class' => 'w-4 h-4 text-primary-green border-gray-300 rounded focus:ring-primary-green',
                ],
            ])
            ->add('ingredients', CollectionType::class, [
                'label' => 'Ingrédients',
                'entry_type' => RecipeIngredientType::class,
                'entry_options' => [
                    'ingredients' => $options['ingredients'] ?? [],
                ],
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
                'prototype' => true,
                'attr' => [
                    'class' => 'recipe-ingredients-collection',
                ],
            ])
            ->add('submit', SubmitType::class, [
                'label' => $options['is_edit'] ? 'Modifier la recette' : 'Créer la recette',
                'attr' => [
                    'class' => 'w-full bg-primary-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-green/90 transition-colors',
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'is_edit' => false,
            'ingredients' => [],
            'csrf_protection' => true,
            'csrf_field_name' => '_token',
            'csrf_token_id' => 'recipe_form',
        ]);
    }
}
