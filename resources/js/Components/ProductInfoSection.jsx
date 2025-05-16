import { Stack, Text } from "@mantine/core";
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
  canAddToCart,
  processing
}) => (
  <Stack spacing="lg">
    <Text size="xl" weight={700}>{product.name}</Text>
    <Text color="dimmed">{product.description}</Text>
    <Text size="xl" weight={700} color="blue">₱{product.price}</Text>

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

    <QuantitySelector
      quantity={quantity}
      setQuantity={setQuantity}
    />

    <ActionButtons
      handleAddToCart={handleAddToCart}
      canAddToCart={canAddToCart}
      processing={processing}
    />

    <CategoryBadges categories={product.categories} />
  </Stack>
);

export default ProductInfoSection;
