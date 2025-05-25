// resources/js/Pages/Admin/AdminChats.jsx

import React, { useRef, useEffect, useState } from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import {
    Box,
    ScrollArea,
    TextInput,
    Button,
    Group,
    Paper,
    Text,
    Avatar,
    Stack,
    Title,
    Flex,
} from "@mantine/core";
import Pusher from 'pusher-js';

function AdminChat() {
    const { messages: initialMessages, authUserId, targetUserId, targetUser } = usePage().props;
    const [messages, setMessages] = useState(initialMessages);
    const viewport = useRef(null);

    const { data, setData, post, processing, reset } = useForm({
        message: "",
        receiver_id: targetUserId,
    });

    // Initialize Pusher
    useEffect(() => {
        // Enable pusher logging - don't include this in production
        // Pusher.logToConsole = true;

        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY || '5a7697f73e3c287f4892', {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || 'ap1',
            forceTLS: true
        });

        const channel = pusher.subscribe('admin-messages');

        // Listen for user messages
        channel.bind('user-message', function(data) {
            if (data.receiver_id === authUserId && data.sender_id === targetUserId) {
                setMessages(prevMessages => [...prevMessages, data]);
            }
        });

        return () => {
            pusher.unsubscribe('admin-messages');
        };
    }, [authUserId, targetUserId]);

    const sendMessage = (e) => {
        e.preventDefault();

        if (!data.message.trim()) return;

        // Add optimistic UI update
        const tempMessage = {
            id: 'temp-' + Date.now(),
            message: data.message,
            sender_id: authUserId,
            receiver_id: targetUserId,
            created_at: new Date().toISOString(),
            sender: { picture: null } // Add any admin data needed
        };

        setMessages(prevMessages => [...prevMessages, tempMessage]);

        post(route('chat.send'), {
            preserveScroll: true,
            onSuccess: (response) => {
                // Replace the temporary message with the actual one from the server
                if (response?.message) {
                    setMessages(prevMessages =>
                        prevMessages.map(msg =>
                            msg.id === tempMessage.id ? response.message : msg
                        )
                    );
                }
                reset('message');
            },
            onError: (errors) => {
                console.error('Error sending message:', errors);
                // Remove the temporary message if there was an error
                setMessages(prevMessages =>
                    prevMessages.filter(msg => msg.id !== tempMessage.id)
                );
            }
        });
    };

    useEffect(() => {
        if (viewport.current) {
            viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: "smooth" });
        }
    }, [messages]);

    return (
        <Box maw={600} mx="auto" p="md">
            <Flex justify="space-between" align="center" mb="md">
                <Link href="/chat" style={{ textDecoration: 'none' }}>
                    <Text size="sm" color="blue">← Back to Users</Text>
                </Link>
                <Title order={3}>Chat with {targetUser?.username || 'User'}</Title>
                <div></div> {/* Empty div for flex spacing */}
            </Flex>

            <ScrollArea h={400} viewportRef={viewport}>
                <Stack spacing="sm">
                    {messages.length === 0 ? (
                        <Text align="center" color="dimmed" py="xl">No messages yet. Start a conversation!</Text>
                    ) : (
                        messages.map(msg => (
                            <Group
                                key={msg.id}
                                position={msg.sender_id === authUserId ? "right" : "left"}
                                spacing="xs"
                                align="flex-start"
                                noWrap
                            >
                                {msg.sender_id !== authUserId && (
                                    <Avatar src={msg.sender?.picture} radius="xl" size="sm" />
                                )}
                                <Paper
                                    shadow="xs"
                                    p="sm"
                                    radius="md"
                                    withBorder
                                    style={{
                                        backgroundColor: msg.sender_id === authUserId ? '#d1fae5' : '#f3f4f6',
                                        maxWidth: "70%",
                                    }}
                                >
                                    <Text size="sm">{msg.message}</Text>
                                    <Text size="xs" color="dimmed" align="right">
                                        {new Date(msg.created_at).toLocaleTimeString()}
                                    </Text>
                                </Paper>
                                {msg.sender_id === authUserId && (
                                    <Avatar src={null} radius="xl" size="sm" />
                                )}
                            </Group>
                        ))
                    )}
                </Stack>
            </ScrollArea>

            <form onSubmit={sendMessage}>
                <Group mt="md">
                    <TextInput
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        placeholder="Type your message..."
                        style={{ flex: 1 }}
                        required
                    />
                    <Button type="submit" loading={processing}>
                        Send
                    </Button>
                </Group>
            </form>
        </Box>
    );
}

export default AdminChat;
