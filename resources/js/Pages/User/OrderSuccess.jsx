import React from "react";
import {
    Container,
    Text,
    Paper,
    Button,
    Group,
    Stack,
    Box,
    Badge,
    Divider,
    Grid,
    ThemeIcon,
    Card,
    Title,
    Flex,
} from "@mantine/core";
import { Head, router } from "@inertiajs/react";
import {
    IconCheck,
    IconPackage,
    IconTruck,
    IconMapPin,
    IconCreditCard,
    IconShoppingBag,
    IconHome,
} from "@tabler/icons-react";

function OrderSuccess({ order }) {
    // Calculate total from order items
    const subtotal =
        order?.items?.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        ) || 0;

    const shippingFee = 48.0;

    const total = subtotal + shippingFee;

    // Format date
    const orderDate = order?.created_at
        ? new Date(order.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          })
        : new Date().toLocaleDateString();

    return (
        <Box
            style={{
                background:
                    "linear-gradient(135deg, #FBF2E9 0%, #F5EDD8 50%, #FBF2E9 100%)",
                minHeight: "100vh",
                paddingTop: "2rem",
                paddingBottom: "2rem",
            }}
        >
            <Container size="lg">
                <Head>
                    <title>Order Successful - Hi Baby!</title>
                    <meta
                        name="description"
                        content="Your order was placed successfully."
                    />
                </Head>

                {/* Success Header */}
                <Paper
                    shadow="lg"
                    radius="xl"
                    p="xl"
                    mb="xl"
                    style={{
                        background:
                            "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                        border: "2px solid #BAB86C",
                        textAlign: "center",
                    }}
                >
                    <ThemeIcon
                        size={80}
                        radius="xl"
                        style={{
                            background:
                                "linear-gradient(135deg, #51cf66 0%, #40c057 100%)",
                            margin: "0 auto 1rem",
                        }}
                    >
                        <IconCheck size={40} />
                    </ThemeIcon>

                    <Title
                        order={1}
                        mb="md"
                        style={{ color: "#2d3436", fontSize: "2.5rem" }}
                    >
                        Order Confirmed!
                    </Title>

                    <Text size="lg" mb="sm" style={{ color: "#636e72" }}>
                        Thank you for shopping with Hi Baby!
                    </Text>

                    <Group position="center" spacing="xs">
                        <Text size="md" style={{ color: "#636e72" }}>
                            Order Number:
                        </Text>
                        <Badge
                            size="lg"
                            variant="gradient"
                            gradient={{ from: "#BAB86C", to: "#a8a659" }}
                            style={{ fontSize: "1rem", padding: "0.5rem 1rem" }}
                        >
                            #{order?.id || "N/A"}
                        </Badge>
                    </Group>

                    <Text size="sm" mt="xs" style={{ color: "#74b9ff" }}>
                        {orderDate}
                    </Text>
                </Paper>

                <Grid gutter="xl">
                    {/* Order Details */}
                    <Grid.Col xs={12} md={8}>
                        <Stack spacing="lg">
                            {/* Order Items */}
                            <Paper shadow="md" radius="lg" p="xl">
                                <Group mb="lg">
                                    <ThemeIcon
                                        size={40}
                                        radius="lg"
                                        style={{ background: "#BAB86C" }}
                                    >
                                        <IconShoppingBag size={20} />
                                    </ThemeIcon>
                                    <Title
                                        order={3}
                                        style={{ color: "#2d3436" }}
                                    >
                                        Order Items
                                    </Title>
                                </Group>

                                <Stack spacing="md">
                                    {order?.items?.length > 0 ? (
                                        order.items.map((item, index) => (
                                            <Card
                                                key={item.id || index}
                                                withBorder
                                                radius="lg"
                                                shadow="sm"
                                                p="lg"
                                                style={{
                                                    backgroundColor: "#fffdf7",
                                                }}
                                            >
                                                <Group
                                                    align="flex-start"
                                                    noWrap
                                                >
                                                    <Box style={{ flex: 1 }}>
                                                        <Text
                                                            fw={600}
                                                            fz="lg"
                                                            mb={5}
                                                            style={{
                                                                color: "#2d3436",
                                                            }}
                                                        >
                                                            {item.product
                                                                ?.name ||
                                                                item.name ||
                                                                "Product"}
                                                        </Text>

                                                        <Group
                                                            spacing="xs"
                                                            mb="xs"
                                                        >
                                                            {item.color && (
                                                                <Badge
                                                                    size="sm"
                                                                    variant="light"
                                                                    color="blue"
                                                                >
                                                                    {item.color
                                                                        .name ||
                                                                        item.color}
                                                                </Badge>
                                                            )}
                                                            {item.size && (
                                                                <Badge
                                                                    size="sm"
                                                                    variant="light"
                                                                    color="grape"
                                                                >
                                                                    Size:{" "}
                                                                    {item.size
                                                                        .name ||
                                                                        item.size}
                                                                </Badge>
                                                            )}
                                                        </Group>

                                                        <Text
                                                            size="sm"
                                                            color="dimmed"
                                                        >
                                                            Quantity:{" "}
                                                            {item.quantity}
                                                        </Text>
                                                    </Box>

                                                    <Box
                                                        style={{
                                                            minWidth: 120,
                                                            textAlign: "right",
                                                        }}
                                                    >
                                                        <Text
                                                            size="sm"
                                                            color="dimmed"
                                                        >
                                                            ₱
                                                            {item.price?.toFixed(
                                                                2
                                                            ) || "0.00"}{" "}
                                                            each
                                                        </Text>
                                                        <Text
                                                            fw={700}
                                                            fz="lg"
                                                            style={{
                                                                color: "#BAB86C",
                                                            }}
                                                        >
                                                            ₱
                                                            {(
                                                                (item.price ||
                                                                    0) *
                                                                (item.quantity ||
                                                                    1)
                                                            ).toFixed(2)}
                                                        </Text>
                                                    </Box>
                                                </Group>
                                            </Card>
                                        ))
                                    ) : (
                                        <Text
                                            color="dimmed"
                                            align="center"
                                            py="xl"
                                        >
                                            No items found
                                        </Text>
                                    )}
                                </Stack>
                            </Paper>

                            {/* Delivery Information */}
                            <Paper shadow="md" radius="lg" p="xl">
                                <Group mb="lg">
                                    <ThemeIcon
                                        size={40}
                                        radius="lg"
                                        style={{ background: "#74b9ff" }}
                                    >
                                        <IconTruck size={20} />
                                    </ThemeIcon>
                                    <Title
                                        order={3}
                                        style={{ color: "#2d3436" }}
                                    >
                                        Delivery Information
                                    </Title>
                                </Group>

                                <Stack spacing="md">
                                    <Group>
                                        <IconMapPin
                                            size={18}
                                            style={{ color: "#636e72" }}
                                        />
                                        <Box>
                                            <Text weight={500} mb="xs">
                                                Delivery Address
                                            </Text>
                                            <Text
                                                size="sm"
                                                style={{ color: "#636e72" }}
                                            >
                                                {order?.address ||
                                                    "Address not provided"}
                                            </Text>
                                        </Box>
                                    </Group>

                                    <Group>
                                        <IconPackage
                                            size={18}
                                            style={{ color: "#636e72" }}
                                        />
                                        <Box>
                                            <Text weight={500} mb="xs">
                                                Estimated Delivery
                                            </Text>
                                            <Text
                                                size="sm"
                                                style={{ color: "#636e72" }}
                                            >
                                                3-5 business days
                                            </Text>
                                        </Box>
                                    </Group>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid.Col>

                    {/* Order Summary Sidebar */}
                    <Grid.Col xs={12} md={4}>
                        <Paper
                            shadow="md"
                            radius="lg"
                            p="xl"
                            style={{ position: "sticky", top: "2rem" }}
                        >
                            <Group mb="lg">
                                <ThemeIcon
                                    size={40}
                                    radius="lg"
                                    style={{ background: "#e17055" }}
                                >
                                    <IconCreditCard size={20} />
                                </ThemeIcon>
                                <Title order={3} style={{ color: "#2d3436" }}>
                                    Order Summary
                                </Title>
                            </Group>

                            <Stack spacing="md">
                                <Group position="apart">
                                    <Text>Subtotal:</Text>
                                    <Text>₱{subtotal.toFixed(2)}</Text>
                                </Group>

                                <Group position="apart">
                                    <Text>Shipping:</Text>
                                    <Text>₱{shippingFee.toFixed(2)}</Text>
                                </Group>

                                <Group position="apart">
                                    <Text>Tax:</Text>
                                    <Text>₱0.00</Text>
                                </Group>

                                <Divider />

                                <Group position="apart">
                                    <Text weight={700} size="lg">
                                        Total:
                                    </Text>
                                    <Text
                                        weight={700}
                                        size="lg"
                                        style={{ color: "#BAB86C" }}
                                    >
                                        ₱{total.toFixed(2)}
                                    </Text>
                                </Group>

                                <Badge
                                    size="lg"
                                    variant="light"
                                    color="green"
                                    style={{
                                        padding: "0.75rem",
                                    }}
                                >
                                    Payment Method:{" "}
                                    {order?.payment_method ||
                                        "Cash on Delivery"}
                                </Badge>

                                <Badge
                                    size="lg"
                                    variant="light"
                                    color="blue"
                                    style={{

                                        textAlign: "left",
                                        padding: "0.75rem",
                                    }}
                                >
                                    Status: {order?.status || "Processing"}
                                </Badge>
                            </Stack>
                        </Paper>
                    </Grid.Col>
                </Grid>

                {/* Action Buttons */}
                <Flex gap="md" mt="xl" justify="center" wrap="wrap">
                    <Button
                        size="lg"
                        variant="gradient"
                        gradient={{ from: "#BAB86C", to: "#a8a659" }}
                        leftIcon={<IconHome size={20} />}
                        onClick={() => router.visit("/home")}
                        style={{ minWidth: "200px" }}
                    >
                        Continue Shopping
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        color="blue"
                        leftIcon={<IconPackage size={20} />}
                        onClick={() => router.visit("/profile/orders")}
                        style={{ minWidth: "200px" }}
                    >
                        View All Orders
                    </Button>
                </Flex>
            </Container>
        </Box>
    );
}

export default OrderSuccess;
