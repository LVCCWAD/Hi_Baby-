import React, { useState, useEffect } from "react";
import { usePage, router, useForm } from "@inertiajs/react";
import { notifications } from "@mantine/notifications";
import {
    Card,
    Text,
    Title,
    Stack,
    Group,
    Divider,
    Avatar,
    Button,
    Grid,
    Container,
    Box,
} from "@mantine/core";
import { IconHeart, IconShoppingBag, IconUser } from "@tabler/icons-react";

import ProfileSection from "../../Components/ProfileView/ProfileSection";
import LikesSection from "../../Components/ProfileView/LikesSection";
import PurchasesSection from "../../Components/ProfileView/PurchasesSection";

function ProfileView() {
    const accentColor = "#BAB86C";

    const { user, likedProducts: initialLikedProducts, orders, ordersCount } = usePage().props;

    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [orderFilter, setOrderFilter] = useState("all");
    const [previewImage, setPreviewImage] = useState(user.picture || null);
    const [likedProducts, setLikedProducts] = useState(initialLikedProducts || []);

    useEffect(() => {
        document.title = {
            profile: "My Profile - Hi Baby!",
            likes: "My Likes - Hi Baby!",
            purchases: "My Purchases - Hi Baby!",
        }[activeTab];
    }, [activeTab]);

    const { data, setData, post, processing, errors } = useForm({
        username: user?.username || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone_number: user?.phone_number || "",
        address: user?.address || "",
        current_password: "",
        password: "",
        password_confirmation: "",
        picture: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.password.length > 0 && data.current_password.length === 0) {
            notifications.show({
                title: "Current Password Required",
                message: "Please enter your current password to change your password.",
                color: "red",
            });
            return;
        }

        post("/profile/update", {
            forceFormData: true,
            onSuccess: () => {
                setIsEditing(false);
                setData("password", "");
                setData("password_confirmation", "");
                setData("current_password", "");
                notifications.show({
                    title: "Profile Updated",
                    message: "Your profile has been updated successfully",
                    color: "green",
                });
            },
        });
    };

    const handleLogout = () => {
        router.post("/logout");
    };

    const handlePictureUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            alert("Please upload a valid image file (jpg, png, webp).");
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setPreviewImage(previewUrl);
        setData("picture", file);
    };

    useEffect(() => {
        return () => {
            if (previewImage && previewImage.startsWith("blob:")) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const handleUnlike = (productId) => {
        router.post(`/products/${productId}/unlike`, {}, {
            onSuccess: () => {
                setLikedProducts((current) => current.filter((product) => product.id !== productId));
                notifications.show({
                    title: "Product Unliked",
                    message: "The product has been removed from your liked products.",
                    color: "green",
                });
            },
            onError: () => {
                notifications.show({
                    title: "Error",
                    message: "Failed to unlike the product. Please try again.",
                    color: "red",
                });
            },
        });
    };

    if (!user) {
        return <Text>Loading user info...</Text>;
    }

    return (
        <Container size="xl" py="xl" style={{ backgroundColor: "#FDF8F3", minHeight: "100vh" }}>
            <Grid gutter="xl">
                {/* LEFT SIDE - SIDEBAR */}
                <Grid.Col span={3}>
                    <Card shadow="md" padding="lg" radius="lg" withBorder style={{ height: "100%" }}>
                        <Stack spacing="md" align="center">
                            <Avatar
                                src={previewImage || user.picture || null}
                                size={130}
                                radius={130}
                                alt={`${user.first_name} ${user.last_name} profile picture`}
                                style={{ border: `3px solid ${accentColor}`, backgroundColor: "#FAF5E9" }}
                            />
                            <Title order={4} align="center">{user.first_name} {user.last_name}</Title>
                            <Text size="sm" color="dimmed" align="center">{user.email}</Text>
                            <Divider style={{ width: "100%" }} />
                            <Stack spacing="xs" style={{ width: "100%" }}>
                                <Button
                                    variant={activeTab === "profile" ? "filled" : "light"}
                                    color={activeTab === "profile" ? accentColor : "gray"}
                                    fullWidth
                                    style={{ justifyContent: "flex-start" }}
                                    onClick={() => setActiveTab("profile")}
                                >
                                    <Group gap="sm" wrap="nowrap" align="center" style={{ flex: 1 }}>
                                        <IconUser size={20} />
                                        <Text>My Profile</Text>
                                    </Group>
                                </Button>

                                <Button
                                    variant={activeTab === "likes" ? "filled" : "light"}
                                    color={activeTab === "likes" ? accentColor : "gray"}
                                    fullWidth
                                    style={{ justifyContent: "flex-start" }}
                                    onClick={() => setActiveTab("likes")}
                                >
                                    <Group gap="sm" wrap="nowrap" align="center" style={{ flex: 1 }}>
                                        <IconHeart size={20} />
                                        <Text>My Likes</Text>
                                    </Group>
                                </Button>

                                <Button
                                    variant={activeTab === "purchases" ? "filled" : "light"}
                                    color={activeTab === "purchases" ? accentColor : "gray"}
                                    fullWidth
                                    style={{ justifyContent: "flex-start" }}
                                    onClick={() => setActiveTab("purchases")}
                                >
                                    <Group gap="sm" wrap="nowrap" align="center" style={{ flex: 1 }}>
                                        <IconShoppingBag size={20} />
                                        <Text>My Purchases</Text>
                                    </Group>
                                </Button>
                            </Stack>
                        </Stack>
                    </Card>
                </Grid.Col>

                {/* RIGHT SIDE - CONTENT */}
                <Grid.Col span={9}>
                    {activeTab === "profile" && (
                        <ProfileSection
                            user={user}
                            data={data}
                            errors={errors}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            processing={processing}
                            setData={setData}
                            handleSubmit={handleSubmit}
                            handleLogout={handleLogout}
                            handlePictureUpload={handlePictureUpload}
                            previewImage={previewImage}
                        />
                    )}

                    {activeTab === "likes" && (
                        <LikesSection likedProducts={likedProducts} onUnlike={handleUnlike} />
                    )}

                    {activeTab === "purchases" && (
                        <PurchasesSection
                            orders={orders}
                            ordersCount={ordersCount}
                            orderFilter={orderFilter}
                            setOrderFilter={setOrderFilter}
                        />
                    )}
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default ProfileView;
