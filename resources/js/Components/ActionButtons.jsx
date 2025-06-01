import { Group, Button } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";

const ActionButtons = ({
    handleAddToCart,
    handleBuyNow,
    canAddToCart,
    processing,
}) => (
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
            <IconShoppingCart
                size={16}
                stroke={1.5}
                style={{ marginRight: 8 }}
            />
            Add to Cart
        </Button>

        <Button
            bg="#BAB86C"
            size="lg"
            style={{
                flex: 1,
                color: "black",
                borderRadius: 10,
                width: 150,
                height: 50,
            }}
            onClick={handleBuyNow}
            loading={processing}
        >
            Buy Now
        </Button>
    </Group>
);

export default ActionButtons;
