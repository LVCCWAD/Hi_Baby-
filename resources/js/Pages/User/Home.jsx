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
} from "@mantine/core";
import { useState, useMemo } from "react";
import { Link } from "@inertiajs/react";
import { IconHeart } from "@tabler/icons-react";

function Home({ products = [] }) {
    console.log("Products from Laravel:", products);

    // Filter products by gender
    const girlsProducts = useMemo(() => {
        return products.filter(product => product.gender?.name === "Girls").slice(0, 3);
    }, [products]);

    const boysProducts = useMemo(() => {
        return products.filter(product => product.gender?.name === "Boys").slice(0, 3);
    }, [products]);

    return (
        <Container size="xl" style={{ backgroundColor: "#f9f6f1", padding: "20px" }}>
            {/* Girls Section */}
            <Box mb={40}>
                <Group position="apart" mb={10}>
                    <Text size="xl" weight={700} style={{ fontSize: "28px" }}>
                        Girl's Clothing
                    </Text>
                    <Select
                        placeholder="Trending"
                        data={[{ value: "trending", label: "Trending" }]}
                        style={{ width: 120 }}
                        size="xs"
                    />
                </Group>

                <Grid>
                    {girlsProducts.map((product) => (
                        <Grid.Col key={product.id} span={4}>
                            <ProductCard product={product} />
                        </Grid.Col>
                    ))}
                </Grid>

                <Center mt={20}>
                    <Button
                        component="a"
                        href="/girls-products"
                        variant="filled"
                        color="gray"
                        radius="xl"
                        style={{ backgroundColor: "#c5c9a4" }}
                    >
                        View More
                    </Button>
                </Center>
            </Box>

            {/* Boys Section */}
            <Box>
                <Text size="xl" weight={700} mb={10} style={{ fontSize: "28px" }}>
                    Boy's Clothing
                </Text>

                <Grid>
                    {boysProducts.map((product) => (
                        <Grid.Col key={product.id} span={4}>
                            <ProductCard product={product} />
                        </Grid.Col>
                    ))}
                </Grid>

                <Center mt={20}>
                    <Button
                        component="a"
                        href="/boys-products"
                        variant="filled"
                        color="gray"
                        radius="xl"
                        style={{ backgroundColor: "#c5c9a4" }}
                    >
                        View More
                    </Button>
                </Center>
            </Box>
        </Container>
    );
}

function ProductCard({ product }) {
    const [isFavorite, setIsFavorite] = useState(false);

    // Calculate a fake "original" price for display purposes (20% higher)
    const originalPrice = Math.round(product.price * 1.2);
    const discountPercentage = Math.round(((originalPrice - product.price) / originalPrice) * 100);

    return (
        <MantineProvider>
            <Link
                href={`/user/products/${product.id}`}
                style={{ textDecoration: "none" }}
            >
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{ position: "relative" }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            zIndex: 2,
                            cursor: "pointer",
                            background: "white",
                            borderRadius: "50%",
                            width: "30px",
                            height: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsFavorite(!isFavorite);
                        }}
                    >
                        <IconHeart
                            size={18}
                            style={{
                                color: isFavorite ? "#ff6b6b" : "#adb5bd",
                                fill: isFavorite ? "#ff6b6b" : "transparent"
                            }}
                        />
                    </div>

                    <Card.Section>
                        <Image
                            src={`/storage/${product.image}`}
                            height={200}
                            alt={product.name}
                            fit="cover"
                        />
                    </Card.Section>

                    <Text weight={600} mt="md" lineClamp={1}>
                        {product.name}
                    </Text>

                    <Group spacing={5} mt={5}>
                        <Text weight={700} color="#6b8e23" size="md">
                            ₱{product.price}
                        </Text>
                        <Text
                            size="sm"
                            color="gray"
                            style={{ textDecoration: "line-through" }}
                        >
                            ₱{originalPrice}
                        </Text>
                        <Text size="xs" color="red">
                            -{discountPercentage}%
                        </Text>
                    </Group>
                </Card>
            </Link>
        </MantineProvider>
    );
}


export default Home;
