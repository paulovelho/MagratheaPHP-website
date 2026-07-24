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
COPY apps/slim/composer.json ./
RUN composer install --no-dev --optimize-autoloader --no-interaction

COPY apps/slim/public ./public
COPY apps/htaccess ./public/.htaccess
