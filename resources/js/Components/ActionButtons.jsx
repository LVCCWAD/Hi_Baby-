import { Group, Button } from "@mantine/core";

const ActionButtons = ({ handleAddToCart, canAddToCart, processing }) => (
  <Group mt="xl">
    <Button
      variant="light"
      color="blue"
      size="lg"
      style={{ flex: 1 }}
      onClick={handleAddToCart}
      disabled={!canAddToCart}
      loading={processing}
    >
      Add to Cart
    </Button>
    <Button color="blue" size="lg" style={{ flex: 1 }}>
      Buy now
    </Button>
  </Group>
);

export default ActionButtons;
