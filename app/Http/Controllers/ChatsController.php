<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\SendUserMessage;
use App\Events\SendAdminMessage;

class ChatsController extends Controller
{
    // ✅ Main chat entry for both Admin and User
    public function showChatstoAdminAndUser(Request $request)
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            $targetUserId = $request->query('user_id');

            if (!$targetUserId) {
                $users = User::where('role', 'user')->get()->map(function ($user) {
                    $latestMessage = Chat::where(function ($q) use ($user) {
                        $q->where('sender_id', $user->id)
                          ->orWhere('receiver_id', $user->id);
                    })->orderBy('created_at', 'desc')->first();

                    $unreadCount = Chat::where('sender_id', $user->id)
                        ->where('receiver_id', Auth::id())
                        ->where('is_read', false)
                        ->count();

                    return [
                        'id' => $user->id,
                        'username' => $user->username,
                        'picture' => $user->picture,
                        'latest_message' => $latestMessage ? [
                            'message' => $latestMessage->message,
                            'created_at' => $latestMessage->created_at
                        ] : null,
                        'unread_count' => $unreadCount
                    ];
                });

                $users = $users->sortByDesc(function ($user) {
                    return $user['latest_message']['created_at'] ?? now()->subYears(10);
                })->values();

                return Inertia::render('Admin/UsersList', compact('users'));
            }

            return $this->adminChat($targetUserId);
        }

        // User view (chat with Admin)
        $admin = User::where('role', 'admin')->firstOrFail();

        $messages = Chat::with('sender', 'receiver')
            ->where(function ($q) use ($admin, $user) {
                $q->where('sender_id', $user->id)->where('receiver_id', $admin->id);
            })->orWhere(function ($q) use ($admin, $user) {
                $q->where('sender_id', $admin->id)->where('receiver_id', $user->id);
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return Inertia::render('User/UserChat', [
            'messages' => $messages,
            'authUserId' => $user->id,
            'adminId' => $admin->id,
            'newMessage' => session('newMessage'),
            'userProfile' => [
                'username' => $admin->username,
                'picture' => $admin->picture,
            ],
        ]);
    }

    // ✅ Admin chat with specific user
    public function adminChat($userId)
    {
        $admin = Auth::user();

        if ($admin->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $user = User::findOrFail($userId);

        Chat::where('sender_id', $userId)
            ->where('receiver_id', $admin->id)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        $messages = Chat::with('sender', 'receiver')
            ->where(function ($q) use ($userId, $admin) {
                $q->where('sender_id', $admin->id)->where('receiver_id', $userId);
            })->orWhere(function ($q) use ($userId, $admin) {
                $q->where('sender_id', $userId)->where('receiver_id', $admin->id);
            })
            ->orderBy('created_at', 'asc')
            ->get();

        return Inertia::render('Admin/AdminChats', [
            'messages' => $messages,
            'authUserId' => $admin->id,
            'targetUserId' => $userId,
            'targetUser' => [
                'username' => $user->username,
                'picture' => $user->picture,
            ],
        ]);
    }

    // ✅ General send message (user or admin)
    public function send(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'receiver_id' => 'required|exists:users,id',
        ]);

        $user = Auth::user();

        $chat = Chat::create([
            'sender_id' => $user->id,
            'receiver_id' => $validated['receiver_id'],
            'message' => $validated['message'],
        ]);

        // Emit events depending on who is sending
        if ($user->role === 'admin') {
            event(new SendAdminMessage($chat));
        } else {
            event(new SendUserMessage($chat));
        }

        return redirect()->back();
    }

    // ✅ (Optional) simplified version for Admin send message directly (you can remove this if using `send()` for both)
    public function adminSendMessage(Request $request)
    {
        $admin = Auth::user();

        if ($admin->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'message' => 'required|string|max:1000',
            'receiver_id' => 'required|exists:users,id',
        ]);

        $chat = Chat::create([
            'sender_id' => $admin->id,
            'receiver_id' => $validated['receiver_id'],
            'message' => $validated['message'],
        ]);

        event(new SendAdminMessage($chat));

        return Inertia::location(route('admin.chat', ['userId' => $validated['receiver_id']]));
    }
}
