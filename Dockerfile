FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    unzip curl git libzip-dev libpq-dev libonig-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy app and prebuilt assets
COPY . .
COPY public/build ./public/build

RUN composer install --no-dev --optimize-autoloader
RUN php artisan config:cache
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
