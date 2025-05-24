<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Inertia\Inertia;
use App\Models\Admin;
use Inertia\Controller;
use Illuminate\Http\Request;
use App\Events\SendUserMessage;
use App\Events\SendAdminMessage;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;

class ChatsController extends Controller
{

    public function showChatstoAdminAndUser(Request $request)
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            $targetUserId = $request->query('user_id');

            if (!$targetUserId) {
                $users = User::where('role', 'user')->get(['id', 'username', 'picture']);
                return Inertia::render('Admin/UsersList', compact('users'));
            }

            $messages = Chat::with('sender', 'receiver')
                ->where(function ($q) use ($targetUserId, $user) {
                    $q->where('sender_id', $user->id)->where('receiver_id', $targetUserId);
                })->orWhere(function ($q) use ($targetUserId, $user) {
                    $q->where('sender_id', $targetUserId)->where('receiver_id', $user->id);
                })
                ->orderBy('created_at', 'asc')
                ->get();

            return Inertia::render('Admin/AdminChats', [
                'messages' => $messages,
                'authUserId' => $user->id,
                'targetUserId' => $targetUserId,
            ]);
        } else {
            // User chatting with admin
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
                'newMessage' => session('newMessage'), // for flash messages if needed
            ]);
        }
    }

    public function send(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'receiver_id' => 'required|exists:users,id',
        ]);

        $user = Auth::user();

        Chat::create([
            'sender_id' => $user->id,
            'receiver_id' => $validated['receiver_id'],
            'message' => $validated['message'],
        ]);

        // Load updated messages between sender and receiver:
        $messages = Chat::with('sender', 'receiver')
            ->where(function ($q) use ($user, $validated) {
                $q->where('sender_id', $user->id)
                    ->where('receiver_id', $validated['receiver_id']);
            })->orWhere(function ($q) use ($user, $validated) {
                $q->where('sender_id', $validated['receiver_id'])
                    ->where('receiver_id', $user->id);
            })->orderBy('created_at')->get();

        return Inertia::render('Admin/AdminChats', [
            'messages' => $messages,
            'authUserId' => $user->id,
            'targetUserId' => $validated['receiver_id'],
        ]);
    }






    // Fetch messages to show in the page (no JSON)
    public function fetchMessagesFromUserToAdmin()
    {
        $user = Auth::user();
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
            'adminId' => $admin->id,
            'authUserId' => $user->id,
        ]);
    }

    // Send message from user to admin
    public function sendMessageFromUserToAdmin(Request $request)
    {
        $user = Auth::user();
        $admin = User::where('role', 'admin')->firstOrFail();

        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $message = Chat::create([
            'sender_id' => $user->id,
            'receiver_id' => $admin->id,
            'message' => $validated['message'],
        ]);

        event(new SendUserMessage($message));

        return redirect()->back()->with('newMessage', $message);
    }

    // Admin chat with specific user
    public function adminChat($userId)
    {
        $admin = Auth::user();

        if ($admin->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $user = User::findOrFail($userId);

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
            'targetUser' => $user,
        ]);
    }

    // Admin send message to specific user
    public function adminSendMessage(Request $request)
    {
        $admin = Auth::user();

        if ($admin->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'message' => 'required|string|max:1000',
            'receiver_id' => 'required|exists:users,id',
        ]);

        $message = Chat::create([
            'sender_id' => $admin->id,
            'receiver_id' => $validated['receiver_id'],
            'message' => $validated['message'],
        ]);

        event(new SendAdminMessage($message));

        // Instead of returning JSON, redirect back to the chat with the user,
        // so Inertia gets a proper Inertia response.
        return redirect()->route('admin.chat', ['userId' => $validated['receiver_id']])
            ->with('success', 'Message sent successfully.');
    }
}
