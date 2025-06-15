import React, { useState } from "react";
import {
    Card,
    Stack,
    Group,
    Title,
    Divider,
    Box,
    Avatar,
    ActionIcon,
    Center,
    TextInput,
    PasswordInput,
    Text,
    Button,
    SimpleGrid,
} from "@mantine/core";

import {
    IconEdit,
    IconUserCircle,
    IconMail,
    IconPhone,
    IconTrash,
} from "@tabler/icons-react";

import { router } from "@inertiajs/react";

function ProfileSection({
    user,
    data,
    errors,
    isEditing,
    setIsEditing,
    processing,
    setData,
    handleSubmit,
    handleLogout,
    handlePictureUpload,
    previewImage = null,
}) {
    const handleDeleteAccount = () => {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            router.delete("/delete-account");
        }
    };

    // Numeric only + limit to 11 digits for phone
    const handlePhoneNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        setData("phone_number", value);
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            {isEditing ? (
                <form onSubmit={handleSubmit} noValidate>
                    <Stack spacing="xl">
                        <Group position="apart" align="center">
                            <Title order={2}>Edit Profile</Title>
                        </Group>

                        <Divider my="sm" />

                        <Center>
                            <Box style={{ position: "relative" }}>
                                <Avatar
                                    src={
                                        previewImage ||
                                        (user.picture
                                            ? `/storage/${user.picture}`
                                            : null)
                                    }
                                    size={120}
                                    radius={120}
                                    alt={`${user.first_name} ${user.last_name}`}
                                    style={{ border: "3px solid #E8E1C5" }}
                                />

                                <ActionIcon
                                    component="label"
                                    size="lg"
                                    variant="filled"
                                    style={{
                                        position: "absolute",
                                        bottom: -4,
                                        right: -4,
                                        backgroundColor: "#B9BD7E",
                                        borderRadius: "50%",
                                    }}
                                >
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={handlePictureUpload}
                                    />
                                    <IconEdit size={16} color="white" />
                                </ActionIcon>
                            </Box>
                        </Center>

                        <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: "md", cols: 1 }]}>
                            <TextInput
                                label="Username"
                                value={data.username}
                                onChange={(e) => setData("username", e.target.value)}
                                error={errors.username}
                                required
                            />

                            <TextInput
                                label="Email"
                                icon={<IconMail size={16} />}
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                error={errors.email}
                                required
                            />

                            <TextInput
                                label="First Name"
                                icon={<IconUserCircle size={16} />}
                                value={data.first_name}
                                onChange={(e) => setData("first_name", e.target.value)}
                                error={errors.first_name}
                                required
                            />

                            <TextInput
                                label="Last Name"
                                icon={<IconUserCircle size={16} />}
                                value={data.last_name}
                                onChange={(e) => setData("last_name", e.target.value)}
                                error={errors.last_name}
                                required
                            />

                            <TextInput
                                label="Contact Number"
                                icon={<IconPhone size={16} />}
                                value={data.phone_number}
                                onChange={handlePhoneNumberChange}
                                error={errors.phone_number}
                                maxLength={11}
                            />

                            <PasswordInput
                                label="Current Password"
                                value={data.current_password}
                                onChange={(e) => setData("current_password", e.target.value)}
                                error={errors.current_password}
                            />

                            <PasswordInput
                                label="New Password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                error={errors.password}
                            />

                            <PasswordInput
                                label="Confirm Password"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                error={errors.password_confirmation}
                            />
                        </SimpleGrid>

                        <Group>
                            <Button variant="outline" color="gray" onClick={() => setIsEditing(false)} type="button">
                                Cancel
                            </Button>
                            <Button type="submit" loading={processing} color="olive" disabled={processing}>
                                Save Changes
                            </Button>
                        </Group>
                    </Stack>
                </form>
            ) : (
                <Stack spacing="md" as="section" aria-labelledby="profile-view-title">
                    <Group position="apart">
                        <Title order={3} id="profile-view-title">
                            Your Profile
                        </Title>
                        <Button
                            variant="light"
                            color="green"
                            onClick={() => setIsEditing(true)}
                            leftIcon={<IconEdit size={18} />}
                            type="button"
                            aria-label="Edit Profile"
                        >
                            Edit Profile
                        </Button>
                    </Group>

                    <Divider />

                    <Group position="center" mb="md" align="flex-end">
                        <Avatar
                            src={previewImage || user.picture || null}
                            size={120}
                            radius={120}
                            alt={`${user.first_name} ${user.last_name} profile picture`}
                            style={{ border: "3px solid #E8E1C5" }}
                        />

                        <Stack mb="md" style={{ textAlign: "left" }}>
                            <Text style={{ fontSize: 24, fontWeight: 700, lineHeight: 0.2 }}>
                                {user.first_name} {user.last_name}
                            </Text>
                            <Text color="dimmed">{user.email}</Text>
                        </Stack>
                    </Group>

                    <Divider my="sm" />

                    <Stack spacing="md">
                        <Group align="center" spacing="xs">
                            <IconUserCircle size={20} color="#B9BD7E" />
                            <Text weight={500}>Name</Text>
                        </Group>
                        <Text ml={28} color="dimmed">
                            {user.first_name} {user.last_name}
                        </Text>
                        <Divider />

                        <Group align="center" spacing="xs">
                            <IconMail size={20} color="#B9BD7E" />
                            <Text weight={500}>Email</Text>
                        </Group>
                        <Text ml={28} color="dimmed">
                            {user.email}
                        </Text>
                        <Divider />

                        <Group align="center" spacing="xs">
                            <IconPhone size={20} color="#B9BD7E" />
                            <Text weight={500}>Contact</Text>
                        </Group>
                        <Text ml={28} color="dimmed">
                            {user.phone_number || "Not provided"}
                        </Text>
                    </Stack>

                    <Button
                        fullWidth
                        color="red"
                        style={{ marginTop: 20 }}
                        onClick={handleDeleteAccount}
                        leftIcon={<IconTrash size={18} />}
                        type="button"
                        aria-label="Delete Account"
                    >
                        Delete Account
                    </Button>
                </Stack>
            )}
        </Card>
    );
}

export default ProfileSection;
