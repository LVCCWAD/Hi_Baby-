// resources/js/Pages/Admin/AdminChats.jsx

import React, { useRef, useEffect, useState } from "react";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
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
import { IconArrowBack, IconSend2, IconUser } from "@tabler/icons-react";
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
        // Enable pusher logging - don't include this in production
        // Pusher.logToConsole = true;

        const pusher = new Pusher(
            import.meta.env.VITE_PUSHER_APP_KEY || "5a7697f73e3c287f4892",
            {
                cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER || "ap1",
                forceTLS: true,
            }
        );

        const channel = pusher.subscribe("admin-messages");

        // Listen for user messages
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

        // Immediately clear input box
        setData("message", "");

        post("admin/chat/send", data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset("message"), // You can actually remove this now if you want
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
        <Box
            maw={600}
            mx="auto"
            p="md"
            style={{
                borderColor: "#BAB86C",
                borderWidth: "3px",
                borderRadius: "23px",
            }}
        >
            <Head>
                <title>Customer Support - Hi Baby!</title>
            </Head>
            <Flex justify="space-between" align="center" mb="md">
                <Link href="/chat" style={{ textDecoration: "none" }}>
                    <IconArrowBack size={16} stroke={1.5} />
                </Link>
                <Title
                    order={3}
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        color: "#BAB86C",
                    }}
                >
                    <IconUser
                        size={30}
                        stroke={1.5}
                        color="#BAB86C"
                        style={{
                            border: "3px solid #BAB86C",
                            borderRadius: "23px",
                            marginRight: "10px",
                        }}
                    />{" "}
                    {targetUser?.username || "User"}
                </Title>
                <div></div> {/* Empty div for flex spacing */}
            </Flex>
            <hr style={{ marginBottom: "20px", border: "1px solid #BAB86C" }} />
            <ScrollArea h={400} viewportRef={viewport}>
                <Stack spacing="sm">
                    {messages.length === 0 ? (
                        <Text align="center" color="dimmed" py="xl">
                            No messages yet. Start a conversation!
                        </Text>
                    ) : (
                        messages.map((msg) => (
                            <Group
                                key={msg.id}
                                spacing="xs"
                                align="flex-start"
                                justify={
                                    msg.sender_id === authUserId
                                        ? "flex-end"
                                        : "flex-start"
                                }
                                noWrap
                            >
                                {msg.sender_id !== authUserId && (
                                    <Avatar
                                        src={msg.sender?.picture}
                                        radius="xl"
                                        size="sm"
                                        style={{ border: "3px solid #BAB86C" }}
                                    />
                                )}
                                <Paper
                                    shadow="xs"
                                    p="sm"
                                    radius="md"
                                    withBorder
                                    style={{
                                        backgroundColor:
                                            msg.sender_id === authUserId
                                                ? "#d1fae5"
                                                : "#f3f4f6",
                                        maxWidth: "70%",
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
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
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
                <Group
                    mt="md"
                    style={{
                        border: "3px solid #BAB86C",
                        borderRadius: "23px",
                    }}
                >
                    <TextInput
                        value={data.message}
                        onChange={(e) => setData("message", e.target.value)}
                        placeholder="Type your message..."
                        style={{ flex: 1, padding: "5px" }}
                        variant="unstyled"
                        required
                    />
                    <Button
                        type="submit"
                        loading={processing}
                        variant="subtle"
                        color="#BAB86C"
                    >
                        <IconSend2 size={20} stroke={1.5} />
                    </Button>
                </Group>
            </form>
        </Box>
    );
}

function AdminChats() {
    return (
        <>
            <Head>
                <title>Customer Support - Hi Baby!</title>
            </Head>
        </>
    );
}

export default AdminChat;
