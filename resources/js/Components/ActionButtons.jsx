import { Group, Button, ActionIcon } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";

const ActionButtons = ({
    handleAddToCart,
    handleBuyNow,
    canAddToCart,
    processing,
}) => (
    <Group spacing="md" mt="xl">
        <ActionIcon
            variant="outline"
            size="xl"
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            style={{
                width: "50px",
                height: "50px",
                borderColor: "#ddd",
                borderRadius: "8px",
                backgroundColor: "white",
                color: "#333",
                // Remove cursor not-allowed effect
                cursor: canAddToCart ? "pointer" : "default",
                opacity: canAddToCart ? 1 : 0.5,
            }}
        >
            <IconShoppingCart size={24} stroke={1.5} />
        </ActionIcon>

        <Button
            size="lg"
            onClick={handleBuyNow}
            loading={processing}
            disabled={!canAddToCart || processing}
            style={{
                flex: 1,
                backgroundColor: "#c4d4a3",
                color: "#333",
                borderRadius: "8px",
                height: "50px",
                fontSize: "16px",
                fontWeight: 600,
                border: "none",
                // Remove cursor not-allowed effect
                cursor: canAddToCart ? "pointer" : "default",
                opacity: canAddToCart ? 1 : 0.5,
            }}
            variant="filled"
        >
            Buy now
        </Button>
    </Group>
);

export default ActionButtons;
