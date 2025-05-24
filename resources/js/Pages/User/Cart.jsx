import React, { useEffect, useState } from "react";
import { Container, Text, Grid, Paper, Checkbox, Group } from "@mantine/core";
import CartItem from "../../Components/CartItem";
import OrderSummary from "../../Components/OrderSummary";
import { router, usePage } from "@inertiajs/react";

function Cart({ cart = [] }) {
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [cartItems, setCartItems] = useState(cart);
    const { address } = usePage().props;
    console.log("Loaded address:", address);

    const handleDelete = (id) => {
        if (
            confirm("Are you sure you want to delete this item from your cart?")
        ) {
            router.delete(`/cart/${id}`, {
                onSuccess: () => {
                    setCartItems((prev) =>
                        prev.filter((item) => item.id !== id)
                    );
                    console.log("Item removed from cart successfully.");
                },
                onError: () => {
                    console.error("Failed to remove item from cart.");
                },
            });
        }
    };

    const handleQuantityChange = (id, quantity) => {
        console.log("Changing quantity", { id, quantity });
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        if (checked) {
            setSelectedItems(cartItems.map((item) => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id) => {
        setSelectedItems((prev) => {
            const newSelection = prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id];
            setSelectAll(newSelection.length === cartItems.length);
            return newSelection;
        });
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        if (!address) {
            console.log("Please select a shipping address.");
            return;
        }

        // Compose string from address object fields
        const shippingAddressString = `${address.street}, ${address.city}, ${
            address.state ?? ""
        } ${address.zip ?? ""}`.trim();

        if (shippingAddressString.length < 10) {
            console.log("Shipping address is too short.");
            return;
        }

        setLoading(true);

        router.post(
            "/order/create",
            {
                address: shippingAddressString,
            },
            {
                onSuccess: () => {
                    console.log("Order placed successfully!");
                    setLoading(false);
                },
                onError: (errors) => {
                    console.error("Failed to place order:", errors);
                    setLoading(false);
                },
            }
        );
    };

    return (
        <Container size="xl" mt="xl">
            <Text size="xl" weight={700} mb="lg">
                Your Shopping Cart ({cartItems.length} items)
            </Text>
            <Grid>
                <Grid.Col span={8}>
                    <Paper shadow="sm" radius="md" p="md">
                        <Group position="apart" mb="md">
                            <Checkbox
                                label="Select All Items"
                                checked={selectAll}
                                onChange={(e) =>
                                    handleSelectAll(e.currentTarget.checked)
                                }
                            />
                        </Group>
                        <div>
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    selectedItems={selectedItems}
                                    handleSelectItem={handleSelectItem}
                                    handleDelete={handleDelete}
                                    handleQuantityChange={handleQuantityChange}
                                />
                            ))}
                        </div>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                    <OrderSummary
                        total={total}
                        handleCheckout={handleCheckout}
                        loading={loading}
                        selectedItems={selectedItems}
                    />
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default Cart;
