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
    && docker-php-ext-install pdo pdo_pgsql mbstring zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy only package.json and package-lock.json first to cache npm installs
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy rest of the project files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Build frontend assets with Vite
RUN npm run build

# Clear Laravel config cache
RUN php artisan config:clear

# Default command
CMD ["php-fpm"]
