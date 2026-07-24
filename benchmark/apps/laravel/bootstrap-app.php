<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// Routes registered via `using` so no session/cookie middleware group is
// applied — keeps the comparison fair against the API-only micro-frameworks.
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        using: function () {
            require __DIR__.'/../routes/bench.php';
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
