import React, { useState } from "react";
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
    Box,
    Tabs,
    Grid,
    Container,
    Paper,
    SimpleGrid,
    Badge,
    Image,
    ActionIcon,
    Flex,
    TextInput,
    PasswordInput,
} from "@mantine/core";
import { IconHeart, IconEdit, IconShoppingBag, IconUser } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useForm } from "@inertiajs/react";
import { IconHeartFilled } from "@tabler/icons-react";
import { IconCheck } from "@tabler/icons-react";
import { IconTruck } from "@tabler/icons-react";
import { IconPackage } from "@tabler/icons-react";
import { IconLogout } from "@tabler/icons-react";
import { IconUpload } from "@tabler/icons-react";
import { IconHome } from "@tabler/icons-react";
import { IconPhone } from "@tabler/icons-react";
import { IconMail } from "@tabler/icons-react";
import { IconMapPin } from "@tabler/icons-react";
import { IconLock } from "@tabler/icons-react";
import { IconUser as IconUserCircle } from "@tabler/icons-react";
import { IconShoppingCart } from "@tabler/icons-react";
import { IconCalendar } from "@tabler/icons-react";
import { IconId } from "@tabler/icons-react";
import { IconCoin } from "@tabler/icons-react";

function ProfileView() {
    const { user, likedProducts, orders } = usePage().props;
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [orderFilter, setOrderFilter] = useState("all");

    // Form for profile editing
    const { data, setData, post, processing, errors } = useForm({
        username: user?.username || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        phone_number: user?.phone_number || "",
        address: user?.address || "",
        password: "",
        password_confirmation: "",
        picture: user?.picture || ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/profile/update", {
            onSuccess: () => {
                setIsEditing(false);
                notifications.show({
                    title: "Profile Updated",
                    message: "Your profile has been updated successfully",
                    color: "green"
                });
            }
        });
    };

    const handleLogout = () => {
        router.post("/logout");
    };

    const handlePictureUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a FormData object to send the file
            const formData = new FormData();
            formData.append('picture', file);

            // Send the file to the server
            router.post('/profile/update', formData, {
                onSuccess: () => {
                    notifications.show({
                        title: "Picture Updated",
                        message: "Your profile picture has been updated successfully",
                        color: "green"
                    });
                }
            });
        }
    };

    if (!user) {
        return <Text>Loading user info...</Text>;
    }

    // Mock data for liked products (replace with actual data from backend)
    const mockLikedProducts = [
        {
            id: 1,
            name: "Cotton Terno",
            price: 1000,
            original_price: 5000,
            discount: 30,
            rating: 3.5,
            reviews: 5,
            image: "/products/1746550630.png",
            category: "Girl"
        },
        {
            id: 2,
            name: "Casual Outfit",
            price: 1800,
            rating: 4.5,
            reviews: 5,
            image: "/products/1746550637.png",
            category: "Girl"
        }
    ];

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
                    status: "delivered"
                },
                {
                    id: 2,
                    product_name: "Cotton Terno (Girl)",
                    price: 1000,
                    image: "/products/1746550630.png",
                    status: "delivered"
                },
                {
                    id: 3,
                    product_name: "Cotton Terno (Girl)",
                    price: 1000,
                    image: "/products/1746550630.png",
                    status: "delivered"
                }
            ]
        }
    ];

    // Filter orders based on selected filter
    const filteredOrders = mockOrders.filter(order => {
        if (orderFilter === "all") return true;
        return order.status === orderFilter;
    });

    return (
        <Container size="xl" py="xl" style={{ backgroundColor: "#FDF8F3", minHeight: "100vh" }}>
            <Grid gutter="xl">
                {/* Sidebar */}
                <Grid.Col span={3}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%" }}>
                        <Stack spacing="md" align="center">
                            <Avatar
                                src={user.picture || null}
                                size={120}
                                radius={120}
                                alt="User Picture"
                                style={{ border: "3px solid #E8E1C5" }}
                            />

                            <Title order={4} align="center" style={{ marginBottom: 0 }}>
                                {user.first_name} {user.last_name}
                            </Title>

                            <Text size="sm" color="dimmed" align="center">
                                {user.email}
                            </Text>

                            <Divider style={{ width: "100%" }} />

                            <Stack spacing="xs" style={{ width: "100%" }}>
                                <Button
                                    variant={activeTab === "profile" ? "light" : "subtle"}
                                    color={activeTab === "profile" ? "green" : "gray"}
                                    leftIcon={<IconUser size={18} />}
                                    onClick={() => setActiveTab("profile")}
                                    fullWidth
                                    style={{ justifyContent: "flex-start" }}
                                >
                                    My Profile
                                </Button>

                                <Button
                                    variant={activeTab === "likes" ? "light" : "subtle"}
                                    color={activeTab === "likes" ? "green" : "gray"}
                                    leftIcon={<IconHeart size={18} />}
                                    onClick={() => setActiveTab("likes")}
                                    fullWidth
                                    style={{ justifyContent: "flex-start" }}
                                >
                                    My Likes
                                </Button>

                                <Button
                                    variant={activeTab === "purchases" ? "light" : "subtle"}
                                    color={activeTab === "purchases" ? "green" : "gray"}
                                    leftIcon={<IconShoppingBag size={18} />}
                                    onClick={() => setActiveTab("purchases")}
                                    fullWidth
                                    style={{ justifyContent: "flex-start" }}
                                >
                                    My Purchases
                                </Button>
                            </Stack>
                        </Stack>
                    </Card>
                </Grid.Col>

                {/* Main Content */}
                <Grid.Col span={9}>
                    {/* Profile Section */}
                    {activeTab === "profile" && (
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                    <Stack spacing="md">
                                        <Group position="apart">
                                            <Title order={3}>Edit Profile</Title>
                                            <Group>
                                                <Button
                                                    variant="subtle"
                                                    color="gray"
                                                    onClick={() => setIsEditing(false)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="submit" loading={processing} color="green">
                                                    Save Changes
                                                </Button>
                                            </Group>
                                        </Group>

                                        <Divider />

                                        <Group position="center" mb="md">
                                            <Box style={{ position: "relative" }}>
                                                <Avatar
                                                    src={user.picture || null}
                                                    size={120}
                                                    radius={120}
                                                    alt="User Picture"
                                                    style={{ border: "3px solid #E8E1C5" }}
                                                />
                                                <ActionIcon
                                                    style={{
                                                        position: "absolute",
                                                        bottom: 0,
                                                        right: 0,
                                                        backgroundColor: "#B9BD7E",
                                                        borderRadius: "50%",
                                                        padding: 5
                                                    }}
                                                    component="label"
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
                                        </Group>

                                        <Grid>
                                            <Grid.Col span={6}>
                                                <TextInput
                                                    label="Name"
                                                    icon={<IconUserCircle size={16} />}
                                                    value={`${data.first_name} ${data.last_name}`}
                                                    onChange={(e) => {
                                                        const names = e.target.value.split(" ");
                                                        setData({
                                                            ...data,
                                                            first_name: names[0] || "",
                                                            last_name: names.slice(1).join(" ") || ""
                                                        });
                                                    }}
                                                    error={errors.first_name || errors.last_name}
                                                    placeholder="your name"
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <TextInput
                                                    label="Email"
                                                    icon={<IconMail size={16} />}
                                                    value={data.email}
                                                    onChange={(e) => setData("email", e.target.value)}
                                                    error={errors.email}
                                                    placeholder="your email"
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <PasswordInput
                                                    label="Password"
                                                    icon={<IconLock size={16} />}
                                                    value={data.password}
                                                    onChange={(e) => setData("password", e.target.value)}
                                                    error={errors.password}
                                                    placeholder="your password"
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <TextInput
                                                    label="Contact"
                                                    icon={<IconPhone size={16} />}
                                                    value={data.phone_number}
                                                    onChange={(e) => setData("phone_number", e.target.value)}
                                                    error={errors.phone_number}
                                                    placeholder="your contact"
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={12}>
                                                <TextInput
                                                    label="Address"
                                                    icon={<IconMapPin size={16} />}
                                                    value={data.address}
                                                    onChange={(e) => setData("address", e.target.value)}
                                                    error={errors.address}
                                                    placeholder="your address"
                                                />
                                            </Grid.Col>
                                        </Grid>

                                        <Button
                                            fullWidth
                                            color="#B9BD7E"
                                            style={{ backgroundColor: "#B9BD7E", marginTop: 20 }}
                                            onClick={handleLogout}
                                            leftIcon={<IconLogout size={18} />}
                                        >
                                            Logout
                                        </Button>
                                    </Stack>
                                </form>
                            ) : (
                                <Stack spacing="md">
                                    <Group position="apart">
                                        <Title order={3}>Your Profile</Title>
                                        <Button
                                            variant="light"
                                            color="green"
                                            onClick={() => setIsEditing(true)}
                                            leftIcon={<IconEdit size={18} />}
                                        >
                                            Edit Profile
                                        </Button>
                                    </Group>

                                    <Divider />

                                    <Group position="center" mb="md">
                                        <Avatar
                                            src={user.picture || null}
                                            size={120}
                                            radius={120}
                                            alt="User Picture"
                                            style={{ border: "3px solid #E8E1C5" }}
                                        />
                                    </Group>

                                    <Title order={3} align="center">
                                        {user.first_name} {user.last_name}
                                    </Title>
                                    <Text align="center" color="dimmed">{user.email}</Text>

                                    <Divider my="sm" />

                                    <Grid>
                                        <Grid.Col span={6}>
                                            <Group>
                                                <IconUserCircle size={20} color="#B9BD7E" />
                                                <Text weight={500}>Name</Text>
                                            </Group>
                                            <Text ml={28} color="dimmed">{user.first_name} {user.last_name}</Text>
                                        </Grid.Col>
                                        <Grid.Col span={6}>
                                            <Group>
                                                <IconMail size={20} color="#B9BD7E" />
                                                <Text weight={500}>Email</Text>
                                            </Group>
                                            <Text ml={28} color="dimmed">{user.email}</Text>
                                        </Grid.Col>
                                        <Grid.Col span={6}>
                                            <Group>
                                                <IconLock size={20} color="#B9BD7E" />
                                                <Text weight={500}>Password</Text>
                                            </Group>
                                            <Text ml={28} color="dimmed">••••••••</Text>
                                        </Grid.Col>
                                        <Grid.Col span={6}>
                                            <Group>
                                                <IconPhone size={20} color="#B9BD7E" />
                                                <Text weight={500}>Contact</Text>
                                            </Group>
                                            <Text ml={28} color="dimmed">{user.phone_number || "Not provided"}</Text>
                                        </Grid.Col>
                                        <Grid.Col span={12}>
                                            <Group>
                                                <IconMapPin size={20} color="#B9BD7E" />
                                                <Text weight={500}>Address</Text>
                                            </Group>
                                            <Text ml={28} color="dimmed">{user.address_id ? "Address linked" : "No address linked"}</Text>
                                        </Grid.Col>
                                    </Grid>

                                    <Button
                                        fullWidth
                                        color="#B9BD7E"
                                        style={{ backgroundColor: "#B9BD7E", marginTop: 20 }}
                                        onClick={handleLogout}
                                        leftIcon={<IconLogout size={18} />}
                                    >
                                        Logout
                                    </Button>
                                </Stack>
                            )}
                        </Card>
                    )}

                    {/* Likes Section */}
                    {activeTab === "likes" && (
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Title order={3} mb="md">My Liked Products</Title>
                            <Divider mb="lg" />

                            {mockLikedProducts.length === 0 ? (
                                <Text align="center" color="dimmed" py="xl">You haven't liked any products yet</Text>
                            ) : (
                                <SimpleGrid cols={2} spacing="lg">
                                    {mockLikedProducts.map((product) => (
                                        <Paper key={product.id} shadow="xs" p="md" withBorder>
                                            <Group position="apart" mb="xs">
                                                <Text weight={500}>{product.name}</Text>
                                                <ActionIcon color="red" variant="subtle">
                                                    <IconHeartFilled size={20} />
                                                </ActionIcon>
                                            </Group>

                                            <Box style={{ position: "relative" }}>
                                                <Image
                                                    src={product.image}
                                                    height={160}
                                                    fit="contain"
                                                    withPlaceholder
                                                />
                                                {product.discount && (
                                                    <Badge
                                                        color="red"
                                                        style={{
                                                            position: "absolute",
                                                            top: 10,
                                                            right: 10
                                                        }}
                                                    >
                                                        -{product.discount}%
                                                    </Badge>
                                                )}
                                            </Box>

                                            <Group position="apart" mt="md">
                                                <div>
                                                    <Group spacing={5}>
                                                        {Array(5).fill(0).map((_, i) => (
                                                            <Text key={i} color={i < Math.floor(product.rating) ? "yellow" : "gray"}>★</Text>
                                                        ))}
                                                        <Text size="xs" color="dimmed">{product.rating}/{product.reviews}</Text>
                                                    </Group>
                                                </div>
                                                <Group spacing={5}>
                                                    {product.original_price && (
                                                        <Text size="sm" color="dimmed" style={{ textDecoration: "line-through" }}>
                                                            ₱{product.original_price}
                                                        </Text>
                                                    )}
                                                    <Text weight={700} size="lg">₱{product.price}</Text>
                                                </Group>
                                            </Group>
                                        </Paper>
                                    ))}
                                </SimpleGrid>
                            )}
                        </Card>
                    )}

                    {/* Purchases Section */}
                    {activeTab === "purchases" && (
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Title order={3} mb="md">My Purchases</Title>
                            <Divider mb="lg" />

                            <Group position="apart" mb="md">
                                <Tabs value={orderFilter} onTabChange={setOrderFilter}>
                                    <Tabs.List>
                                        <Tabs.Tab
                                            value="all"
                                            icon={<IconShoppingCart size={16} />}
                                            style={{
                                                backgroundColor: orderFilter === "all" ? "#B9BD7E" : "transparent",
                                                color: orderFilter === "all" ? "white" : "inherit",
                                                borderRadius: 0
                                            }}
                                        >
                                            All ({mockOrders.length})
                                        </Tabs.Tab>
                                        <Tabs.Tab
                                            value="to_ship"
                                            icon={<IconPackage size={16} />}
                                            style={{
                                                backgroundColor: orderFilter === "to_ship" ? "#B9BD7E" : "transparent",
                                                color: orderFilter === "to_ship" ? "white" : "inherit",
                                                borderRadius: 0
                                            }}
                                        >
                                            To Ship
                                        </Tabs.Tab>
                                        <Tabs.Tab
                                            value="delivered"
                                            icon={<IconCheck size={16} />}
                                            style={{
                                                backgroundColor: orderFilter === "delivered" ? "#B9BD7E" : "transparent",
                                                color: orderFilter === "delivered" ? "white" : "inherit",
                                                borderRadius: 0
                                            }}
                                        >
                                            Delivered
                                        </Tabs.Tab>
                                    </Tabs.List>
                                </Tabs>
                            </Group>

                            {filteredOrders.length === 0 ? (
                                <Text align="center" color="dimmed" py="xl">No orders found</Text>
                            ) : (
                                <Stack spacing="lg">
                                    {filteredOrders.map((order) => (
                                        <Paper key={order.id} shadow="xs" p="md" withBorder>
                                            <Grid>
                                                <Grid.Col span={12}>
                                                    <Group position="apart" mb="md">
                                                        <Group>
                                                            <IconCalendar size={16} />
                                                            <Text size="sm">Ordered on: {order.date}</Text>
                                                        </Group>
                                                        <Group>
                                                            <Text weight={500}>Total:</Text>
                                                            <Text weight={700}>₱{order.total}</Text>
                                                        </Group>
                                                        <Group>
                                                            <IconId size={16} />
                                                            <Text size="sm">Order #: {order.id}</Text>
                                                        </Group>
                                                    </Group>
                                                </Grid.Col>

                                                {order.items.map((item) => (
                                                    <Grid.Col key={item.id} span={12}>
                                                        <Group position="apart">
                                                            <Group>
                                                                <Box style={{ width: 80, height: 80, overflow: "hidden" }}>
                                                                    <Image
                                                                        src={item.image}
                                                                        width={80}
                                                                        height={80}
                                                                        fit="contain"
                                                                        withPlaceholder
                                                                    />
                                                                </Box>
                                                                <div>
                                                                    <Text weight={500}>{item.product_name}</Text>
                                                                </div>
                                                            </Group>
                                                            <Group>
                                                                <Text weight={700}>₱{item.price}</Text>
                                                                <Button
                                                                    variant="light"
                                                                    color="green"
                                                                    radius="xl"
                                                                    compact
                                                                    leftIcon={<IconCheck size={16} />}
                                                                >
                                                                    {item.status === "delivered" ? "Delivered" : item.status}
                                                                </Button>
                                                            </Group>
                                                        </Group>
                                                        <Divider my="sm" />
                                                    </Grid.Col>
                                                ))}
                                            </Grid>
                                        </Paper>
                                    ))}
                                </Stack>
                            )}
                        </Card>
                    )}
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default ProfileView;
