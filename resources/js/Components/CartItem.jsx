import React from "react";
import {
    Card,
    Group,
    Image,
    Text,
    Stack,
    Checkbox,
    ActionIcon,
    Box,
    NumberInput,
    Flex,
} from "@mantine/core";
import { IconTrash, IconPlus, IconMinus } from "@tabler/icons-react";

function CartItem({
    item,
    selectedItems,
    handleSelectItem,
    handleDelete,
    handleQuantityChange,
}) {
    return (
        <Card p="md" radius="md" withBorder>
            <Flex gap="md" align="flex-start">
                <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    style={{ marginTop: "10px" }}
                />
                <Box
                    style={{
                        width: "120px",
                        height: "120px",
                        overflow: "hidden",
                    }}
                >
                    <Image
                        src={
                            item.image.startsWith("http")
                                ? item.image
                                : `/storage/${item.image}`
                        }
                        alt={item.name}
                        width="100%"
                        height="100%"
                        fit="cover"
                        radius="md"
                    />
                </Box>

                <Flex
                    direction="column"
                    justify="space-between"
                    style={{ flex: 1 }}
                >
                    <Flex justify="space-between" align="center">
                        <Text fw={600} size="lg">
                            {item.name}
                        </Text>
                        <Text fw={700} color="blue" size="lg">
                            ₱{item.price}
                        </Text>
                    </Flex>

                    <Flex gap="md" mb={8}>
                        <Text size="sm" c="dimmed">
                            Color: {item.color}
                        </Text>
                        <Text size="sm" c="dimmed">
                            Size: {item.size}
                        </Text>
                    </Flex>

                    <Flex justify="space-between" align="center">
                        <Group spacing={5}>
                            <ActionIcon
                                size="sm"
                                variant="subtle"
                                onClick={() =>
                                    handleQuantityChange(
                                        item.id,
                                        Math.max(1, item.quantity - 1)
                                    )
                                }
                            >
                                <IconMinus size={16} />
                            </ActionIcon>

                            <NumberInput
                                value={item.quantity}
                                min={1}
                                max={99}
                                onChange={(value) => {
                                    const qty = Number(value);
                                    if (!isNaN(qty)) {
                                        handleQuantityChange(item.id, qty);
                                    }
                                }}
                                hideControls
                                styles={{
                                    input: { width: 50, textAlign: "center" },
                                }}
                            />

                            <ActionIcon
                                size="sm"
                                variant="subtle"
                                onClick={() =>
                                    handleQuantityChange(
                                        item.id,
                                        Math.min(99, item.quantity + 1)
                                    )
                                }
                            >
                                <IconPlus size={16} />
                            </ActionIcon>
                        </Group>

                        <ActionIcon
                            color="red"
                            onClick={() => handleDelete(item.id)}
                            variant="subtle"
                        >
                            <IconTrash size={20} />
                        </ActionIcon>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}

export default CartItem;
