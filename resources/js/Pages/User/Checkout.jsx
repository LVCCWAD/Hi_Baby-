import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Container, Text, Paper, Stack, Group } from "@mantine/core";
import { router } from "@inertiajs/react";

function Checkout({ cart }) {
    const [loading, setLoading] = useState(false);
    const cartItems = Object.values(cart || {});
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const form = useForm({
        initialValues: {
            shipping_address: "",
        },
        validate: {
            shipping_address: (value) => value.length < 10 ? "Shipping address must be at least 10 characters long" : null,
        },
    });

    const handleSubmit = (values) => {
        setLoading(true);
        router.post("/checkout", values, {
            onSuccess: () => {
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
            },
        });
    };

    if (cartItems.length === 0) {
        return (
            <Container size="md" mt="xl">
                <Text size="xl" weight={600}>
                    Your cart is empty.
                </Text>
            </Container>
        );
    }

    return (
        <Container size="md" mt="xl">
            <Text size="xl" weight={700} mb="lg">
                Checkout
            </Text>

            <Paper shadow="sm" radius="md" p="md">
                <Stack spacing="md">
                    {cartItems.map((item) => (
                        <Group key={item.id} position="apart">
                            <div>
                                <Text weight={500}>{item.name}</Text>
                                <Text size="sm" color="dimmed">
                                    Color ID: {item.color}, Size ID: {item.size}
                                </Text>
                                <Text size="sm">
                                    Quantity: {item.quantity} x ₱{item.price}
                                </Text>
                            </div>
                            <Text weight={700}>₱{item.price * item.quantity}</Text>
                        </Group>
                    ))}

                    <Group position="apart" mt="md">
                        <Text weight={700}>Total:</Text>
                        <Text weight={700} size="lg" color="blue">
                            ₱{total}
                        </Text>
                    </Group>

                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <TextInput
                            required
                            label="Shipping Address"
                            placeholder="Enter your complete shipping address"
                            description="Please provide a detailed shipping address for delivery"
                            withAsterisk
                            {...form.getInputProps("shipping_address")}
                        />

                        <Button
                            type="submit"
                            loading={loading}
                            fullWidth
                            mt="xl"
                        >
                            Place Order
                        </Button>
                    </form>
                </Stack>
            </Paper>
        </Container>
    );
}

export default Checkout;