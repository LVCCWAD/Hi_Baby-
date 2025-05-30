cd backend

# Install dependencies
composer install

# Copy and configure .env
cp .env.example .env

# Generate app key
php artisan key:generate

# Set up database (in .env), then migrate
php artisan migrate --seed

# Optional: Set up storage link
php artisan storage:link

# Start Laravel server
php artisan serve


cd ../frontend

# Install frontend dependencies
npm install

# Start React app with Vite
npm run dev

