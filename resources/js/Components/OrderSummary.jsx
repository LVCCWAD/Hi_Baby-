import React, { useState } from "react";
import {
    Paper,
    Text,
    Group,
    Button,
    Divider,
    Stack,
    Flex,
    Radio,
} from "@mantine/core";
import AddressSection from "./AddressSection";
import { usePage, router } from "@inertiajs/react";

function OrderSummary({ total, handleCheckout, loading, selectedItems }) {
    const { props } = usePage();
    const [addressModalOpened, setAddressModalOpened] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(
        props.address ?? null
    );
    const [paymentMethod, setPaymentMethod] = useState("cod");
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
                        if (page.props.address) {
                            setSelectedAddress(page.props.address);
                        } else {
                            setSelectedAddress(values); // fallback
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
            <Text size="xl" fw={700}>
                Delivery
            </Text>

            <AddressSection
                selectedAddress={selectedAddress}
                setAddressModalOpened={setAddressModalOpened}
                setEditingAddress={setEditingAddress}
                addressModalOpened={addressModalOpened}
                editingAddress={editingAddress}
                onAddressSubmit={handleAddressSubmit}
            />

            <Text size="md" fw={500} mt="md" mb="sm">
                Payment Method
            </Text>

            <Radio.Group
                value={paymentMethod}
                onChange={setPaymentMethod}
                spacing="sm"
            >
                <Stack spacing="xs">
                    <Radio value="cod" label="Cash on Delivery" />
                    {/* If you want to add more methods in the future, add here */}
                </Stack>
            </Radio.Group>

            <Divider my="sm" />

            <Flex
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                align={{ base: "flex-start", sm: "center" }}
                mb="xs"
                gap="xs"
            ></Flex>
            <Stack spacing="md" sx={{ maxHeight: 300, overflowY: "auto" }}>
                {/* Selected Items */}
                <Text size="xl" fw={700}>
                    Items
                </Text>
                {selectedItems.length === 0 && (
                    <Text color="dimmed" size="sm">
                        No items selected.
                    </Text>
                )}
                {selectedItems.map((item) => (
                    <Group
                        key={item.id}
                        noWrap
                        position="apart"
                        spacing="xs"
                        sx={(theme) => ({
                            padding: theme.spacing.xs,
                            borderRadius: theme.radius.sm,
                            backgroundColor:
                                theme.colorScheme === "dark"
                                    ? theme.colors.dark[7]
                                    : theme.colors.gray[0],
                            width: "100%",
                        })}
                    >
                        <Stack
                            spacing={0}
                            sx={{ maxWidth: "calc(100% - 110px)" }}
                        >
                            <Text size="sm" weight={600} truncate>
                                {item.name}
                            </Text>
                            <Text size="xs" color="dimmed">
                                Qty: {item.quantity}
                            </Text>
                        </Stack>
                        <Text
                            weight={600}
                            size="sm"
                            sx={{
                                width: 100,
                                textAlign: "right",
                                whiteSpace: "nowrap",
                            }}
                        >
                            ₱{(item.price * item.quantity).toLocaleString()}
                        </Text>
                    </Group>
                ))}
            </Stack>

            <Divider my="sm" />

            {/* Subtotal */}
            <Text size="xl" fw={700} mb="md">
                Summary
            </Text>
            <Group position="apart" mb="xs">
                <Text size="sm">Subtotal</Text>
                <Text weight={600}>₱{total.toLocaleString()}</Text>
            </Group>

            {/* Delivery Fee */}
            <Group position="apart" mb="sm">
                <Text size="sm">Delivery Fee</Text>
                <Text weight={600}>₱48</Text>
            </Group>

            <Divider my="sm" />

            {/* Total */}
            <Group position="apart" mb="md">
                <Text size="lg" weight={700}>
                    Total
                </Text>
                <Text size="xl" weight={700} color="blue">
                    ₱{(total + 48).toLocaleString()}
                </Text>
            </Group>

            {/* Checkout Button */}
            <Button
                style={{
                    color: "black",
                    backgroundColor:
                        selectedItems.length === 0 || !selectedAddress
                            ? "#E0E0E0"
                            : "#BAB86C",
                    cursor:
                        selectedItems.length === 0 || !selectedAddress
                            ? "default"
                            : "pointer",
                    opacity:
                        selectedItems.length === 0 || !selectedAddress
                            ? 0.6
                            : 1,
                    transition: "background-color 0.3s ease, opacity 0.3s ease",
                }}
                size="lg"
                fullWidth
                onClick={() => {
                    if (selectedItems.length === 0 || !selectedAddress) return;
                    handleCheckout(paymentMethod);
                }}
                loading={loading}
            >
                Checkout
            </Button>
        </Paper>
    );
}

export default OrderSummary;
