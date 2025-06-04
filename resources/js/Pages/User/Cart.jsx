import React, { useState } from "react";
import { Container, Text, Grid, Paper, Checkbox, Group, Modal, Button } from "@mantine/core";
import CartItem from "../../Components/CartItem"; // your cart item UI component
import OrderSummary from "../../Components/OrderSummary"; // your order summary UI component
import { router, usePage, Head } from "@inertiajs/react";
import { useDisclosure } from '@mantine/hooks';

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
            setModalAction("delete")
            open();
    };
    const handleConfirm = () => {
        if (modalAction === "delete") {
        if (!itemToDelete) return; 

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
    if (modalAction === "checkout") {
        setLoading(true);
        router.post(
            "/order/create",
            {
                address: `${address.street}, ${address.city}, ${
                    address.state ?? ""
                } ${address.zip ?? ""}`.trim(),
                items: selectedItems,
                payment_method: selectedPaymentMethod,
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
        setModalAction("checkout"); // Set modal action
        open();
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
            <Modal opened={opened} onClose={close} title="Confirm" centered>
            <Text>{modalMessage}</Text>
            <Group mt="md" position="right">
                <Button variant="default" onClick={close}>Cancel</Button>
                {modalAction && (
                    <Button
                        color={modalAction === "delete" ? "red" : "green"}
                        onClick={handleConfirm}
                        loading={loading && modalAction === "checkout"}
                    >
                        {modalAction === "delete" ? "Delete" : "Confirm Order"}
                    </Button>
                )}
            </Group>
            </Modal>
        </Container>
        
    );
}

export default Cart;
