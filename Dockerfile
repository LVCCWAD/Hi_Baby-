FROM php:8.2-fpm

# Install system dependencies + use NodeSource for recent Node.js version
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    libzip-dev \
    libpq-dev \
    libonig-dev \
    gnupg2 \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install pdo pdo_pgsql mbstring zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy package.json files and install JS deps with less memory
COPY package*.json ./

# Use --omit=dev to avoid installing large dev dependencies
RUN npm install --omit=dev

# Copy application source files
COPY . .

# Install PHP dependencies (optimized for prod)
RUN composer install --no-dev --optimize-autoloader

# Build frontend assets — keep it minimal
RUN NODE_OPTIONS="--max-old-space-size=256" npm run build

# Laravel config cache
RUN php artisan config:cache

# Fix permissions
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
