import {
    Card,
    Image,
    Text,
    Badge,
    Group,
    Container,
    MantineProvider,
    Button,
    Paper,
    Grid,
    Stack,
    SegmentedControl,
    ActionIcon,
} from "@mantine/core";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

import AuthHeader from "../../Components/AuthHeader";
import Reviews from "../../Components/Reviews";

function ProductDetail({ product, auth }) {
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);

    const { data, setData, post, processing, errors } = useForm({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: "",
        size: "",
        quantity: 1,
    });

    const handleAddToCart = (e) => {
        e.preventDefault();

        setData({
            ...data,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
        });

        post("/cart/add");
    };

    if (!product) {
        return <div>Loading product...</div>;
    }

    const canAddToCart =
        selectedColor && selectedSize && quantity > 0 && !processing;

    return (
        <MantineProvider>
            <AuthHeader />
            <Container size="lg" mt="xl">
                <Grid>
                    {/* Product Images Section */}
                    <Grid.Col span={6}>
                        <Paper shadow="sm" radius="md" p="md">
                            <Image
                                src={`/storage/${product.image}`}
                                height={400}
                                alt={product.name}
                                fit="cover"
                            />
                            {/* Thumbnail Gallery */}
                            <Group mt="md" position="center">
                                <Image
                                    src={`/storage/${product.image}`}
                                    height={80}
                                    width={80}
                                    radius="md"
                                    alt={product.name}
                                />
                            </Group>
                        </Paper>
                    </Grid.Col>

                    {/* Product Details Section */}
                    <Grid.Col span={6}>
                        <Stack spacing="lg">
                            <Text size="xl" weight={700}>
                                {product.name}
                            </Text>

                            <Text color="dimmed">{product.description}</Text>

                            <Text size="xl" weight={700} color="blue">
                                ₱{product.price}
                            </Text>

                            {/* Color Selection */}
                            <div>
                                <Text weight={500} mb="xs">
                                    Color
                                </Text>
                                <Group spacing="xs">
                                    {product.colors.map((color) => (
                                        <ActionIcon
                                            key={color.id}
                                            size="xl"
                                            variant={
                                                selectedColor === color.id
                                                    ? "filled"
                                                    : "light"
                                            }
                                            style={{
                                                backgroundColor: color.hex_code,
                                                border:
                                                    selectedColor === color.id
                                                        ? "2px solid blue"
                                                        : "1px solid #ddd",
                                            }}
                                            onClick={() =>
                                                setSelectedColor(color.id)
                                            }
                                        >
                                            {/* Optional: show color name */}
                                        </ActionIcon>
                                    ))}
                                </Group>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <Text weight={500} mb="xs">
                                    Sizes
                                </Text>
                                <SegmentedControl
                                    value={selectedSize}
                                    onChange={setSelectedSize}
                                    data={product.sizes.map((size) => ({
                                        label: size.name,
                                        value: size.id.toString(),
                                    }))}
                                />
                            </div>

                            {/* Quantity Control */}
                            <Group>
                                <Text weight={500}>Quantity</Text>
                                <Group spacing={5}>
                                    <ActionIcon
                                        variant="light"
                                        onClick={() =>
                                            setQuantity((prev) =>
                                                Math.max(1, prev - 1)
                                            )
                                        }
                                    >
                                        -
                                    </ActionIcon>
                                    <Text w={40} ta="center">
                                        {quantity}
                                    </Text>
                                    <ActionIcon
                                        variant="light"
                                        onClick={() =>
                                            setQuantity((prev) => prev + 1)
                                        }
                                    >
                                        +
                                    </ActionIcon>
                                </Group>
                            </Group>

                            {/* Action Buttons */}
                            <Group mt="xl">
                                <Button
                                    variant="light"
                                    color="blue"
                                    size="lg"
                                    style={{ flex: 1 }}
                                    onClick={handleAddToCart}
                                    disabled={!canAddToCart}
                                    loading={processing}
                                >
                                    Add to Cart
                                </Button>

                                <Button
                                    color="blue"
                                    size="lg"
                                    style={{ flex: 1 }}
                                >
                                    Buy now
                                </Button>
                            </Group>

                            {/* Categories */}
                            <Group mt="md">
                                {product.categories.map((cat) => (
                                    <Badge key={cat.id} variant="light">
                                        {cat.name}
                                    </Badge>
                                ))}
                            </Group>
                        </Stack>
                    </Grid.Col>
                </Grid>
                <Reviews product={product} auth={auth} />
            </Container>
        </MantineProvider>
    );
}

export default ProductDetail;
