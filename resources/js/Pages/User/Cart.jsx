import {
    Container,
    Table,
    Text,
    Image,
    Button,
    Group,
    Paper,
    Stack,
    Divider,
    NumberInput,
TextInput
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { router } from "@inertiajs/react";

function Cart({ cart = {} }) {
    const [loading, setLoading] = useState(false);
    const [shippingAddress, setShippingAddress] = useState("");


    // Ensure cart is an array
    const cartItems = Array.isArray(cart) ? cart : Object.values(cart || {});

    // Handle deleting a cart item
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to remove this item?")) {
            router.delete(`/cart/${id}`, {
                onSuccess: () => {
                    showNotification({
                        title: "Deleted",
                        message: "Item removed from cart.",
                        color: "green",
                        icon: <IconCheck />,
                    });
                },
                onError: () => {
                    showNotification({
                        title: "Error",
                        message: "Could not delete item.",
                        color: "red",
                    });
                },
            });
        }
    };

    // Handle quantity change
    const handleQuantityChange = (id, quantity) => {
        router.post(`/user/cart/${id}/update`, { quantity });
    };

    // Calculate total price
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cartItems.length === 0) {
        return (
            <Container size="md" mt="xl">
                <Text size="xl" weight={600}>
                    Your cart is empty.
                </Text>
            </Container>
        );
    }

    const handleCheckout = () => {
        if (shippingAddress.length < 10) {
            showNotification({
                title: "Invalid Address",
                message: "Shipping address must be at least 10 characters.",
                color: "red",
            });
            return;
        }

        setLoading(true);
        router.post(
            "/checkout",
            { shipping_address: shippingAddress },
            {
                onFinish: () => setLoading(false),
                onSuccess: () => {
                    showNotification({
                        title: "Order Placed",
                        message: "Your order was placed successfully!",
                        color: "green",
                        icon: <IconCheck />,
                    });
                },
                onError: () => {
                    showNotification({
                        title: "Error",
                        message: "Failed to place order.",
                        color: "red",
                    });
                },
            }
        );
    };

    return (
        <Container size="md" mt="xl">
            <Text size="xl" weight={700} mb="lg">
                Your Shopping Cart
            </Text>

            <Paper shadow="sm" radius="md" p="md">
                <Table striped highlightOnHover>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Details</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Image
                                        src={`/storage/${item.image}`}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        fit="contain"
                                    />
                                </td>
                                <td>
                                    <Stack spacing={2}>
                                        <Text weight={600}>{item.name}</Text>
                                        <Text size="sm">
                                            Color: {item.color}
                                        </Text>
                                        <Text size="sm">Size: {item.size}</Text>
                                    </Stack>
                                </td>
                                <td>
                                    <NumberInput
                                        value={item.quantity}
                                        min={1}
                                        max={99}
                                        onChange={(value) =>
                                            handleQuantityChange(item.id, value)
                                        }
                                        styles={{ input: { width: 60 } }}
                                    />
                                </td>
                                <td>₱{item.price}</td>
                                <td>₱{item.price * item.quantity}</td>
                                <td>
                                    <Button
                                        color="red"
                                        onClick={() => handleDelete(item.id)}
                                        size="xs"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Divider my="md" />
                <TextInput
                    placeholder="Enter your shipping address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    mb="md"
                />

                <Group position="right">
                    <Text size="lg" weight={600}>
                        Total: ₱{total.toLocaleString()}
                    </Text>
                    <Button
                        color="blue"
                        onClick={handleCheckout}
                        loading={loading}
                    >
                        Checkout
                    </Button>
                </Group>
            </Paper>
        </Container>
    );
}

export default Cart;
