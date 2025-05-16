import { Paper, Image, Group } from "@mantine/core";

const ProductImageSection = ({ product }) => (
  <Paper shadow="sm" radius="md" p="md">
    <Image
      src={`/storage/${product.image}`}
      height={400}
      alt={product.name}
      fit="cover"
    />
    <Group mt="md" position="center">
      <Image
        src={`/storage/${product.image}`}
        height={80}
        width={80}
        radius="md"
        alt={product.name}
      />
    </Group>
  </Paper>
);

export default ProductImageSection;
