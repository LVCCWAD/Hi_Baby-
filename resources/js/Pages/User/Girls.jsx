import {
    Grid,
    Container,
    Center,
    Select,
    Text,
    Group,
    Box,
    Accordion,
    Checkbox,
    Stack,
} from "@mantine/core";
import { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import ProductCard from "../../Components/ProductCard";  // <-- import reusable component

function Girls({ products = [] }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [sortBy, setSortBy] = useState("trending");

    // Filter products by gender (only girls products)
    const girlsProducts = useMemo(() => {
        return products.filter((product) => product.gender?.name === "Girls");
    }, [products]);

    const filteredProducts = useMemo(() => {
        let filtered = [...girlsProducts];

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((product) =>
                product.categories?.some((category) =>
                    selectedCategories.includes(category.name)
                )
            );
        }

        if (selectedSizes.length > 0) {
            filtered = filtered.filter((product) =>
                product.sizes?.some((size) =>
                    selectedSizes.includes(size.name)
                )
            );
        }

        if (sortBy === "price-low") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            filtered.sort((a, b) => b.price - a.price);
        }

        return filtered;
    }, [girlsProducts, selectedCategories, selectedSizes, sortBy]);

    const categories = useMemo(() => {
        const categorySet = new Set();
        girlsProducts.forEach((product) => {
            product.categories?.forEach((category) =>
                categorySet.add(category.name)
            );
        });
        return Array.from(categorySet);
    }, [girlsProducts]);

    const sizes = useMemo(() => {
        const sizeSet = new Set();
        girlsProducts.forEach((product) => {
            product.sizes?.forEach((size) => sizeSet.add(size.name));
        });
        return Array.from(sizeSet);
    }, [girlsProducts]);

    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const toggleSize = (size) => {
        setSelectedSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };

    return (
        <Container size="xl" style={{ backgroundColor: "#f9f6f1", padding: "20px" }}>
            <Head>
                <title>Girls Collection - Hi Baby!</title>
            </Head>

            <Group position="apart" mb={20}>
                <Text size="xl" weight={700} style={{ fontSize: "28px", fontFamily: "WendyOne" }}>
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
                <Grid.Col span={3} style={{ minWidth: "250px", flexShrink: 0 }}>
                    <Box>
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
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => toggleCategory(category)}
                                                styles={{ label: { fontSize: "14px" } }}
                                            />
                                        ))}
                                    </Stack>
                                </Accordion.Panel>
                            </Accordion.Item>

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
                                                checked={selectedSizes.includes(size)}
                                                onChange={() => toggleSize(size)}
                                                styles={{ label: { fontSize: "14px" } }}
                                            />
                                        ))}
                                    </Stack>
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Box>
                </Grid.Col>

                <Grid.Col span={9}>
                    {filteredProducts.length > 0 ? (
                        <Box style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
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

export default Girls;
