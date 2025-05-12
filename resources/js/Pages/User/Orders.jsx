import { Card, Text, Group, Container, Stack, Badge, MantineProvider } from "@mantine/core";
import AuthHeader from "../../Components/AuthHeader";

function Orders({ orders = [] }) {
    return (
        <MantineProvider>
            <AuthHeader />
            <Container size="lg" mt="xl">
                <Text size="xl" weight={700} mb="lg">
                    My Orders
                </Text>

                <Stack spacing="md">
                    {orders.map((order) => (
                        <Card key={order.id} shadow="sm" p="lg" radius="md" withBorder>
                            <Group position="apart" mb="xs">
                                <Text weight={500}>Order #{order.id}</Text>
                                <Badge
                                    color={
                                        order.status === "completed"
                                            ? "green"
                                            : order.status === "cancelled"
                                            ? "red"
                                            : "blue"
                                    }
                                >
                                    {order.status.toUpperCase()}
                                </Badge>
                            </Group>

                            <Text size="sm" color="dimmed" mb="md">
                                Placed on: {new Date(order.created_at).toLocaleDateString()}
                            </Text>

                            {order.orderItems.map((item) => (
                                <Card key={item.id} withBorder mb="xs">
                                    <Group>
                                        <div style={{ flex: 1 }}>
                                            <Text weight={500}>{item.product.name}</Text>
                                            <Text size="sm" color="dimmed">
                                                Size: {item.size.name}, Color: {item.color.name}
                                            </Text>
                                            <Text size="sm">
                                                Quantity: {item.quantity} x ₱{item.price}
                                            </Text>
                                        </div>
                                        <Text weight={700}>₱{item.quantity * item.price}</Text>
                                    </Group>
                                </Card>
                            ))}

                            <Group position="apart" mt="md">
                                <Text>Total Amount:</Text>
                                <Text weight={700} size="lg" color="blue">
                                    ₱{order.total_amount}
                                </Text>
                            </Group>

                            <Text size="sm" mt="md">
                                Shipping Address: {order.shipping_address}
                            </Text>

                            <Text size="sm" mt="xs">
                                Payment Status:{" "}
                                <Badge
                                    color={
                                        order.payment_status === "paid"
                                            ? "green"
                                            : order.payment_status === "failed"
                                            ? "red"
                                            : "yellow"
                                    }
                                >
                                    {order.payment_status.toUpperCase()}
                                </Badge>
                            </Text>
                        </Card>
                    ))}
                </Stack>
            </Container>
        </MantineProvider>
    );
}

export default Orders;