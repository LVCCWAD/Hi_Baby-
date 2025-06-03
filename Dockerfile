FROM php:8.2-fpm

# Install system dependencies + Node.js and npm
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev \
    zip \
    nodejs \
    npm \
    && docker-php-ext-install pdo pdo_pgsql mbstring zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy package.json and package-lock.json first to leverage Docker cache on npm install
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy rest of the application files
COPY . .

# Install PHP dependencies without dev and optimize autoloader
RUN composer install --no-dev --optimize-autoloader

# Build frontend assets with Vite
RUN npm run build

# Cache Laravel config for production
RUN php artisan config:cache

# Set proper permissions for storage and cache directories
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
