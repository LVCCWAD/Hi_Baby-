import React, { useState } from "react";
import {
    Container,
    Text,
    Grid,
    Paper,
    Checkbox,
    Group,
    Modal,
    Button,
    Flex,
    Divider,
    Box,
} from "@mantine/core";
import CartItem from "../../Components/CartItem";
import OrderSummary from "../../Components/OrderSummary";
import { router, usePage, Head } from "@inertiajs/react";
import { useDisclosure } from "@mantine/hooks";

function Cart({ cart = [] }) {
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [cartItems, setCartItems] = useState(cart);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
    const { address } = usePage().props;
    const [modalMessage, setModalMessage] = useState("");
    const [opened, { open, close }] = useDisclosure(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [modalAction, setModalAction] = useState(null);

    const handleDelete = (id) => {
        setModalMessage("Are you sure you want to delete this item from your cart?");
        setItemToDelete(id);
        setModalAction("delete");
        open();
    };

    const handleConfirm = () => {
        if (modalAction === "delete") {
            router.delete(`/cart/${itemToDelete}`, {
                onSuccess: () => {
                    setCartItems(prev => prev.filter(item => item.id !== itemToDelete));
                    setSelectedItems(prev => prev.filter(id => id !== itemToDelete));
                    close();
                },
                onError: () => alert("Failed to remove item."),
            });
        }

        if (modalAction === "checkout") {
            setLoading(true);
            router.post(
                "/order/create",
                {
                    address: `${address.street}, ${address.city}, ${address.state ?? ""} ${address.zip ?? ""}`.trim(),
                    items: selectedItems,
                    payment_method: selectedPaymentMethod,
                },
                {
                    onSuccess: () => {
                        setLoading(false);
                        setCartItems([]);
                        setSelectedItems([]);
                        close();
                    },
                    onError: () => {
                        setLoading(false);
                        alert("Failed to place order.");
                    },
                }
            );
        }
    };

    // 🔥 NEW: Backend persistent quantity update
    const handleQuantityChange = (id, quantity) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
        );
        setCartItems(updatedItems);

        // Send update to backend
        router.put(`/cart/${id}`, { quantity }, {
            preserveScroll: true,
            onError: () => alert("Failed to update quantity."),
        });
    };

    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        setSelectedItems(checked ? cartItems.map(item => item.id) : []);
    };

    const handleSelectItem = (id) => {
        setSelectedItems(prev => {
            const newSelection = prev.includes(id)
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id];
            setSelectAll(newSelection.length === cartItems.length);
            return newSelection;
        });
    };

    const total = cartItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (!address) {
            setModalMessage("Please select a shipping address.");
            setModalAction(null);
            open();
            return;
        }
        if (selectedItems.length === 0) {
            setModalMessage("Please select at least one item to checkout.");
            setModalAction(null);
            open();
            return;
        }
        setModalMessage("Are you sure you want to place this order?");
        setModalAction("checkout");
        open();
    };

    return (
        <Container size="xl" mt="xl">
            <Head>
                <title>Shopping Cart - Hi Baby!</title>
            </Head>

            <Text size="xl" fw={700} mb="lg">Shopping Cart ({cartItems.length} items)</Text>
            <Grid>
                <Grid.Col span={8}>
                    <Paper shadow="sm" radius="md" p="md">
                        <Group justify="space-between" mb="md">
                            <Checkbox
                                label="Select All Items"
                                checked={selectAll}
                                onChange={(e) => handleSelectAll(e.currentTarget.checked)}
                            />
                        </Group>

                        <div>
                            {cartItems.map(item => (
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
                        selectedItems={cartItems.filter(item => selectedItems.includes(item.id))}
                    />
                </Grid.Col>
            </Grid>

            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                centered
                size="xs"
                radius="md"
                styles={{
                    body: { padding: 0, backgroundColor: "#FBF2E9" },
                    content: { borderRadius: "12px", overflow: "hidden" },
                }}
            >
                <Box p="xl">
                    <Text ta="center" size="lg" fw={700}>{modalMessage}</Text>
                </Box>

                <Divider size="sm" color="black" />

                <Flex>
                    <Button variant="subtle" color="black" fullWidth radius={0}
                        style={{ borderRight: "1px solid black", borderRadius: "0 0 0 12px" }}
                        onClick={close}>No</Button>

                    {modalAction ? (
                        <Button
                            variant="subtle"
                            color="black"
                            fullWidth
                            radius={0}
                            style={{ borderRadius: "0 0 12px 0" }}
                            onClick={handleConfirm}
                            loading={loading && modalAction === "checkout"}
                        >Yes</Button>
                    ) : (
                        <Button
                            variant="subtle"
                            color="black"
                            fullWidth
                            radius={0}
                            style={{ borderRadius: "0 0 12px 0" }}
                            onClick={close}>OK</Button>
                    )}
                </Flex>
            </Modal>
        </Container>
    );
}

export default Cart;
