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
    Accordion,
    Checkbox,
    Stack,
    ActionIcon,
} from "@mantine/core";
import { useState, useEffect, useMemo } from "react";
import { Link } from "@inertiajs/react";
import { IconHeart } from "@tabler/icons-react";
import CategoryBadges from "../../Components/CategoryBadges";

function Boys({ products = [] }) {
    console.log("Boys Products from Laravel:", products);

    // Filter states
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [sortBy, setSortBy] = useState("trending");

    // Filter products by gender (only boys products)
    const boysProducts = useMemo(() => {
        return products.filter((product) => product.gender?.name === "Boys");
    }, [products]);

    // Apply filters
    const filteredProducts = useMemo(() => {
        let filtered = [...boysProducts];

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
        // For trending, we'll keep the default order

        return filtered;
    }, [boysProducts, selectedCategories, selectedSizes, sortBy]);

    // Available categories and sizes from products
    const categories = useMemo(() => {
        const categorySet = new Set();
        boysProducts.forEach((product) => {
            if (product.categories) {
                product.categories.forEach((category) => {
                    categorySet.add(category.name);
                });
            }
        });
        return Array.from(categorySet);
    }, [boysProducts]);

    const sizes = useMemo(() => {
        const sizeSet = new Set();
        boysProducts.forEach((product) => {
            if (product.sizes) {
                product.sizes.forEach((size) => {
                    sizeSet.add(size.name);
                });
            }
        });
        return Array.from(sizeSet);
    }, [boysProducts]);

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
                    Boy's Clothing
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
                <Grid.Col span={3}>
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
                    <Grid>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Grid.Col key={product.id} span={4} mb={20}>
                                    <ProductCard product={product} />
                                </Grid.Col>
                            ))
                        ) : (
                            <Grid.Col span={12}>
                                <Center style={{ height: 200 }}>
                                    <Text color="dimmed" size="lg">
                                        No products found matching your filters.
                                    </Text>
                                </Center>
                            </Grid.Col>
                        )}
                    </Grid>
                </Grid.Col>
            </Grid>
        </Container>
    );
}

function ProductCard({ product }) {
    const [isFavorite, setIsFavorite] = useState(false);

    // Calculate a fake "original" price for display purposes (20% higher)
    const originalPrice = Math.round(product.price * 1.2);
    const discountPercentage = Math.round(
        ((originalPrice - product.price) / originalPrice) * 100
    );

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
                                fill: isFavorite ? "#ff6b6b" : "transparent",
                            }}
                        />
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

                    {product.categories && product.categories.length > 0 && (
                        <Group mt={5}>
                            {product.categories.slice(0, 1).map((cat) => (
                                <Badge
                                    key={cat.id}
                                    variant="light"
                                    color="blue"
                                    size="sm"
                                >
                                    {cat.name}
                                </Badge>
                            ))}
                        </Group>
                    )}
                </Card>
            </Link>
        </MantineProvider>
    );
}

export default Boys;
