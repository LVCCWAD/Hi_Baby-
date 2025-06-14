import { Stack, Text, Box } from "@mantine/core";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import ActionButtons from "./ActionButtons";
import CategoryBadges from "./CategoryBadges";

const ProductInfoSection = ({
    product,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    handleAddToCart,
    handleBuyNow,
    canAddToCart,
    processing,
}) => (
    <Box p="xl" style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
        <Stack spacing="xl">
            <Box>
                <Text size="xl" weight={700} color="#333" mb="sm">
                    {product.name}
                </Text>
                <Text color="#666" size="md" mb="lg" style={{ lineHeight: 1.6 }}>
                    {product.description}
                </Text>
                <Text size="xl" weight={700} color="#c4a853" mb="xl">
                    ₱{product.price}
                </Text>
            </Box>

            <ColorSelector
                colors={product.colors}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
            />

            <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
            />

            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

            <ActionButtons
                handleAddToCart={handleAddToCart}
                handleBuyNow={handleBuyNow}
                canAddToCart={canAddToCart}
                processing={processing}
            />
            {/* <CategoryBadges categories={product.categories} /> */}
        </Stack>
    </Box>
);

export default ProductInfoSection;
