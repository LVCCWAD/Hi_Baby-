import { Container, Grid, Text } from "@mantine/core";
import { usePage } from "@inertiajs/react";
import ProductCard from "../../Components/ProductCard";

function Search() {
    const { products, query } = usePage().props;

    console.log("Products:", products);
    console.log("Query:", query);

    return (
        <Container
            size="xl"
            style={{ backgroundColor: "#f9f6f1", padding: "40px 20px" }}
        >
            <Text
                size="xl"
                weight={700}
                mb={30}
                color="gray.8"
                style={{ fontSize: "32px", fontFamily: "WendyOne" }}
            >
                Search results for "{query}"
            </Text>

            {products.length === 0 ? (
                <Text size="lg" color="dimmed">
                    No products found.
                </Text>
            ) : (
                <Grid gutter="lg">
                    {products.map((product) => (
                        <Grid.Col
                            key={product.id}
                            span={4}
                            style={{
                                minWidth: "300px",
                                minHeight: "200px",
                                maxWidth: "300px",
                                maxHeight: "500px",
                            }}
                        >
                            <ProductCard product={product} />
                        </Grid.Col>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default Search;
