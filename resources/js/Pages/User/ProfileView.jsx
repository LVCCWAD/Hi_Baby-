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
} from "@mantine/core";
import { IconHeart, IconShoppingBag, IconUser } from "@tabler/icons-react";

import ProfileSection from "../../Components/ProfileView/ProfileSection";
import LikesSection from "../../Components/ProfileView/LikesSection";
import PurchasesSection from "../../Components/ProfileView/PurchasesSection";

function ProfileView() {
    const {
        user,
        likedProducts: initialLikedProducts,
        orders,
    } = usePage().props;
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [orderFilter, setOrderFilter] = useState("all");
    const [previewImage, setPreviewImage] = useState(user.picture || null);
    const [likedProducts, setLikedProducts] = useState(
        initialLikedProducts || []
    );

    useEffect(() => {
        switch (activeTab) {
            case "likes":
                document.title = "My Likes - Hi Baby!";
                break;
            case "purchases":
                document.title = "My Purchases - Hi Baby!";
                break;
            case "profile":
            default:
                document.title = "My Profile - Hi Baby!";
                break;
        }
    }, [activeTab]);

    // Form for profile editing
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
                message:
                    "Please enter your current password to change your password.",
                color: "red",
            });
            return;
        }

        post("/profile/update", {
            forceFormData: true,
            onSuccess: () => {
                setIsEditing(false);

                // Clear password fields
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

    const handlePictureUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("picture", file); // keep this to send on submit
            setPreviewImage(URL.createObjectURL(file)); // update preview image immediately
        }
    };
    const handleUnlike = (productId) => {
        router.post(
            `/products/${productId}/unlike`,
            {},
            {
                onSuccess: () => {
                    setLikedProducts((current) =>
                        current.filter((product) => product.id !== productId)
                    );
                    notifications.show({
                        title: "Product Unliked",
                        message:
                            "The product has been removed from your liked products.",
                        color: "green",
                    });
                },
                onError: () => {
                    notifications.show({
                        title: "Error",
                        message:
                            "Failed to unlike the product. Please try again.",
                        color: "red",
                    });
                },
            }
        );
    };

    if (!user) {
        return <Text>Loading user info...</Text>;
    }

    // Mock data for orders (replace with actual data from backend)
    const mockOrders = [
        {
            id: 78459,
            date: "April 1, 2025",
            total: 3700,
            status: "delivered",
            items: [
                {
                    id: 1,
                    product_name: "Cotton Terno (Girl)",
                    price: 1000,
                    image: "/products/1746550630.png",
                    status: "delivered",
                },
                {
                    id: 2,
                    product_name: "Cotton Terno (Girl)",
                    price: 1000,
                    image: "/products/1746550630.png",
                    status: "delivered",
                },
                {
                    id: 3,
                    product_name: "Cotton Terno (Girl)",
                    price: 1000,
                    image: "/products/1746550630.png",
                    status: "delivered",
                },
            ],
        },
    ];

    // Filter orders based on selected filter
    const filteredOrders = mockOrders.filter((order) => {
        if (orderFilter === "all") return true;
        return order.status === orderFilter;
    });

    return (
        <Container
            size="xl"
            py="xl"
            style={{ backgroundColor: "#FDF8F3", minHeight: "100vh" }}
        >
            <Grid gutter="xl">
                {/* Sidebar */}
                <Grid.Col span={3}>
                    <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        style={{ height: "100%" }}
                    >
                        <Stack spacing="md" align="center">
                            <Avatar
                                src={user.picture || null}
                                size={120}
                                radius={120}
                                alt="User Picture"
                                style={{ border: "3px solid #E8E1C5" }}
                            />

                            <Title
                                order={4}
                                align="center"
                                style={{ marginBottom: 0 }}
                            >
                                {user.first_name} {user.last_name}
                            </Title>

                            <Text size="sm" color="dimmed" align="center">
                                {user.email}
                            </Text>

                            <Divider style={{ width: "100%" }} />

                            <Stack spacing="xs" style={{ width: "100%" }}>
                                <Button
                                    variant={
                                        activeTab === "profile"
                                            ? "light"
                                            : "subtle"
                                    }
                                    color={
                                        activeTab === "profile"
                                            ? "green"
                                            : "gray"
                                    }
                                    onClick={() => setActiveTab("profile")}
                                    fullWidth
                                    style={{ justifyContent: "flex-start" }}
                                >
                                    <Group
                                        gap="sm"
                                        wrap="nowrap"
                                        align="center"
                                        style={{ flex: 1, overflow: "hidden" }}
                                    >
                                        <IconUser
                                            size={20}
                                            style={{ flexShrink: 0 }}
                                        />
                                        <Text
                                            style={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            My Profile
                                        </Text>
                                    </Group>
                                </Button>

                                <Button
                                    variant={
                                        activeTab === "likes"
                                            ? "light"
                                            : "subtle"
                                    }
                                    color={
                                        activeTab === "likes" ? "green" : "gray"
                                    }
                                    onClick={() => setActiveTab("likes")}
                                    fullWidth
                                    style={{ justifyContent: "flex-start" }}
                                >
                                    <Group
                                        gap="sm"
                                        wrap="nowrap"
                                        align="center"
                                        style={{ flex: 1, overflow: "hidden" }}
                                    >
                                        <IconHeart
                                            size={18}
                                            style={{ flexShrink: 0 }}
                                        />
                                        <Text
                                            style={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            My Likes
                                        </Text>
                                    </Group>
                                </Button>

                                <Button
                                    variant={
                                        activeTab === "purchases"
                                            ? "light"
                                            : "subtle"
                                    }
                                    color={
                                        activeTab === "purchases"
                                            ? "green"
                                            : "gray"
                                    }
                                    onClick={() => setActiveTab("purchases")}
                                    fullWidth
                                    style={{ justifyContent: "flex-start" }}
                                >
                                    <Group
                                        gap="sm"
                                        wrap="nowrap"
                                        align="center"
                                        style={{ flex: 1, overflow: "hidden" }}
                                    >
                                        <IconShoppingBag
                                            size={18}
                                            style={{ flexShrink: 0 }}
                                        />
                                        <Text
                                            style={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            My Purchases
                                        </Text>
                                    </Group>
                                </Button>
                            </Stack>
                        </Stack>
                    </Card>
                </Grid.Col>

                {/* Main Content */}
                <Grid.Col span={9}>
                    {/* Profile Section */}
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

                    {/* Likes Section */}
                    {activeTab === "likes" && (
                        <LikesSection
                            likedProducts={likedProducts}
                            onUnlike={handleUnlike}
                        />
                    )}

                    {/* Purchases Section */}
                    {activeTab === "purchases" && (
                        <PurchasesSection
                            orderFilter={orderFilter}
                            setOrderFilter={setOrderFilter}
                            filteredOrders={filteredOrders}
                            ordersCount={mockOrders.length}
                        />
                    )}
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default ProfileView;
