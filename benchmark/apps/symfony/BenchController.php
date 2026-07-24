<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class BenchController extends AbstractController
{
    #[Route('/hello', methods: ['GET'])]
    public function hello(): JsonResponse
    {
        return new JsonResponse(
            ['hello' => 'world'],
            200,
            ['X-Peak-Mem' => (string) memory_get_peak_usage(false)]
        );
    }

    #[Route('/planets', methods: ['GET'])]
    public function planets(): JsonResponse
    {
        $planets = [
            ['id' => 1, 'name' => 'Mercury', 'diameter_km' => 4879],
            ['id' => 2, 'name' => 'Venus', 'diameter_km' => 12104],
            ['id' => 3, 'name' => 'Earth', 'diameter_km' => 12742],
            ['id' => 4, 'name' => 'Mars', 'diameter_km' => 6779],
            ['id' => 5, 'name' => 'Jupiter', 'diameter_km' => 139820],
        ];

        return new JsonResponse(
            $planets,
            200,
            ['X-Peak-Mem' => (string) memory_get_peak_usage(false)]
        );
    }
}
