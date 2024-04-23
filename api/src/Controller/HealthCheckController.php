<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class HealthCheckController extends AbstractController
{

    #[Route('/api/v1/healthCheck', name: 'health_check', methods: ['GET'])]
    public function getHealthCheck(): JsonResponse
    {
        return new JsonResponse([
            'status' => "I'm alive",
            'code' => 'ok'
        ]);
    }
}