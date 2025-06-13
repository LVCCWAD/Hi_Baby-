<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use App\Models\OrderItem;
use App\Models\SearchLog;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function dashboard()
    {
        // Get analytics data
        $analytics = $this->getAnalyticsData();

        return Inertia::render('Admin/Dashboard', [
            'analytics' => $analytics
        ]);
    }

    private function getAnalyticsData()
    {
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();
        $thisMonth = Carbon::now()->startOfMonth();
        $lastMonth = Carbon::now()->subMonth()->startOfMonth();

        // Today's sales
        $todaysSales = Order::whereDate('created_at', $today)
            ->where('status', '!=', 'cancelled')
            ->sum('total_amount');

        $yesterdaysSales = Order::whereDate('created_at', $yesterday)
            ->where('status', '!=', 'cancelled')
            ->sum('total_amount');

        $todaysSalesChange = $yesterdaysSales > 0
            ? (($todaysSales - $yesterdaysSales) / $yesterdaysSales) * 100
            : 0;

        // Total sales
        $totalSales = Order::where('status', '!=', 'cancelled')
            ->sum('total_amount');

        $thisMonthSales = Order::where('created_at', '>=', $thisMonth)
            ->where('status', '!=', 'cancelled')
            ->sum('total_amount');

        $lastMonthSales = Order::whereBetween('created_at', [$lastMonth, $thisMonth])
            ->where('status', '!=', 'cancelled')
            ->sum('total_amount');

        $totalSalesChange = $lastMonthSales > 0
            ? (($thisMonthSales - $lastMonthSales) / $lastMonthSales) * 100
            : 0;

        // Total orders
        $totalOrders = Order::where('status', '!=', 'cancelled')->count();
        $thisMonthOrders = Order::where('created_at', '>=', $thisMonth)
            ->where('status', '!=', 'cancelled')
            ->count();
        $lastMonthOrders = Order::whereBetween('created_at', [$lastMonth, $thisMonth])
            ->where('status', '!=', 'cancelled')
            ->count();

        $totalOrdersChange = $lastMonthOrders > 0
            ? (($thisMonthOrders - $lastMonthOrders) / $lastMonthOrders) * 100
            : 0;

        // Total customers
        $totalCustomers = User::where('role', 'user')->count();
        $thisMonthCustomers = User::where('role', 'user')
            ->where('created_at', '>=', $thisMonth)
            ->count();
        $lastMonthCustomers = User::where('role', 'user')
            ->whereBetween('created_at', [$lastMonth, $thisMonth])
            ->count();

        $totalCustomersChange = $lastMonthCustomers > 0
            ? (($thisMonthCustomers - $lastMonthCustomers) / $lastMonthCustomers) * 100
            : 0;

        // Chart data for last 12 months
        $chartData = $this->getChartData();

        // Top search terms
        $topSearchTerms = SearchLog::getTopSearchTerms(5);

        return [
            'statCards' => [
                [
                    'title' => "TODAY'S SALE",
                    'value' => '₱' . number_format($todaysSales, 2),
                    'change' => round(abs($todaysSalesChange), 1),
                    'isPositive' => $todaysSalesChange >= 0
                ],
                [
                    'title' => 'TOTAL SALES',
                    'value' => '₱' . number_format($totalSales, 2),
                    'change' => round(abs($totalSalesChange), 1),
                    'isPositive' => $totalSalesChange >= 0
                ],
                [
                    'title' => 'TOTAL ORDERS',
                    'value' => number_format($totalOrders),
                    'change' => round(abs($totalOrdersChange), 1),
                    'isPositive' => $totalOrdersChange >= 0
                ],
                [
                    'title' => 'TOTAL CUSTOMERS',
                    'value' => number_format($totalCustomers),
                    'change' => round(abs($totalCustomersChange), 1),
                    'isPositive' => $totalCustomersChange >= 0
                ]
            ],
            'chartData' => $chartData,
            'searchTerms' => $topSearchTerms,
        ];
    }

    private function getChartData()
    {
        $data = [];

        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $startOfMonth = $date->copy()->startOfMonth();
            $endOfMonth = $date->copy()->endOfMonth();

            $sales = Order::whereBetween('created_at', [$startOfMonth, $endOfMonth])
                ->where('status', '!=', 'cancelled')
                ->sum('total_amount');

            $orders = Order::whereBetween('created_at', [$startOfMonth, $endOfMonth])
                ->where('status', '!=', 'cancelled')
                ->count();

            $data[] = [
                'date' => $date->format('M'),
                'Sales' => (int) $sales,
                'Orders' => $orders
            ];
        }

        return $data;
    }

    public function products()
    {
        return  Inertia::render('Admin/Products');
    }


    public function orders()
    {
        return  Inertia::render('Admin/Orders');
    }
}
