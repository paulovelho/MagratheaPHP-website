<?php

namespace App\Http\Controllers;

class BenchController extends Controller
{
    public function hello()
    {
        return response()->json(['hello' => 'world'])
            ->header('X-Peak-Mem', (string) memory_get_peak_usage(false));
    }

    public function planets()
    {
        $planets = [
            ['id' => 1, 'name' => 'Mercury', 'diameter_km' => 4879],
            ['id' => 2, 'name' => 'Venus', 'diameter_km' => 12104],
            ['id' => 3, 'name' => 'Earth', 'diameter_km' => 12742],
            ['id' => 4, 'name' => 'Mars', 'diameter_km' => 6779],
            ['id' => 5, 'name' => 'Jupiter', 'diameter_km' => 139820],
        ];

        return response()->json($planets)
            ->header('X-Peak-Mem', (string) memory_get_peak_usage(false));
    }
}
