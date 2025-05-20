import React from "react";
import { usePage, router } from "@inertiajs/react";
import {
    Card,
    Text,
    Title,
    Stack,
    Group,
    Divider,
    Avatar,
    Button,
} from "@mantine/core";

function ProfileView() {
    const { user } = usePage().props;

    const goToEditPage = () => {
        router.get("/profile/edit");
    };

    if (!user) {
        return <Text>Loading user info...</Text>;
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 600, margin: "auto" }}>
            <Group position="center" mb="md">
                <Avatar
                    src={user.picture || null}
                    size={100}
                    radius={100}
                    alt="User Picture"
                />
            </Group>

            <Stack spacing="xs">
                <Title order={3} align="center">
                    {user.first_name} {user.last_name}
                </Title>

                <Divider my="sm" />

                <Text><strong>Username:</strong> {user.username}</Text>
                <Text><strong>Email:</strong> {user.email}</Text>
                <Text><strong>Phone Number:</strong> {user.phone_number || "Not provided"}</Text>
                <Text><strong>Role:</strong> {user.role}</Text>
                <Text><strong>Address ID:</strong> {user.address_id || "Not linked"}</Text>

                <Group position="center" mt="md">
                    <Button
                        onClick={goToEditPage}
                        variant="light"
                        color="blue"
                    >
                        Edit Profile
                    </Button>
                </Group>
            </Stack>
        </Card>
    );
}

export default ProfileView;
