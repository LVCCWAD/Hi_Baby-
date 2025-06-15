# 👶 Hi, Baby! — E-Commerce Platform for Baby & Toddler Clothing

Welcome to **Hi, Baby!**

At Hi, Baby, we believe every little giggle, snuggle, and step deserves to be wrapped in comfort and style. That’s why we’ve created a cozy corner of the internet where parents and gift-givers can find adorable, high-quality clothing for babies and toddlers.

---

## 🛠 Tech Stack

- **Backend:** Laravel (PHP)
- **Frontend:** React + Inertia.js + Mantine UI
- **Database:** MySQL / MariaDB
- **Package Manager:** Composer, NPM
- **Server:** Apache / Nginx (Production), Artisan Serve (Local)
- **Deployment:** Railway / Vercel / Any VPS
- **Version Control:** Git / GitHub

---

## ✨ Features

- ✅ User authentication & registration
- ✅ Product catalog with categories
- ✅ Cart & checkout system
- ✅ Order management
- ✅ Admin dashboard
- ✅ Database seeding for test data
- ✅ Responsive design using Mantine UI

---

## 📸 Screenshots

> *Add screenshots or demo gifs here if available.*

---

## 🚀 Local Installation

Follow these steps to set up the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/hibaby.git
cd hibaby
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan config:clear
php artisan config:cache
php artisan migrate
php artisan db:seed
php artisan serve
npm run dev
