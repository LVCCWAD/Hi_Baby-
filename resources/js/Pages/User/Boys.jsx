import {
    Grid,
    Container,
    Center,
    Text,
    Group,
    Box,
    Accordion,
    Checkbox,
    Stack,
} from "@mantine/core";
import { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import ProductCard from "../../Components/ProductCard";

function Boys({ products = [] }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const normalize = (value) => value?.trim().toLowerCase();

    // Hardcoded categories and sizes for Boys
    const categoryList = [
        "Polo & Suit",
        "Pajamas",
        "Shirts",
        "Pants & Jeans",
        "Shorts",
    ];

    const sizeList = ["XS", "S", "M", "L", "XL"];

    const boysProducts = useMemo(() => {
        return products.filter((product) => product.gender?.name === "Boys");
    }, [products]);

    const filteredProducts = useMemo(() => {
        let filtered = [...boysProducts];

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((product) =>
                product.categories?.some((category) =>
                    selectedCategories.includes(normalize(category.name))
                )
            );
        }

        if (selectedSizes.length > 0) {
            filtered = filtered.filter((product) =>
                product.sizes?.some((size) =>
                    selectedSizes.includes(normalize(size.name))
                )
            );
        }

        return filtered;
    }, [boysProducts, selectedCategories, selectedSizes]);

    const toggleCategory = (category) => {
        const normalized = normalize(category);
        setSelectedCategories((prev) =>
            prev.includes(normalized)
                ? prev.filter((c) => c !== normalized)
                : [...prev, normalized]
        );
    };

    const toggleSize = (size) => {
        const normalized = normalize(size);
        setSelectedSizes((prev) =>
            prev.includes(normalized)
                ? prev.filter((s) => s !== normalized)
                : [...prev, normalized]
        );
    };

    return (
        <Container size="xl" style={{ backgroundColor: "#f9f6f1", padding: "20px" }}>
            <Head>
                <title>Boys Collection - Hi Baby!</title>
            </Head>

            <Group position="apart" mb={20}>
                <Text size="xl" weight={700} style={{ fontSize: "28px", fontFamily: "WendyOne" }}>
                    Boy's Clothing
                </Text>
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
                                        {categoryList.map((category) => (
                                            <Checkbox
                                                key={category}
                                                label={category}
                                                checked={selectedCategories.includes(normalize(category))}
                                                onChange={() => toggleCategory(category)}
                                                styles={(theme, params) => ({
                                                    input: {
                                                        borderColor: "#BAB86C",
                                                        backgroundColor: params.checked ? "#BAB86C" : "#fff",
                                                    },
                                                    label: {
                                                        fontSize: "14px",
                                                        color: "#000",
                                                    },
                                                    icon: { color: "#fff" },
                                                })}
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
                                        {sizeList.map((size) => (
                                            <Checkbox
                                                key={size}
                                                label={size}
                                                checked={selectedSizes.includes(normalize(size))}
                                                onChange={() => toggleSize(size)}
                                                styles={(theme, params) => ({
                                                    input: {
                                                        borderColor: "#BAB86C",
                                                        backgroundColor: params.checked ? "#BAB86C" : "#fff",
                                                    },
                                                    label: {
                                                        fontSize: "14px",
                                                        color: "#000",
                                                    },
                                                    icon: { color: "#fff" },
                                                })}
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

export default Boys;
