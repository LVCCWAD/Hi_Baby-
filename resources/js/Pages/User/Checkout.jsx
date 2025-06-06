import React, { useState } from "react";
import { Container, Text, Grid, Paper } from "@mantine/core";
import OrderSummary from "../../Components/OrderSummary"; // reuse your order summary component
import { router, usePage, Head } from "@inertiajs/react";

function Checkout({ product, address, initialData }) {
    console.log("Checkout props:", { product, address, initialData });
    console.log("product.price:", product.price, "type:", typeof product.price);

    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(initialData.quantity || 1);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
        initialData.payment_method || "cod"
    );

    const price = Number(product.price);
    const safePrice = isNaN(price) ? 0 : price;
    const total = safePrice * quantity;
    const colorId = initialData.color_id;
    const sizeId = initialData.size_id;

    const handleCheckout = (paymentMethod) => {
        console.log("Starting checkout with:");
        console.log("Address:", address);
        console.log("Product ID:", product.id);
        console.log("Color ID:", colorId);
        console.log("Size ID:", sizeId);
        console.log("Quantity:", quantity);
        console.log("Payment method:", paymentMethod);

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
                onSuccess: () => {
                    setLoading(false);
                    // router.visit("/order/success");
                },
                onError: (errors) => {
                    setLoading(false);
                    console.error("Order failed:", errors);
                    alert("Failed to place order.");
                },
            }
        );
    };

    return (
        <Container size="xl" mt="xl">
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

            <Grid>
                <Grid.Col span={8}>
                    <Paper shadow="sm" radius="md" p="md">
                        <Text weight={500} mb="md">
                            Product
                        </Text>
                        <Text>Name: {product.name}</Text>
                        <Text>Price: ${product.price.toFixed(2)}</Text>
                        <Text>Quantity: {quantity}</Text>
                        <Text>Total: ${total.toFixed(2)}</Text>
                        {/* You can add inputs here to update quantity, select payment method, etc. */}
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
                        // optionally pass setters for payment method if your OrderSummary supports it
                    />
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default Checkout;
