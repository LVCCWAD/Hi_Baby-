// resources/js/Pages/User/UserChat.jsx

import React, { useRef, useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
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
} from "@mantine/core";
import Pusher from "pusher-js";

function UserChat() {
    const {
        messages: initialMessages,
        authUserId,
        adminId,
        newMessage,
    } = usePage().props;
    const [messages, setMessages] = useState(initialMessages || []);
    const viewport = useRef(null);


    const { data, setData, post, processing, reset } = useForm({
        message: "",
        receiver_id: adminId,
    });

    // Handle new flash message after Inertia redirect
    useEffect(() => {
        if (newMessage) {
            setMessages((prev) => [
                ...prev.filter(
                    (m) => !(m.id && String(m.id).startsWith("temp-"))
                ),
                newMessage,
            ]);
        }
    }, [newMessage]);

    // Initialize Pusher and listen for admin messages
    useEffect(() => {
        const pusher = new Pusher(
            import.meta.env.VITE_PUSHER_APP_KEY || "your-pusher-key",
            {
                cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || "ap1",
                forceTLS: true,
            }
        );

        const channel = pusher.subscribe("admin-messages");

        channel.bind("admin-message", function (data) {
            if (data.receiver_id === authUserId) {
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        });

        return () => {
            pusher.unsubscribe("admin-messages");
        };
    }, [authUserId]);

    const sendMessage = (e) => {
        e.preventDefault();

        if (!data.message.trim()) return;

        // ensure receiver_id is set
        setData("receiver_id", adminId);

        const tempMessage = {
            id: "temp-" + Date.now(),
            message: data.message,
            sender_id: authUserId,
            receiver_id: adminId,
            created_at: new Date().toISOString(),
            sender: { picture: null },
        };

        setMessages((prevMessages) => [...prevMessages, tempMessage]);

        post("/chat/send", data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => setData("message", ""), // Clear input field here
            onError: (errors) => {
                console.error("Error sending message:", errors);
                setMessages((prev) =>
                    prev.filter((m) => !String(m.id).startsWith("temp-"))
                );
            },
        });
    };

    useEffect(() => {
        if (viewport.current) {
            viewport.current.scrollTo({
                top: viewport.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    return (
        <Box maw={600} mx="auto" p="md">
            <Title order={3} mb="md">
                Chat with Support
            </Title>
            <ScrollArea h={400} viewportRef={viewport}>
                <Stack spacing="sm">
                    {messages.length === 0 ? (
                        <Text align="center" color="dimmed" py="xl">
                            No messages yet. Start a conversation!
                        </Text>
                    ) : (
                        messages.map((msg) => {
                            const isSender = msg.sender_id === authUserId;

                            return (
                                <Group
                                    key={msg.id}
                                    align="flex-end"
                                    noWrap
                                    style={{
                                        justifyContent: isSender
                                            ? "flex-end"
                                            : "flex-start",
                                    }}
                                >
                                    {!isSender && (
                                        <Avatar
                                            src={msg.sender?.picture}
                                            radius="xl"
                                            size="md"
                                        />
                                    )}

                                    <Paper
                                        shadow="xs"
                                        p="sm"
                                        radius="xl"
                                        withBorder
                                        style={{
                                            backgroundColor: isSender
                                                ? "#dbeafe"
                                                : "#f1f5f9",
                                            maxWidth: "70%",
                                            marginLeft: isSender
                                                ? "auto"
                                                : undefined,
                                            marginRight: isSender
                                                ? 0
                                                : undefined,
                                            borderTopRightRadius: isSender
                                                ? 0
                                                : undefined,
                                            borderTopLeftRadius: !isSender
                                                ? 0
                                                : undefined,
                                        }}
                                    >
                                        <Text size="sm">{msg.message}</Text>
                                        <Text
                                            size="xs"
                                            color="dimmed"
                                            align="right"
                                        >
                                            {new Date(
                                                msg.created_at
                                            ).toLocaleTimeString()}
                                        </Text>
                                    </Paper>

                                    {isSender && (
                                        <Avatar
                                            src={null}
                                            radius="xl"
                                            size="md"
                                        />
                                    )}
                                </Group>
                            );
                        })
                    )}
                </Stack>
            </ScrollArea>

            <form onSubmit={sendMessage}>
                <Group mt="md">
                    <TextInput
                        value={data.message}
                        onChange={(e) => setData("message", e.target.value)}
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

export default UserChat;
