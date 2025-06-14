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
    IconLock,
    IconPhone,
    IconMapPin,
    IconLogout,
} from "@tabler/icons-react";

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
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            {isEditing ? (
                <form onSubmit={handleSubmit} noValidate>
                    <Stack spacing="xl">
                        <Group position="apart" align="center">
                            <Title order={2}>Edit Profile</Title>
                        </Group>

                        <Divider my="sm" />

                        {/* Avatar Upload */}
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

                        {/* Form Fields */}
                        <SimpleGrid
                            cols={2}
                            spacing="lg"
                            breakpoints={[{ maxWidth: "md", cols: 1 }]}
                        >
                            <TextInput
                                label="Username"
                                value={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                error={errors.username}
                                required
                            />

                            <TextInput
                                label="Email"
                                icon={<IconMail size={16} />}
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                error={errors.email}
                                required
                            />

                            <TextInput
                                label="First Name"
                                icon={<IconUserCircle size={16} />}
                                value={data.first_name}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                error={errors.first_name}
                                required
                            />

                            <TextInput
                                label="Last Name"
                                icon={<IconUserCircle size={16} />}
                                value={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                error={errors.last_name}
                                required
                            />

                            <TextInput
                                label="Contact Number"
                                icon={<IconPhone size={16} />}
                                value={data.phone_number}
                                onChange={(e) =>
                                    setData("phone_number", e.target.value)
                                }
                                error={errors.phone_number}
                            />

                            <TextInput
                                label="Address"
                                icon={<IconMapPin size={16} />}
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                error={errors.address}
                            />

                            <PasswordInput
                                label="Current Password"
                                value={data.current_password}
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
                                error={errors.current_password}
                            />

                            <PasswordInput
                                label="New Password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                error={errors.password}
                            />
                            <PasswordInput
                                label="Confirm Password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                error={errors.password_confirmation}
                            />
                        </SimpleGrid>

                        <Group>
                            <Button
                                variant="outline"
                                color="gray"
                                onClick={() => setIsEditing(false)}
                                type="button"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                loading={processing}
                                color="olive"
                                disabled={processing}
                            >
                                Save Changes
                            </Button>
                        </Group>
                    </Stack>
                </form>
            ) : (
                <Stack
                    spacing="md"
                    as="section"
                    aria-labelledby="profile-view-title"
                >
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
                            <Text
                                style={{
                                    fontSize: 24,
                                    fontWeight: 700,
                                    lineHeight: 0.2,
                                }}
                            >
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
                            <IconLock size={20} color="#B9BD7E" />
                            <Text weight={500}>Password</Text>
                        </Group>
                        <Group ml={28} position="apart" align="center">
                            <Text color="dimmed">
                                ••••••••
                            </Text>
                            <Button
                                variant="subtle"
                                size="xs"
                                color="green"
                                component="a"
                                href="/forgot-password"
                                style={{ fontSize: "12px" }}
                            >
                                Change Password
                            </Button>
                        </Group>
                        <Divider />

                        <Group align="center" spacing="xs">
                            <IconPhone size={20} color="#B9BD7E" />
                            <Text weight={500}>Contact</Text>
                        </Group>
                        <Text ml={28} color="dimmed">
                            {user.phone_number || "Not provided"}
                        </Text>
                        <Divider />

                        <Group align="center" spacing="xs">
                            <IconMapPin size={20} color="#B9BD7E" />
                            <Text weight={500}>Address</Text>
                        </Group>
                        <Text ml={28} color="dimmed">
                            {user.address_id
                                ? "Address linked"
                                : "No address linked"}
                        </Text>
                    </Stack>

                    <Button
                        fullWidth
                        color="#B9BD7E"
                        style={{
                            backgroundColor: "#B9BD7E",
                            marginTop: 20,
                        }}
                        onClick={handleLogout}
                        leftIcon={<IconLogout size={18} />}
                        type="button"
                        aria-label="Logout"
                    >
                        Logout
                    </Button>
                </Stack>
            )}
        </Card>
    );
}

export default ProfileSection;
