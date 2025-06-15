import React, { useState } from "react";
import {
    Container,
    Text,
    Grid,
    Paper,
    Image,
    Group,
    Badge,
    Stack,
    Divider,
    Box,
    Center,
} from "@mantine/core";
import OrderSummary from "../../Components/OrderSummary";
import { router, Head } from "@inertiajs/react";

function Checkout({ product, address, initialData, colors, sizes }) {
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(initialData.quantity || 1);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
        initialData.payment_method || "cod"
    );

    const price = parseFloat(product?.price) || 0;
    const safePrice = isNaN(price) ? 0 : price;
    const total = safePrice * quantity;
    const colorId = initialData.color_id;
    const sizeId = initialData.size_id;

    const handleCheckout = (paymentMethod) => {
        if (!address) {
            alert("Please select a shipping address.");
            return;
        }

        if (!colorId || !sizeId) {
            alert("Missing color or size selection.");
            return;
        }

        setLoading(true);

        router.post(
            "/order-checkout",
            {
                address: `${address.street}, ${address.city}, ${
                    address.state ?? ""
                } ${address.zip ?? ""}`.trim(),
                product_id: product.id,
                quantity,
                color_id: colorId,
                size_id: sizeId,
                payment_method: paymentMethod,
            },
            {
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <Container size="lg" my="xl">
            <Head>
                <title>Checkout Confirmation - Hi Baby!</title>
                <meta
                    name="description"
                    content="Confirm your order details before placing your order."
                />
            </Head>

            <Text size="xl" fw={700} mb="lg">
                Checkout Confirmation
            </Text>

            <Grid gutter="lg">
                <Grid.Col span={8}>
                    <Paper shadow="md" radius="md" p="lg" withBorder>
                        <Group align="flex-start" spacing="lg" noWrap>
                            <Box w={200} h={200} bg="gray.0" p="xs" style={{ borderRadius: 12 }}>
                                <Center style={{ width: '100%', height: '100%' }}>
                                    <Image
                                        src={
                                            product.image
                                                ? `/storage/${product.image}`
                                                : "/default-image.jpg"
                                        }
                                        alt={product.name}
                                        fit="contain"
                                        height="100%"
                                        width="100%"
                                        radius="md"
                                    />
                                </Center>
                            </Box>

                            <Stack spacing="xs" style={{ flex: 1 }}>
                                <Text fw={600} size="lg" mb={5}>
                                    {product.name}
                                </Text>

                                <Divider />

                                <Group spacing="sm">
                                    <Text size="sm" color="dimmed" fw={500}>Price:</Text>
                                    <Text size="sm">₱{safePrice.toFixed(2)}</Text>
                                </Group>

                                <Group spacing="sm">
                                    <Text size="sm" color="dimmed" fw={500}>Quantity:</Text>
                                    <Text size="sm">{quantity}</Text>
                                </Group>

                                <Group spacing="sm">
                                    <Text size="sm" color="dimmed" fw={500}>Color:</Text>
                                    <Badge size="sm" color="pink" variant="light">
                                        {initialData.color_name || "N/A"}
                                    </Badge>
                                </Group>

                                <Group spacing="sm">
                                    <Text size="sm" color="dimmed" fw={500}>Size:</Text>
                                    <Badge size="sm" color="blue" variant="light">
                                        {initialData.size_name || "N/A"}
                                    </Badge>
                                </Group>

                                <Divider my="sm" />

                                <Group spacing="sm">
                                    <Text fw={600} size="md">Total:</Text>
                                    <Text fw={700} size="lg" color="teal">
                                        ₱{total.toFixed(2)}
                                    </Text>
                                </Group>
                            </Stack>
                        </Group>
                    </Paper>
                </Grid.Col>

                <Grid.Col span={4}>
                    <OrderSummary
                        total={total}
                        handleCheckout={handleCheckout}
                        loading={loading}
                        selectedItems={[
                            {
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                quantity,
                            },
                        ]}
                    />
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default Checkout;
