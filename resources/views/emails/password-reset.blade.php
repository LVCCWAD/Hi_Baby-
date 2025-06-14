<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Reset Your Password - Hi Baby!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f6f1;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 32px;
            font-weight: bold;
            color: #abc32f;
            margin-bottom: 10px;
        }
        .title {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
        }
        .content {
            margin-bottom: 30px;
        }
        .button {
            display: inline-block;
            background-color: #BAB86C;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            margin: 20px 0;
        }
        .button:hover {
            background-color: #a8a55e;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
            text-align: center;
        }
        .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Hi Baby!</div>
            <h1 class="title">Reset Your Password</h1>
        </div>

        <div class="content">
            <p>Hello {{ $user->first_name ?? $user->name ?? 'there' }},</p>

            <p>We received a request to reset your password for your Hi Baby! account. If you made this request, click the button below to reset your password:</p>

            <div style="text-align: center;">
                <a href="{{ $resetUrl }}" class="button">Reset Password</a>
            </div>

            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 5px; font-family: monospace;">{{ $resetUrl }}</p>

            <div class="warning">
                <strong>Important:</strong> This password reset link will expire in 24 hours for security reasons.
            </div>

            <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
        </div>

        <div class="footer">
            <p>Thanks,<br>The Hi Baby! Team</p>
            <p style="font-size: 12px; margin-top: 20px;">
                If you're having trouble clicking the "Reset Password" button, copy and paste the URL above into your web browser.
            </p>
        </div>
    </div>
</body>
</html>
