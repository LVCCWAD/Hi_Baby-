import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    Grid,
    Container,
    Center,
    MantineProvider,
    Select,
    Box,
    Accordion,
    Checkbox,
    Stack,
} from "@mantine/core";
import { useState, useMemo } from "react";
import { Link, router } from "@inertiajs/react";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

function Girls({ products = [] }) {
    // Filter states
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [sortBy, setSortBy] = useState("trending");

    // Filter products by gender (only boys products)
    const girlsProducts = useMemo(() => {
        return products.filter((product) => product.gender?.name === "Girls");
    }, [products]);

    // Apply filters
    const filteredProducts = useMemo(() => {
        let filtered = [...girlsProducts];

        // Filter by categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(
                (product) =>
                    product.categories &&
                    product.categories.some((category) =>
                        selectedCategories.includes(category.name)
                    )
            );
        }

        // Filter by sizes
        if (selectedSizes.length > 0) {
            filtered = filtered.filter(
                (product) =>
                    product.sizes &&
                    product.sizes.some((size) =>
                        selectedSizes.includes(size.name)
                    )
            );
        }

        // Sort products
        if (sortBy === "price-low") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            filtered.sort((a, b) => b.price - a.price);
        }
        // For trending, default order is kept

        return filtered;
    }, [girlsProducts, selectedCategories, selectedSizes, sortBy]);

    // Available categories and sizes from products
    const categories = useMemo(() => {
        const categorySet = new Set();
        girlsProducts.forEach((product) => {
            if (product.categories) {
                product.categories.forEach((category) => {
                    categorySet.add(category.name);
                });
            }
        });
        return Array.from(categorySet);
    }, [girlsProducts]);

    const sizes = useMemo(() => {
        const sizeSet = new Set();
        girlsProducts.forEach((product) => {
            if (product.sizes) {
                product.sizes.forEach((size) => {
                    sizeSet.add(size.name);
                });
            }
        });
        return Array.from(sizeSet);
    }, [girlsProducts]);

    // Handle category selection
    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    // Handle size selection
    const toggleSize = (size) => {
        setSelectedSizes((prev) =>
            prev.includes(size)
                ? prev.filter((s) => s !== size)
                : [...prev, size]
        );
    };

    return (
        <Container
            size="xl"
            style={{ backgroundColor: "#f9f6f1", padding: "20px" }}
        >
            <Group position="apart" mb={20}>
                <Text
                    size="xl"
                    weight={700}
                    style={{ fontSize: "28px", fontFamily: "WendyOne" }}
                >
                    Girl's Clothing
                </Text>
                <Select
                    placeholder="Sort By"
                    value={sortBy}
                    onChange={setSortBy}
                    data={[
                        { value: "trending", label: "Trending" },
                        { value: "price-low", label: "Price: Low to High" },
                        { value: "price-high", label: "Price: High to Low" },
                    ]}
                    style={{ width: 150 }}
                    size="xs"
                />
            </Group>

            <Grid>
                {/* Filters Sidebar */}
                <Grid.Col span={3} style={{
                    minWidth: "250px",
                    flexShrink: 0,}}
                    >
                    <Box>
                        {/* Categories Filter */}
                        <Accordion defaultValue="categories">
                            <Accordion.Item value="categories">
                                <Accordion.Control>
                                    <Text weight={600}>Categories</Text>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Stack spacing="xs">
                                        {categories.map((category) => (
                                            <Checkbox
                                                key={category}
                                                label={category}
                                                checked={selectedCategories.includes(
                                                    category
                                                )}
                                                onChange={() =>
                                                    toggleCategory(category)
                                                }
                                                styles={{
                                                    label: { fontSize: "14px" },
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                </Accordion.Panel>
                            </Accordion.Item>

                            {/* Size Filter */}
                            <Accordion.Item value="size">
                                <Accordion.Control>
                                    <Text weight={600}>Size</Text>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <Stack spacing="xs">
                                        {sizes.map((size) => (
                                            <Checkbox
                                                key={size}
                                                label={size}
                                                checked={selectedSizes.includes(
                                                    size
                                                )}
                                                onChange={() =>
                                                    toggleSize(size)
                                                }
                                                styles={{
                                                    label: { fontSize: "14px" },
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Box>
                </Grid.Col>

                {/* Products Grid */}
                <Grid.Col span={9}>
                        {filteredProducts.length > 0 ? (
                        <Box
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "20px",
                            }}
                            >
                            {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                
                            ))}
                            </Box>
                        ) : (
                            <Center style={{ height: 200 }}>
                                <Text color="dimmed" size="lg">
                                    No products found matching your filters.
                                </Text>
                            </Center>
                            
                        )}
                </Grid.Col>
            </Grid>
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
            <Link
            href={`/user/products/${product.id}`}
            style={{ textDecoration: "none" }}
        >
            <Card
                shadow="sm"
                padding="lg"
                radius="md"    
                withBorder
                style={{ position: "relative",  width: "200px", height: "300px", flexShrink: 0,}}
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

                <Card.Section style={{ height: "150px", overflow: "hidden" }}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        height="100%"
                        width="100%"
                        fit="cover"                
                        style={{ objectFit: "cover" }}

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
    );
}

export default Girls;
