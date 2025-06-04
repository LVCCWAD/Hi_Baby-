import { Container, Grid, Text } from "@mantine/core";
import { usePage } from "@inertiajs/react";
import ProductCard from "../../Components/ProductCard"; // Make sure this path is correct

export default function Search() {
    const { products, query } = usePage().props;

    console.log("Products:", products);
    console.log("Query:", query);

    return (
        <Container
            size="xl"
            style={{ backgroundColor: "#f9f6f1", padding: "20px" }}
        >
            <Text size="xl" weight={700} mb={20}>
                Search results for "{query}"
            </Text>

            {products.length === 0 ? (
                <Text>No products found.</Text>
            ) : (
                <Grid>
                    {products.map((product) => (
                        <Grid.Col key={product.id} span={4}>
                            <ProductCard product={product} />
                        </Grid.Col>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
