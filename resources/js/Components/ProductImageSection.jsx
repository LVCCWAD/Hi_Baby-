import { Paper, Image, Group } from "@mantine/core";

const ProductImageSection = ({ product }) => (
    <Paper shadow="sm" radius="md" p="md">
        <Image
            src={product.image}
            alt={product.name}
            height={300}
            fit="cover"
        />
        <Group mt="md" position="center">
            <Image
                src={product.image}
                alt={product.name}
                height={200}
                width={200}
                style={{
                    maxWidth: "300px",
                    maxHeight: "200px",
                }}
            />
        </Group>
    </Paper>
);

export default ProductImageSection;
