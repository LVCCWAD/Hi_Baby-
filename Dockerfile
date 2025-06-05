FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev \
    zip \
    && docker-php-ext-install pdo pdo_pgsql mbstring zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy project files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Laravel setup commands (optional here)
RUN php artisan config:clear

CMD ["php-fpm"]
