FROM php:8.3-apache
RUN apt-get update && apt-get install -y git unzip && rm -rf /var/lib/apt/lists/* \
	&& docker-php-ext-install opcache
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY php/php.ini /usr/local/etc/php/conf.d/bench.ini

ENV APACHE_DOCUMENT_ROOT=/var/www/app/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
	&& printf '<Directory /var/www/app/public>\nAllowOverride All\nRequire all granted\n</Directory>\n' > /etc/apache2/conf-available/bench.conf \
	&& a2enconf bench && a2enmod rewrite

WORKDIR /var/www/app
RUN composer create-project laravel/laravel:^12.0 . --no-dev --prefer-dist --no-interaction

RUN sed -i 's/^APP_ENV=.*/APP_ENV=production/; s/^APP_DEBUG=.*/APP_DEBUG=false/; s/^LOG_LEVEL=.*/LOG_LEVEL=error/' .env

COPY apps/laravel/bootstrap-app.php bootstrap/app.php
COPY apps/laravel/routes/bench.php routes/bench.php
COPY apps/laravel/BenchController.php app/Http/Controllers/BenchController.php

RUN composer dump-autoload --optimize \
	&& php artisan config:cache \
	&& php artisan route:cache \
	&& chown -R www-data:www-data storage bootstrap/cache
