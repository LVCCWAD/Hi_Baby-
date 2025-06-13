import {
    Card,
    Image,
    Text,
    Button,
    Group,
    Badge,
    Grid,
    Container,
    Center,
    MantineProvider,
    Select,
    Box,
    Flex,
} from "@mantine/core";
import { useState, useMemo } from "react";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import ProductCard from "../../Components/ProductCard";

function Home({ products = [] }) {
    console.log("Products from Laravel:", products);

    // Filter products by gender
    const girlsProducts = useMemo(() => {
        return products
            .filter((product) => product.gender?.name === "Girls")
            .slice(0, 3);
    }, [products]);

    const boysProducts = useMemo(() => {
        return products
            .filter((product) => product.gender?.name === "Boys")
            .slice(0, 3);
    }, [products]);

    return (
        <Container
            size="xl"
            style={{ backgroundColor: "#f9f6f1", padding: "20px" }}
        >
            {/* Girls Section */}
            <Box mb={40}>
                <Flex justify="space-between" align="center" mb={10}>
                    <Text
                        size="xl"
                        weight={700}
                        color="gray.8"
                        style={{ fontSize: "58px", fontFamily: "WendyOne" }}
                    >
                        Girl's Clothing
                    </Text>

                    <Button
                        component="a"
                        href="/girls-products"
                        variant="filled"
                        color="gray"
                        radius="xl"
                        size="md"
                        style={{ backgroundColor: "#BAB86C" }}
                    >
                        View More
                    </Button>
                </Flex>

                <Grid>
                    {girlsProducts.map((product) => (
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
            </Box>

            {/* Boys Section */}
            <Box>
                <Flex justify="space-between" align="center" mb={10}>
                    <Text
                        size="xl"
                        weight={700}
                        color="gray.8"
                        style={{ fontSize: "58px", fontFamily: "WendyOne" }}
                    >
                        Boy's Clothing
                    </Text>

                    <Button
                        component="a"
                        href="/boys-products"
                        variant="filled"
                        color="gray"
                        radius="xl"
                        size="md"
                        style={{ backgroundColor: "#BAB86C" }}
                    >
                        View More
                    </Button>
                </Flex>

                <Grid>
                    {boysProducts.map((product) => (
                        <Grid.Col
                            key={product.id}
                            span={4}
                            style={{
                                maxWidth: "300px",
                                maxHeight: "200px",
                                minWidth: "300px",
                                minHeight: "400px",
                            }}
                        >
                            <ProductCard product={product} />
                        </Grid.Col>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default Home;
