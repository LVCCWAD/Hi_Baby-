import React from "react";
import {
  Card,
  Title,
  Divider,
  Group,
  Tabs,
  Text,
  Stack,
  Paper,
  Grid,
  Box,
  Image,
  Button,
} from "@mantine/core";
import {
  IconShoppingCart,
  IconPackage,
  IconCheck,
  IconCalendar,
  IconId,
} from "@tabler/icons-react";

function PurchasesSection({
  orderFilter,
  setOrderFilter,
  filteredOrders,
  ordersCount,
}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} mb="md">
        My Purchases
      </Title>
      <Divider mb="lg" />

      <Group position="apart" mb="md">
        <Tabs value={orderFilter} onTabChange={setOrderFilter}>
          <Tabs.List>
            <Tabs.Tab
              value="all"
              icon={<IconShoppingCart size={16} />}
              style={{
                backgroundColor: orderFilter === "all" ? "#B9BD7E" : "transparent",
                color: orderFilter === "all" ? "white" : "inherit",
                borderRadius: 0,
              }}
            >
              All ({ordersCount})
            </Tabs.Tab>
            <Tabs.Tab
              value="to_ship"
              icon={<IconPackage size={16} />}
              style={{
                backgroundColor: orderFilter === "to_ship" ? "#B9BD7E" : "transparent",
                color: orderFilter === "to_ship" ? "white" : "inherit",
                borderRadius: 0,
              }}
            >
              To Ship
            </Tabs.Tab>
            <Tabs.Tab
              value="delivered"
              icon={<IconCheck size={16} />}
              style={{
                backgroundColor: orderFilter === "delivered" ? "#B9BD7E" : "transparent",
                color: orderFilter === "delivered" ? "white" : "inherit",
                borderRadius: 0,
              }}
            >
              Delivered
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Group>

      {filteredOrders.length === 0 ? (
        <Text align="center" color="dimmed" py="xl">
          No orders found
        </Text>
      ) : (
        <Stack spacing="lg">
          {filteredOrders.map((order) => (
            <Paper key={order.id} shadow="xs" p="md" withBorder>
              <Grid>
                <Grid.Col span={12}>
                  <Group position="apart" mb="md">
                    <Group>
                      <IconCalendar size={16} />
                      <Text size="sm">Ordered on: {order.date}</Text>
                    </Group>
                    <Group>
                      <Text weight={500}>Total:</Text>
                      <Text weight={700}>₱{order.total}</Text>
                    </Group>
                    <Group>
                      <IconId size={16} />
                      <Text size="sm">Order #: {order.id}</Text>
                    </Group>
                  </Group>
                </Grid.Col>

                {order.items.map((item) => (
                  <Grid.Col key={item.id} span={12}>
                    <Group position="apart">
                      <Group>
                        <Box style={{ width: 80, height: 80, overflow: "hidden" }}>
                          <Image
                            src={item.image}
                            width={80}
                            height={80}
                            fit="contain"
                            withPlaceholder
                          />
                        </Box>
                        <div>
                          <Text weight={500}>{item.product_name}</Text>
                        </div>
                      </Group>
                      <Group>
                        <Text weight={700}>₱{item.price}</Text>
                        <Button
                          variant="light"
                          color="green"
                          radius="xl"
                          compact
                          leftIcon={<IconCheck size={16} />}
                        >
                          {item.status === "delivered" ? "Delivered" : item.status}
                        </Button>
                      </Group>
                    </Group>
                    <Divider my="sm" />
                  </Grid.Col>
                ))}
              </Grid>
            </Paper>
          ))}
        </Stack>
      )}
    </Card>
  );
}

export default PurchasesSection;
