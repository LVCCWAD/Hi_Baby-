    import React from "react";
    import { Head, Link } from "@inertiajs/react";
    import {
        Container,
        Title,
        Card,
        Text,
        Group,
        Divider,
        Button,
        Badge,
        Stack,
        Image,
        Box,
    } from "@mantine/core";
    import { IconEye, IconPackage } from "@tabler/icons-react";
    import UserLayout from "../../Layouts/UserLayout";

    function Orders({ orders }) {
        const getStatusColor = (status) => {
            switch (status.toLowerCase()) {
                case "pending":
                    return "yellow";
                case "shipped":
                    return "blue";
                case "delivered":
                    return "green";
                case "cancelled":
                    return "red";
                default:
                    return "gray";
            }
        };

        const getPaymentStatusColor = (status) => {
            switch (status.toLowerCase()) {
                case "paid":
                    return "green";
                case "pending":
                    return "yellow";
                case "failed":
                    return "red";
                default:
                    return "gray";
            }
        };

        return (
            <Container size="lg" py="xl">
                <Head title="Your Orders" />
                <Group mb="xl">
                    <IconPackage size={32} />
                    <Title order={1}>Your Orders</Title>
                </Group>

                {orders.length === 0 ? (
                    <Card shadow="sm" padding="xl" radius="md" withBorder>
                        <Stack align="center" gap="md">
                            <IconPackage size={64} color="gray" />
                            <Text size="lg" color="dimmed">
                                No orders found
                            </Text>
                            <Text size="sm" color="dimmed">
                                Start shopping to see your orders here
                            </Text>
                            <Button component={Link} href="/home">
                                Start Shopping
                            </Button>
                        </Stack>
                    </Card>
                ) : (
                    <Stack gap="lg">
                        {orders.map((order) => (
                            <Card
                                key={order.id}
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                            >
                                <Group justify="space-between" mb="md">
                                    <Group>
                                        <Text fw={600} size="lg">
                                            Order #{order.id}
                                        </Text>
                                        <Badge color={getStatusColor(order.status)}>
                                            {order.status.charAt(0).toUpperCase() +
                                                order.status.slice(1)}
                                        </Badge>
                                        <Badge
                                            color={getPaymentStatusColor(
                                                order.payment_status
                                            )}
                                            variant="outline"
                                        >
                                            {order.payment_status
                                                .charAt(0)
                                                .toUpperCase() +
                                                order.payment_status.slice(1)}
                                        </Badge>
                                    </Group>
                                    <Group>
                                        <Text color="dimmed" size="sm">
                                            {new Date(
                                                order.created_at
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </Text>
                                        <Button
                                            component={Link}
                                            href={`/orders/${order.id}`}
                                            variant="outline"
                                            leftSection={<IconEye size={16} />}
                                        >
                                            View Details
                                        </Button>
                                    </Group>
                                </Group>

                                <Group justify="space-between" mb="md">
                                    <Text fw={500} size="lg">
                                        Total: ₱
                                        {order.total_amount.toLocaleString()}
                                    </Text>
                                    <Text size="sm" color="dimmed">
                                        Payment:{" "}
                                        {order.payment_method === "cod"
                                            ? "Cash on Delivery"
                                            : order.payment_method}
                                    </Text>
                                </Group>

                                <Text
                                    size="sm"
                                    color="dimmed"
                                    mb="md"
                                    lineClamp={2}
                                >
                                    Delivery Address: {order.address}
                                </Text>

                                <Divider my="sm" label="Items" />

                                <Stack gap="xs">
                                    {order.items?.slice(0, 3).map((item) => (
                                        <Card
                                            key={item.id}
                                            padding="sm"
                                            radius="md"
                                            withBorder
                                        >
                                            <Group>
                                                <Image
                                                    src={
                                                        item.product.image
                                                            ? `/storage/${item.product.image}`
                                                            : "/images/placeholder.png"
                                                    }
                                                    alt={item.product.name}
                                                    width={50}
                                                    height={50}
                                                    radius="md"
                                                />
                                                <Box flex={1}>
                                                    <Text fw={500}>
                                                        {item.product.name}
                                                    </Text>
                                                    <Text size="sm" color="dimmed">
                                                        Color: {item.color?.name},
                                                        Size: {item.size?.name}
                                                    </Text>
                                                </Box>
                                                <Group gap="xs">
                                                    <Text size="sm">
                                                        x{item.quantity}
                                                    </Text>
                                                    <Text fw={500}>
                                                        ₱
                                                        {item.price.toLocaleString()}
                                                    </Text>
                                                </Group>
                                            </Group>
                                        </Card>
                                    ))}
                                    {order.items?.length > 3 && (
                                        <Text size="sm" color="dimmed" ta="center">
                                            +{order.items.length - 3} more items
                                        </Text>
                                    )}
                                </Stack>
                            </Card>
                        ))}
                    </Stack>
                )}
            </Container>
        );
    }

    export default Orders;
