import React from "react";
import { Container, Text, Paper, Button } from "@mantine/core";
import { Head, router } from "@inertiajs/react";

function OrderSuccess({ order }) {
  // order should come from server props, including items and totals

  const total = order?.items?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container size="xl" mt="xl">
      <Head>
        <title>Order Successful - Hi Baby!</title>
        <meta name="description" content="Your order was placed successfully." />
      </Head>

      <Paper shadow="sm" radius="md" p="md" mb="xl">
        <Text size="xl" fw={700} mb="md" align="center" color="green">
          🎉 Your order was placed successfully!
        </Text>
        <Text mb="md" align="center">
          Thank you for shopping with us. Your order number is <b>{order.id}</b>.
        </Text>
      </Paper>

      <Paper shadow="sm" radius="md" p="md" mb="xl">
        <Text size="lg" fw={600} mb="sm">
          Order Summary
        </Text>

        {order.items?.map((item) => (
          <Paper
            key={item.id}
            shadow="xs"
            radius="sm"
            p="sm"
            mb="xs"
            withBorder
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Text>{item.name} (x{item.quantity})</Text>
            <Text>${(item.price * item.quantity).toFixed(2)}</Text>
          </Paper>
        ))}

        <Text size="lg" fw={700} align="right" mt="md">
          Total: ${total?.toFixed(2)}
        </Text>
      </Paper>

      <Button
        fullWidth
        size="md"
        onClick={() => router.visit("/home")}
      >
        Continue Shopping
      </Button>
    </Container>
  );
}

export default OrderSuccess;
