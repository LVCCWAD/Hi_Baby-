import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    Container,
    Title,
    Card,
    Text,
    Group,
    Button,
    Image,
    Stack,
    Divider,
    Badge,
    Timeline,
    Modal,
    Box,
    Grid,
    ActionIcon,
    Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconCopy,
    IconTruck,
    IconPackage,
    IconCheck,
    IconX,
} from "@tabler/icons-react";

function OrderDetails({ order }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [cancelling, setCancelling] = useState(false);

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

    const handleCancelOrder = () => {
        setCancelling(true);
        close();  // Close modal immediately after clicking cancel

        router.post(
            `/orders/${order.id}/cancel`,
            {},
            {
                onSuccess: () => {
                    setCancelling(false);
                    router.visit('/profile'); // ✅ Redirect after success
                },
                onError: (errors) => {
                    console.error("Order cancellation failed", errors);
                    setCancelling(false);
                },
            }
        );
    };



    const copyOrderId = () => {
        navigator.clipboard.writeText(`#${order.id}`);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const subtotal =
        order.items?.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        ) || 0;
    const deliveryFee = 90;
    const discount = 150;
    const total = subtotal + deliveryFee - discount;

    const canCancelOrder = order.status.toLowerCase() === "pending";

    return (
        <Container size="xl" py="xl">
            <Head title={`Order #${order.id}`} />
            <Group mb="xl">

                <Title order={1}>Order Details</Title>
            </Group>

            <Grid>
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Group justify="space-between" mb="lg">
                            <Group>
                                <Text size="xl" fw={600}>
                                    Order #{order.id}
                                </Text>
                                <Tooltip label="Copy Order ID">
                                    <ActionIcon
                                        variant="subtle"
                                        onClick={copyOrderId}
                                    >
                                        <IconCopy size={16} />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                            <Group>
                                <Badge
                                    color={getStatusColor(order.status)}
                                    size="lg"
                                >
                                    {order.status.charAt(0).toUpperCase() +
                                        order.status.slice(1)}
                                </Badge>
                                {canCancelOrder && (
                                    <Button
                                        color="red"
                                        variant="outline"
                                        onClick={open}
                                        leftSection={<IconX size={16} />}
                                    >
                                        Cancel Order
                                    </Button>
                                )}
                            </Group>
                        </Group>

                        <Timeline
                            active={
                                order.status === "delivered"
                                    ? 3
                                    : order.status === "shipped"
                                    ? 2
                                    : 1
                            }
                            bulletSize={24}
                            lineWidth={2}
                            mb="xl"
                        >
                            <Timeline.Item
                                bullet={<IconCheck size={12} />}
                                title="Order Placed"
                            >
                                <Text color="dimmed" size="sm">
                                    {formatDate(order.created_at)}
                                </Text>
                            </Timeline.Item>
                            <Timeline.Item
                                bullet={<IconPackage size={12} />}
                                title="Order Shipped"
                                color={
                                    order.status === "shipped" ||
                                    order.status === "delivered"
                                        ? "blue"
                                        : "gray"
                                }
                            >
                                <Text color="dimmed" size="sm">
                                    {order.status === "shipped" ||
                                    order.status === "delivered"
                                        ? "Your parcel has departed from sorting facility"
                                        : "Seller is preparing to ship your parcel"}
                                </Text>
                            </Timeline.Item>
                            <Timeline.Item
                                bullet={<IconTruck size={12} />}
                                title="Out for Delivery"
                                color={
                                    order.status === "delivered"
                                        ? "green"
                                        : "gray"
                                }
                            >
                                <Text color="dimmed" size="sm">
                                    {order.status === "delivered"
                                        ? "Your parcel has been picked up by our logistics partner"
                                        : "Your parcel will be out for delivery soon"}
                                </Text>
                            </Timeline.Item>
                            <Timeline.Item
                                bullet={<IconCheck size={12} />}
                                title="Delivered"
                                color={
                                    order.status === "delivered"
                                        ? "green"
                                        : "gray"
                                }
                            >
                                <Text color="dimmed" size="sm">
                                    {order.status === "delivered"
                                        ? "Your parcel has arrived at the delivery hub"
                                        : "Your order will be delivered soon"}
                                </Text>
                            </Timeline.Item>
                        </Timeline>

                        <Divider my="lg" />

                        <Title order={3} mb="md">
                            Order Items
                        </Title>
                        <Stack gap="md">
                            {order.items?.map((item) => (
                                <Card
                                    key={item.id}
                                    padding="md"
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
                                            width={80}
                                            height={80}
                                            radius="md"
                                        />
                                        <Box flex={1}>
                                            <Text fw={500} size="lg">
                                                {item.product.name}
                                            </Text>
                                            <Text size="sm" color="dimmed">
                                                Color: {item.color?.name}, Size:{" "}
                                                {item.size?.name}
                                            </Text>
                                            <Group mt="xs">
                                                <Text size="sm">
                                                    Quantity: {item.quantity}
                                                </Text>
                                                <Text size="lg" fw={600}>
                                                    ₱
                                                    {item.price.toLocaleString()}
                                                </Text>
                                            </Group>
                                        </Box>
                                        <ActionIcon variant="subtle">
                                            <IconCopy size={16} />
                                        </ActionIcon>
                                    </Group>
                                </Card>
                            ))}
                        </Stack>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        mb="md"
                    >
                        <Title order={4} mb="md">
                            Delivery Information
                        </Title>
                        <Stack gap="xs">
                            <Group justify="space-between">
                                <Text size="sm" color="dimmed">
                                    Your Name
                                </Text>
                                <Text size="sm">
                                    {order.user?.name || "N/A"}
                                </Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" color="dimmed">
                                    Address
                                </Text>
                                <Text
                                    size="sm"
                                    style={{
                                        textAlign: "right",
                                        maxWidth: "60%",
                                    }}
                                >
                                    {order.address}
                                </Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" color="dimmed">
                                    Mode of Payment
                                </Text>
                                <Text size="sm">
                                    {order.payment_method === "cod"
                                        ? "Cash on Delivery"
                                        : order.payment_method}
                                </Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" color="dimmed">
                                    Order Placed on
                                </Text>
                                <Text size="sm">
                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString()}
                                </Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" color="dimmed">
                                    Order #
                                </Text>
                                <Text size="sm">{order.id}</Text>
                            </Group>
                        </Stack>
                    </Card>

                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Title order={4} mb="md">
                            Order Summary
                        </Title>
                        <Stack gap="xs">
                            <Group justify="space-between">
                                <Text size="sm">Subtotal</Text>
                                <Text size="sm">
                                    ₱{subtotal.toLocaleString()}
                                </Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm">Delivery</Text>
                                <Text size="sm">₱{deliveryFee}</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm">Discount</Text>
                                <Text size="sm" color="green">
                                    -₱{discount}
                                </Text>
                            </Group>
                            <Divider my="xs" />
                            <Group justify="space-between">
                                <Text fw={600} size="lg">
                                    Order Total
                                </Text>
                                <Text fw={600} size="lg">
                                    ₱{order.total_amount.toLocaleString()}
                                </Text>
                            </Group>
                        </Stack>
                    </Card>
                </Grid.Col>
            </Grid>

            <Modal
                opened={opened}
                onClose={close}
                title="Cancel Order"
                centered
            >
                <Text mb="md">
                    Are you sure you want to cancel this order? This action
                    cannot be undone.
                </Text>
                <Group justify="flex-end">
                    <Button variant="outline" onClick={close}>
                        Keep Order
                    </Button>
                    <Button
                        color="red"
                        onClick={handleCancelOrder}
                        loading={cancelling}
                    >
                        Cancel Order
                    </Button>
                </Group>
            </Modal>
        </Container>
    );
}

export default OrderDetails;
