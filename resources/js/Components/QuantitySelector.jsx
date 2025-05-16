import { Group, Text, ActionIcon } from "@mantine/core";

const QuantitySelector = ({ quantity, setQuantity }) => (
  <Group>
    <Text weight={500}>Quantity</Text>
    <Group spacing={5}>
      <ActionIcon variant="light" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>
        -
      </ActionIcon>
      <Text w={40} ta="center">{quantity}</Text>
      <ActionIcon variant="light" onClick={() => setQuantity(prev => prev + 1)}>
        +
      </ActionIcon>
    </Group>
  </Group>
);

export default QuantitySelector;
