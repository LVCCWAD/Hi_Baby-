// resources/js/Pages/Admin/UsersList.jsx

import React from "react";
import { Link } from "@inertiajs/react";
import { Box, List, Avatar, Text, Title, Paper, Divider, Badge } from "@mantine/core";

function UsersList({ users }) {
    return (
        <div style={{ backgroundColor: "#f9f5eb", minHeight: "100vh", padding: "2rem" }}>

        <Box maw={600} mx="auto" p="md">
            <Title order={3} mb="md">Customer Messages</Title>
            <Paper shadow="xs" p="md" withBorder>
                {users.length === 0 ? (
                    <Text align="center" color="dimmed" py="xl">No users available</Text>
                ) : (
                    <List spacing="md" size="sm">
                        {users.map((user, index) => (
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
                                    <Link href={`/chat?user_id=${user.id}`} style={{ display: "flex", alignItems: "center", textDecoration: 'none', width: '100%' }}>
                                        <Box>
                                            <Text weight={500}>{user.username}</Text>
                                            <Text size="xs" color="dimmed">Click to view conversation</Text>
                                        </Box>
                                    </Link>
                                </List.Item>
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </Paper>
        </Box>
        </div>
    );
}

export default UsersList;