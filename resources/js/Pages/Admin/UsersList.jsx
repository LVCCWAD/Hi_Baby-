import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
    Box,
    List,
    Avatar,
    Text,
    Title,
    Paper,
    Divider,
    Badge,
} from "@mantine/core";

function UsersList({ users }) {
    return (
        <div
            style={{
                backgroundColor: "#f9f5eb",
                minHeight: "100vh",
                padding: "2rem",
            }}
        >
            <Head>
                <title>Customer Support - Hi Baby!</title>
            </Head>
            <Box maw={600} mx="auto" p="md">
                <Title order={3} mb="md">
                    Customer Messages
                </Title>
                <Paper shadow="xs" p="md" withBorder>
                    {users.length === 0 ? (
                        <Text align="center" color="dimmed" py="xl">
                            No users available
                        </Text>
                    ) : (
                        <List spacing="md" size="sm">
                            {users.map((user, index) => {
                                const latestMessage = user.latest_message
                                    ? user.latest_message.message
                                    : "No messages yet";

                                const isNew = user.unread_count > 0;

                                return (
                                    <React.Fragment key={user.id}>
                                        {index > 0 && <Divider my="xs" />}
                                        <List.Item
                                            icon={
                                                <Avatar
                                                    src={user.picture}
                                                    radius="xl"
                                                    size="md"
                                                />
                                            }
                                        >
                                            <Link
                                                href={`/chat?user_id=${user.id}`}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    textDecoration: "none",
                                                    color: "inherit",
                                                    width: "100%",
                                                }}
                                            >
                                                <Box
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <Text weight={500}>
                                                        {user.username}
                                                        {isNew && (
                                                            <Badge
                                                                color="red"
                                                                ml="sm"
                                                            >
                                                                New
                                                            </Badge>
                                                        )}
                                                    </Text>
                                                </Box>
                                                <Text
                                                    size="xs"
                                                    color={
                                                        isNew
                                                            ? "black"
                                                            : "dimmed"
                                                    }
                                                    weight={isNew ? 700 : 400}
                                                >
                                                    {latestMessage}
                                                </Text>
                                            </Link>
                                        </List.Item>
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    )}
                </Paper>
            </Box>
        </div>
    );
}

export default UsersList;
