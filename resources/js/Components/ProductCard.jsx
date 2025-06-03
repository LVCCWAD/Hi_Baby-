import { Card, Image, Text } from "@mantine/core";
import { router } from "@inertiajs/react";

export default function ProductCard({ product }) {
  const handleClick = () => {
    router.visit(`/user/products/${product.id}`);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <Card.Section>
        <Image src={product.image} height={160} alt={product.name} />
      </Card.Section>

      <Text weight={500} size="lg" mt="md" color="dark">
        {product.name}
      </Text>
      <Text size="sm" color="dimmed">
        {product.description}
      </Text>
      <Text weight={700} size="md" mt="sm">
        ${product.price.toFixed(2)}
      </Text>
    </Card>
  );
}



