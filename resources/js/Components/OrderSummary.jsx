import React, { useEffect, useState } from "react";
import { Paper, Text, Group, Button, Divider, Stack } from "@mantine/core";
import AddressSection from "./AddressSection";
import { usePage, router } from "@inertiajs/react";

function OrderSummary({
    total,
    handleCheckout,
    loading,
    selectedItems,
    selectedAddress: initialAddress,
}) {
    const { props } = usePage();
    const [addressModalOpened, setAddressModalOpened] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(
        initialAddress ?? null
    );

    useEffect(() => {
        if (props.selectedAddress) {
            setSelectedAddress(props.selectedAddress);
        }
    }, [props.selectedAddress]);

   const handleAddressSubmit = async (values) => {
    try {
        if (editingAddress) {
            await router.put(`/addresses/${editingAddress.id}`, values, {
                onSuccess: () => {
                    setSelectedAddress({ ...editingAddress, ...values });
                },
            });
        } else {
            await router.post("/addresses", values, {
                onSuccess: (page) => {
                    // Fallback: try to grab latest address from props if available
                    if (page.props.selectedAddress) {
                        setSelectedAddress(page.props.selectedAddress);
                    } else {
                        setSelectedAddress(values); // fallback if backend does not return address
                    }
                },
            });
        }

        setAddressModalOpened(false);
        setEditingAddress(null);

        return true;
    } catch (error) {
        console.error("Submission error:", error);
        return false;
    }
};


    return (
        <Paper
            shadow="sm"
            radius="md"
            p="md"
            style={{ position: "sticky", top: 20 }}
        >
            <Text size="xl" weight={600} mb="md">
                Order Summary
            </Text>

            <Stack spacing="md">
                <Group position="apart">
                    <Text>Subtotal</Text>
                    <Text weight={500}>₱{total.toLocaleString()}</Text>
                </Group>

                <Group position="apart">
                    <AddressSection
                        selectedAddress={selectedAddress}
                        setAddressModalOpened={setAddressModalOpened}
                        setEditingAddress={setEditingAddress}
                        addressModalOpened={addressModalOpened}
                        editingAddress={editingAddress}
                        onAddressSubmit={handleAddressSubmit} // function to handle submit logic
                    />

                    <Text>Delivery Fee</Text>
                    <Text weight={500}>₱990</Text>
                </Group>

                <Divider my="sm" />

                <Group position="apart">
                    <Text size="lg" weight={700}>
                        Total
                    </Text>
                    <Text size="xl" weight={700} color="blue">
                        ₱{(total + 990).toLocaleString()}
                    </Text>
                </Group>

                <Button
                    color="blue"
                    size="lg"
                    fullWidth
                    onClick={handleCheckout}
                    loading={loading}
                    disabled={selectedItems.length === 0}
                >
                    Proceed to Checkout
                </Button>
            </Stack>
        </Paper>
    );
}

export default OrderSummary;
