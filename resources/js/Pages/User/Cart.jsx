import React, { useState } from "react";
import { Container, Text, Grid, Paper, Checkbox, Group } from "@mantine/core";
import CartItem from "../../Components/CartItem"; // your cart item UI component
import OrderSummary from "../../Components/OrderSummary"; // your order summary UI component
import { router, usePage, Head } from "@inertiajs/react";

function Cart({ cart = [] }) {
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [cartItems, setCartItems] = useState(cart);
    const { address } = usePage().props;

    const handleDelete = (id) => {
        if (
            confirm("Are you sure you want to delete this item from your cart?")
        ) {
            router.delete(`/cart/${id}`, {
                onSuccess: () => {
                    setCartItems((prev) =>
                        prev.filter((item) => item.id !== id)
                    );
                    setSelectedItems((prev) =>
                        prev.filter((itemId) => itemId !== id)
                    );
                },
                onError: () => {
                    alert("Failed to remove item.");
                },
            });
        }
    };

    const handleQuantityChange = (id, quantity) => {
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

    // Calculate total of selected items only
    const total = cartItems
        .filter((item) => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (!address) {
            alert("Please select a shipping address.");
            return;
        }
        if (selectedItems.length === 0) {
            alert("Please select at least one item to checkout.");
            return;
        }
        setLoading(true);
        router.post(
            "/order/create",
            {
                address: `${address.street}, ${address.city}, ${
                    address.state ?? ""
                } ${address.zip ?? ""}`.trim(),
                items: selectedItems,
            },
            {
                onSuccess: (page) => {
                    setLoading(false);
                    setCartItems([]);
                    setSelectedItems([]);
                    // const orderId = page.props?.order_id || page.order_id;
                    // router.visit(`/order-success/${orderId}`);
                },
                onError: () => {
                    setLoading(false);
                    alert("Failed to place order.");
                },
            }
        );
    };

    return (
        <Container size="xl" mt="xl">
            <Head>
                <title>Shopping Cart - Hi Baby!</title>
                <meta
                    name="description"
                    content="Review items in your shopping cart."
                />
            </Head>
            <Text size="xl" fw={700} mb="lg">
                Shopping Cart ({cartItems.length} items)
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
                        selectedItems={cartItems.filter((item) =>
                            selectedItems.includes(item.id)
                        )}
                    />
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default Cart;
