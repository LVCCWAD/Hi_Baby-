#!/bin/bash

apt-get update && apt-get install -y libpq-dev
docker-php-ext-install pdo pdo_pgsql

composer install --no-dev --optimize-autoloader
php artisan config:clear
php artisan migrate --force
