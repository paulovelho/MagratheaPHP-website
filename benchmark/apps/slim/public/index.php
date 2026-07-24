<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->get('/hello', function (Request $request, Response $response) {
    $response->getBody()->write(json_encode(["hello" => "world"]));
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withHeader('X-Peak-Mem', (string) memory_get_peak_usage(false));
});

$app->get('/planets', function (Request $request, Response $response) {
    $planets = [
        ["id" => 1, "name" => "Mercury", "diameter_km" => 4879],
        ["id" => 2, "name" => "Venus", "diameter_km" => 12104],
        ["id" => 3, "name" => "Earth", "diameter_km" => 12742],
        ["id" => 4, "name" => "Mars", "diameter_km" => 6779],
        ["id" => 5, "name" => "Jupiter", "diameter_km" => 139820],
    ];
    $response->getBody()->write(json_encode($planets));
    return $response
        ->withHeader('Content-Type', 'application/json')
        ->withHeader('X-Peak-Mem', (string) memory_get_peak_usage(false));
});

$app->run();
