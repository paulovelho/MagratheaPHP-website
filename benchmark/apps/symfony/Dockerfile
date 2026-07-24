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
RUN composer create-project symfony/skeleton:^7.0 . --no-interaction

COPY apps/symfony/BenchController.php src/Controller/BenchController.php
COPY apps/htaccess public/.htaccess

ENV APP_ENV=prod APP_DEBUG=0
RUN composer dump-autoload --optimize --classmap-authoritative \
	&& php bin/console cache:warmup \
	&& chown -R www-data:www-data var
