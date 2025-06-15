# 👶 Hi, Baby! — E-Commerce Platform for Baby & Toddler Clothing

Welcome to **Hi, Baby!**

At Hi, Baby, we believe every little giggle, snuggle, and step deserves to be wrapped in comfort and style. That’s why we’ve created a cozy corner of the internet where parents and gift-givers can find adorable, high-quality clothing for babies and toddlers.

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

> ![image](https://github.com/user-attachments/assets/34839c3a-08f6-4976-91e8-0a700a2a9fb9)


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
