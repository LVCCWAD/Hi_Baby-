import React, { useEffect, useState } from "react";
import { Container, Text, Grid, Paper, Checkbox, Group } from "@mantine/core";
import CartItem from "../../Components/CartItem";
// import AddressSection from "../../Components/AddressSection";
import OrderSummary from "../../Components/OrderSummary";
import AuthHeader from "../../Components/AuthHeader";
import { usePage } from "@inertiajs/react";

function Cart({ cart = {}, selectedAddress: initialAddress }) {
    const [loading, setLoading] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    // const [addressModalOpened, setAddressModalOpened] = useState(false);
    // const [editingAddress, setEditingAddress] = useState(null);
    // const { props } = usePage();

    // const [selectedAddress, setSelectedAddress] = useState(
    //     initialAddress ?? null
    // );

    // useEffect(() => {
    //     if (props.selectedAddress) {
    //         setSelectedAddress(props.selectedAddress);
    //     }
    // }, [props.selectedAddress]);

    const cartItems = Array.isArray(cart) ? cart : Object.values(cart || {});

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
        if (!selectedAddress) {
            // Handle address error notification
            return;
        }

        setLoading(true);
        // Handle checkout logic here
    };

    return (
        <Container size="xl" mt="xl">
            <AuthHeader />

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
                                    handleDelete={() => {}}
                                    handleQuantityChange={() => {}}
                                />
                            ))}
                        </div>
                    </Paper>
                </Grid.Col>

                <Grid.Col span={4}>
                    {/* <AddressSection
                        selectedAddress={selectedAddress}
                        setAddressModalOpened={setAddressModalOpened}
                        setEditingAddress={setEditingAddress}
                        addressModalOpened={addressModalOpened}
                    /> */}
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
