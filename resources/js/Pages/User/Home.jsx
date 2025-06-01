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
import { router } from "@inertiajs/react";
import { IconHeartFilled, IconHeart } from "@tabler/icons-react"; // You used IconHeartFilled but didn't import it

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
                <Group position="apart" mb={10}>
                    <Text
                        size="xl"
                        weight={700}
                        style={{ fontSize: "28px", fontFamily: "WendyOne" }}
                    >
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
                <Text
                    size="xl"
                    weight={700}
                    mb={10}
                    style={{ fontSize: "28px", fontFamily: "WendyOne" }}
                >
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
    const [isLiked, setIsLiked] = useState(product.liked || false);
    const [likeCount, setLikeCount] = useState(product.likes_count || 0);

    // Calculate a fake "original" price for display purposes (20% higher)
    const originalPrice = Math.round(product.price * 1.2);
    const discountPercentage = Math.round(
        ((originalPrice - product.price) / originalPrice) * 100
    );

    const handleLikeToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();

        router.post(
            `/products/${product.id}/like`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLiked((prev) => !prev);
                    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
                },
                onError: (error) => {
                    console.error("Like toggle failed:", error);
                },
            }
        );
    };

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
                            justifyContent: "center",
                        }}
                        onClick={handleLikeToggle}
                    >
                        {isLiked ? (
                            <IconHeartFilled size={18} color="#ff6b6b" />
                        ) : (
                            <IconHeart size={18} color="#adb5bd" />
                        )}
                    </div>

                    <Card.Section>
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

                    <Group mt={5} spacing="xs" align="center">
                        {product.categories &&
                            product.categories.length > 0 && (
                                <Badge variant="light" color="blue" size="sm">
                                    {product.categories[0].name}
                                </Badge>
                            )}
                        <Text size="xs" color="dimmed" ml="auto">
                            {likeCount} {likeCount === 1 ? "like" : "likes"}
                        </Text>
                    </Group>
                </Card>
            </Link>
        </MantineProvider>
    );
}

export default Home;
