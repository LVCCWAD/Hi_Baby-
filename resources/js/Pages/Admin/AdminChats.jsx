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
    Divider,
    Card,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Pusher from "pusher-js";

function AdminChat() {
    const {
        messages: initialMessages,
        authUserId,
        targetUserId,
        targetUser,
    } = usePage().props;
    const [messages, setMessages] = useState(initialMessages);
    const viewport = useRef(null);

    const { data, setData, post, processing, reset } = useForm({
        message: "",
        receiver_id: targetUserId,
    });

    // Initialize Pusher
    useEffect(() => {
        const pusher = new Pusher(
            import.meta.env.VITE_PUSHER_APP_KEY || "your-pusher-key",
            {
                cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || "ap1",
                forceTLS: true,
            }
        );

        const channel = pusher.subscribe("admin-messages");

        channel.bind("user-message", function (data) {
            if (
                data.receiver_id === authUserId &&
                data.sender_id === targetUserId
            ) {
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        });

        return () => {
            pusher.unsubscribe("admin-messages");
        };
    }, [authUserId, targetUserId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!data.message.trim()) return;

        const tempMessage = {
            id: "temp-" + Date.now(),
            message: data.message,
            sender_id: authUserId,
            receiver_id: targetUserId,
            created_at: new Date().toISOString(),
            sender: { picture: null },
        };

        setMessages((prev) => [...prev, tempMessage]);

        post("admin/chat/send", data, {
            preserveScroll: true,
            onSuccess: () => reset("message"),
            onError: (errors) => {
                console.error("Error sending message:", errors);
                setMessages((prev) =>
                    prev.filter(
                        (msg) => !(msg.id && String(msg.id).startsWith("temp-"))
                    )
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
        <Box maw={700} mx="auto" p="md">
            <Card shadow="sm" radius="md" withBorder padding="md">
                <Flex justify="space-between" align="center" mb="md">
                    <Link href="/chat" style={{ textDecoration: "none" }}>
                        <Button
                            variant="light"
                            color="blue"
                            size="xs"
                            leftSection={<IconArrowLeft size={16} />}
                        >
                            Back
                        </Button>
                    </Link>
                    <Title order={4}>
                        Chat with {targetUser?.username || "User"}
                    </Title>
                    <div style={{ width: "50px" }} /> {/* Spacer */}
                </Flex>

                <Divider my="xs" />

                <ScrollArea h={400} viewportRef={viewport}>
                    <Stack spacing="xs" p="sm">
                        {messages.length === 0 ? (
                            <Text
                                align="center"
                                color="dimmed"
                                py="xl"
                                size="sm"
                            >
                                No messages yet. Start a conversation!
                            </Text>
                        ) : (
                            messages.map((msg) => (
                                <Group
                                    key={msg.id}
                                    position="left"
                                    align="flex-end"
                                    noWrap
                                    style={{
                                        justifyContent:
                                            msg.sender_id === authUserId
                                                ? "flex-end"
                                                : "flex-start",
                                    }}
                                >
                                    {msg.sender_id !== authUserId && (
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
                                            backgroundColor:
                                                msg.sender_id === authUserId
                                                    ? "#e0f7fa"
                                                    : "#f1f5f9",
                                            maxWidth: "70%",
                                            marginLeft:
                                                msg.sender_id === authUserId
                                                    ? "auto"
                                                    : undefined,
                                            marginRight:
                                                msg.sender_id === authUserId
                                                    ? 0
                                                    : undefined,
                                            borderTopRightRadius:
                                                msg.sender_id === authUserId
                                                    ? 0
                                                    : undefined,
                                            borderTopLeftRadius:
                                                msg.sender_id !== authUserId
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

                                    {msg.sender_id === authUserId && (
                                        <Avatar
                                            src={null}
                                            radius="xl"
                                            size="md"
                                        />
                                    )}
                                </Group>
                            ))
                        )}
                    </Stack>
                </ScrollArea>

                <form onSubmit={sendMessage}>
                    <Group mt="md" align="center">
                        <TextInput
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            placeholder="Type your message..."
                            style={{ flex: 1 }}
                            radius="xl"
                            size="md"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            loading={processing}
                            radius="xl"
                            size="md"
                        >
                            Send
                        </Button>
                    </Group>
                </form>
            </Card>
        </Box>
    );
}

export default AdminChat;
