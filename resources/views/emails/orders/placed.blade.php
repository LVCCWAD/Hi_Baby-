<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Order Confirmation - Hi, Baby!</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f6f8;
            color: #333;
            margin: 0;
            padding: 20px;
        }

        .email-card {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header img {
            height: 60px;
            margin-bottom: 10px;
        }

        h1 {
            color: #27ae60;
            font-size: 24px;
            margin-bottom: 10px;
        }

        h3 {
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
            margin-top: 30px;
            color: #555;
        }

        p {
            margin: 8px 0;
        }

        ul {
            list-style: none;
            padding: 0;
        }

        li {
            margin-bottom: 15px;
            line-height: 1.5;
            border-bottom: 1px dashed #ddd;
            padding-bottom: 10px;
        }

        .total {
            font-size: 18px;
            font-weight: bold;
            margin-top: 20px;
            color: #2c3e50;
        }

        .footer {
            margin-top: 40px;
            font-size: 13px;
            color: #777;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="email-card">
        <div class="header">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQMTkhi6dVywItbH0fXUvBfVDoDb1RrFLpg&s"
                alt="Hi, Baby! Logo" style="height: 100px; margin-bottom: 20px;">
            <h1>Thank You for Your Order!</h1>
        </div>

        <p>Dear {{ $order->user->name ?? 'Customer' }},</p>

        <p>We’ve received your order and will process it shortly. Here are the details:</p>

        <p><strong>Order ID:</strong> {{ $order->id }}</p>
        <p class="total"><strong>Total Amount:</strong> ₱{{ number_format($order->total_amount, 2) }}</p>

        <p><strong>Mode of Payment:</strong> {{ ucfirst($order->payment_method ?? 'Not specified') }}</p>

        <p><strong>Shipping Address:</strong></p>
        <p>{{ $order->address ?? 'N/A' }}</p>


        <h3>Order Summary</h3>
        <ul>
            @foreach ($order->items as $item)
                <li>
                    <strong>{{ $item->product->name ?? 'Product' }}</strong><br>
                    Color: {{ $item->color->name ?? 'N/A' }}<br>
                    Size: {{ $item->size->name ?? 'N/A' }}<br>
                    Quantity: {{ $item->quantity }}<br>
                    Subtotal: ₱{{ number_format($item->price * $item->quantity, 2) }}
                </li>
            @endforeach
        </ul>

        <p>If you have any questions, feel free to contact our support team anytime.</p>

        <div class="footer">
            &mdash; Hi, Baby! Team<br>
            <a href="mailto:no-reply@hibaby.com">no-reply@hibaby.com</a>
        </div>
    </div>
</body>

</html>
