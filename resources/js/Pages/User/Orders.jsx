import React from 'react';
import { Container, Title, Card, Text, Group, Divider } from '@mantine/core';

function Orders({ orders }) {
    return (
        <Container size="lg" mt="xl">
            <Title order={2} mb="lg">Your Orders</Title>

            {orders.length === 0 ? (
                <Text>No orders found.</Text>
            ) : (
                orders.map((order) => (
                    <Card key={order.id} shadow="sm" mb="lg" withBorder>
                        <Group position="apart" mb="sm">
                            <Text weight={600}>Order #{order.id}</Text>
                            <Text color="dimmed">{new Date(order.created_at).toLocaleDateString()}</Text>
                        </Group>
                        <Text>Total: ₹{order.total_amount.toFixed(2)}</Text>
                        <Text>Status: {order.status}</Text>
                        <Text>Payment: {order.payment_status}</Text>
                        <Text>Address: {order.address}</Text>

                        <Divider my="sm" label="Items" />

                        {order.order_items.map((item) => (
                            <Card key={item.id} p="sm" radius="md" withBorder mb="xs">
                                <Group position="apart">
                                    <Text>{item.product.name}</Text>
                                    <Text>x{item.quantity}</Text>
                                </Group>
                                <Text size="sm" color="dimmed">
                                    Color: {item.color.name}, Size: {item.size.name}
                                </Text>
                                <Text size="sm">Price: ₹{item.price}</Text>
                            </Card>
                        ))}
                    </Card>
                ))
            )}
        </Container>
    );
}

export default Orders;
