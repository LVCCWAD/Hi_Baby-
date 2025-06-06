import React from "react";
import {
  Card,
  Group,
  Image,
  Text,
  Stack,
  ActionIcon,
  NumberInput,
} from "@mantine/core";
import { IconTrash, IconPlus, IconMinus } from "@tabler/icons-react";

function CheckoutItem({ item, handleDelete, handleQuantityChange }) {
  return (
    <Card p="md" radius="md" withBorder>
      <Group position="apart" align="flex-start">
        <Group>
          <Image
            src={item.image.startsWith("http") ? item.image : `/storage/${item.image}`}
            alt={item.name}
            width={120}
            height={120}
            fit="cover"
            radius="md"
          />

          <Stack spacing={5}>
            <Text weight={600} size="lg">{item.name}</Text>
            <Text size="sm" color="dimmed">Color: {item.color}</Text>
            <Text size="sm" color="dimmed">Size: {item.size}</Text>
            <Text weight={700} color="blue" size="lg">₱{item.price}</Text>
          </Stack>
        </Group>

        <Stack align="flex-end" spacing="md">
          <ActionIcon color="red" onClick={() => handleDelete(item.id)} variant="subtle">
            <IconTrash size={20} />
          </ActionIcon>
          <Group spacing={5}>
            <ActionIcon
              size="sm"
              variant="subtle"
              onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
            >
              <IconMinus size={16} />
            </ActionIcon>
            <NumberInput
              value={item.quantity}
              min={1}
              max={99}
              onChange={(value) => {
                const qty = Number(value);
                if (!isNaN(qty)) handleQuantityChange(item.id, qty);
              }}
              hideControls
              styles={{ input: { width: 60, textAlign: "center" } }}
            />
            <ActionIcon
              size="sm"
              variant="subtle"
              onClick={() => handleQuantityChange(item.id, Math.min(99, item.quantity + 1))}
            >
              <IconPlus size={16} />
            </ActionIcon>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
}

export default CheckoutItem;
