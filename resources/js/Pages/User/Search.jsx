import { Container, Text, Grid, Center, Stack, Button } from "@mantine/core";
import { usePage, Link } from "@inertiajs/react";
import { IconSearch, IconArrowLeft } from "@tabler/icons-react";
import ProductCard from "../../Components/ProductCard";

function Search() {
    const { products, query } = usePage().props;

    const hasQuery = query && query.trim() !== "";
    const hasResults = products && products.length > 0;

    return (
        <Container
            size="xl"
            style={{
                backgroundColor: "#f9f6f1",
                padding: "40px 20px",
                minHeight: "60vh",
            }}
        >
            {hasQuery ? (
                <Text
                    size="xl"
                    weight={700}
                    mb={30}
                    color="gray.8"
                    style={{ fontSize: "32px", fontFamily: "WendyOne" }}
                >
                    Search results for "{query}"
                </Text>
            ) : (
                <Text
                    size="xl"
                    weight={700}
                    mb={30}
                    color="gray.8"
                    style={{ fontSize: "32px", fontFamily: "WendyOne" }}
                >
                    Search Products
                </Text>
            )}

            {!hasQuery ? (
                <Center style={{ minHeight: "300px" }}>
                    <Stack align="center" spacing="md">
                        <IconSearch size={64} color="#BAB86C" />
                        <Text size="lg" color="dimmed" ta="center">
                            Enter a search term to find products
                        </Text>
                        <Button
                            component={Link}
                            href="/"
                            leftSection={<IconArrowLeft size={16} />}
                            variant="outline"
                            color="#BAB86C"
                            style={{
                                borderRadius: "8px",
                                height: "45px",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Back to Home
                        </Button>
                    </Stack>
                </Center>
            ) : !hasResults ? (
                <Center style={{ minHeight: "300px" }}>
                    <Stack align="center" spacing="md">
                        <IconSearch size={64} color="#BAB86C" />
                        <Text size="lg" color="dimmed" ta="center">
                            No products found for "{query}"
                        </Text>
                        <Text size="sm" color="dimmed" ta="center">
                            Try searching with different keywords or browse our
                            collections
                        </Text>
                        <Button
                            component={Link}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                Inertia.visit("/");
                            }}
                            leftSection={<IconArrowLeft size={16} />}
                            variant="outline"
                            color="#BAB86C"
                            style={{
                                borderRadius: "8px",
                                height: "45px",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Back to Home
                        </Button>
                    </Stack>
                </Center>
            ) : (
                <>
                    <Text size="md" color="dimmed" mb={20}>
                        Found {products.length} product
                        {products.length !== 1 ? "s" : ""}
                    </Text>
                    <Grid gutter="lg">
                        {products.map((product) => (
                            <Grid.Col
                                key={product.id}
                                span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                                style={{
                                    minWidth: "280px",
                                    maxWidth: "320px",
                                }}
                            >
                                <ProductCard product={product} />
                            </Grid.Col>
                        ))}
                    </Grid>
                </>
            )}
        </Container>
    );
}

export default Search;
