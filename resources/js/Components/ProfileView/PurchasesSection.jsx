import React from "react";
import {
    Card,
    Title,
    Divider,
    Group,
    Tabs,
    Text,
    Stack,
    Paper,
    Grid,
    Box,
    Image,
    Button,
} from "@mantine/core";
import {
    IconShoppingCart,
    IconPackage,
    IconCheck,
    IconX,
    IconCalendar,
    IconId,
    IconEye,
} from "@tabler/icons-react";
import { Link } from "@inertiajs/react";

function PurchasesSection({
    orderFilter,
    setOrderFilter,
    orders = [],
    ordersCount,
}) {
    if (!Array.isArray(orders)) {
        return (
            <Text color="red" align="center">
                Error loading orders. Please refresh the page or try again later.
            </Text>
        );
    }

    const filterOrdersByStatus = (orders, status) => {
        if (status === "all") return orders;
        return orders.filter((order) => order.status === status);
    };

    const filteredOrders = filterOrdersByStatus(orders, orderFilter);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">
                My Purchases
            </Title>
            <Divider mb="lg" />

            <Group position="apart" mb="md">
                <Tabs value={orderFilter} onChange={setOrderFilter}>
                    <Tabs.List>
                        {[
                            { value: "all", label: `All (${ordersCount})`, icon: IconShoppingCart },
                            { value: "pending", label: "Pending", icon: IconPackage },
                            { value: "shipped", label: "Shipped", icon: IconPackage },
                            { value: "delivered", label: "Delivered", icon: IconCheck },
                            { value: "cancelled", label: "Cancelled", icon: IconX },
                        ].map(({ value, label, icon: Icon }) => (
                            <Tabs.Tab
                                key={value}
                                value={value}
                                icon={<Icon size={16} />}
                                style={{
                                    backgroundColor: orderFilter === value ? "#B9BD7E" : "transparent",
                                    color: orderFilter === value ? "white" : "inherit",
                                    borderRadius: 0,
                                }}
                            >
                                {label}
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>
            </Group>

            {filteredOrders.length === 0 ? (
                <Text align="center" color="dimmed" py="xl">
                    No orders found
                </Text>
            ) : (
                <Stack spacing="lg">
                    {filteredOrders.map((order) => (
                        <Paper key={order.id} shadow="xs" p="md" withBorder>
                            <Grid>
                                <Grid.Col span={12}>
                                    <Group position="apart" mb="md" align="center">
                                        <Group>
                                            <IconCalendar size={16} />
                                            <Text size="sm">
                                                Ordered on:{" "}
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </Text>
                                        </Group>
                                        <Group>
                                            <IconId size={16} />
                                            <Text size="sm">Order #: {order.id}</Text>
                                        </Group>
                                        <Group>
                                            <Text weight={500}>Total:</Text>
                                            <Text weight={700}>₱{order.total_amount}</Text>
                                        </Group>
                                        <Button
                                            component={Link}
                                            href={`/orders/${order.id}`}
                                            variant="outline"
                                            leftSection={<IconEye size={16} />}
                                        >
                                            View Details
                                        </Button>
                                    </Group>
                                </Grid.Col>

                                {(order.items || []).map((item) => (
                                    <Grid.Col key={item.id} span={12}>
                                        <Group position="apart" align="center">
                                            <Group>
                                                <Box style={{ width: 80, height: 80, overflow: "hidden" }}>
                                                    <Image
                                                        src={
                                                            item?.product?.image
                                                                ? item.product.image.startsWith("http")
                                                                    ? item.product.image
                                                                    : `/storage/${item.product.image}`
                                                                : "/images/placeholder.png"
                                                        }
                                                        width={80}
                                                        height={80}
                                                        fit="contain"
                                                    />
                                                </Box>
                                                <div>
                                                    <Text weight={500}>
                                                        {item.product_name ?? item.product?.name ?? "Unnamed Product"}
                                                    </Text>
                                                    <Text size="sm" color="dimmed">
                                                        Color: {item.color || "N/A"} | Size: {item.size || "N/A"}
                                                    </Text>
                                                    <Text size="sm" color="dimmed">
                                                        Quantity: {item.quantity}
                                                    </Text>
                                                </div>
                                            </Group>
                                            <Text weight={700}>₱{item.price}</Text>
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
    );
}

export default PurchasesSection;
