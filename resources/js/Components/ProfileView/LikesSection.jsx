import React from "react";
import {
    Card,
    Title,
    Divider,
    Text,
    SimpleGrid,
    Paper,
    Group,
    ActionIcon,
    Box,
    Image,
    Badge,
} from "@mantine/core";
import { IconHeartFilled, IconStarFilled } from "@tabler/icons-react";

function LikesSection({ likedProducts, onUnlike }) {
    const handleUnlike = (productId) => {
        if (onUnlike) onUnlike(productId);
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            {/* ... */}
            {likedProducts.length === 0 ? (
                <Text align="center" color="dimmed" py="xl">
                    You haven't liked any products yet
                </Text>
            ) : (
                <SimpleGrid cols={2} spacing="lg">
                    {likedProducts.map((product) => (
                        <Paper key={product.id} shadow="xs" p="md" withBorder>
                            <Group position="apart" mb="xs">
                                <Text weight={500}>{product.name}</Text>
                                <ActionIcon
                                    color="red"
                                    variant="subtle"
                                    aria-label={`Unlike ${product.name}`}
                                    onClick={() => handleUnlike(product.id)}
                                    style={{ cursor: "pointer" }}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter" ||
                                            e.key === " "
                                        ) {
                                            handleUnlike(product.id);
                                        }
                                    }}
                                >
                                    <IconHeartFilled size={20} />
                                </ActionIcon>
                            </Group>

                            <Box style={{ position: "relative" }}>
                                <Image
                                    src={
                                        product.image?.startsWith("/storage/")
                                            ? product.image
                                            : `/storage/${product.image}`
                                    }
                                    height={160}
                                    fit="contain"
                                    withPlaceholder
                                    alt={product.name}
                                />
                                {product.discount && (
                                    <Badge
                                        color="green"
                                        style={{
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                        }}
                                    >
                                        -{product.discount}%
                                    </Badge>
                                )}
                            </Box>

                            <Group position="apart" mt="md">
                                <div>
                                    <Group
                                        spacing={5}
                                        aria-label={`Rating: ${product.rating} out of 5`}
                                    >
                                        {Array(5)
                                            .fill(0)
                                            .map((_, i) => (
                                                <IconStarFilled
                                                    key={i}
                                                    size={16}
                                                    color={
                                                        i <
                                                        Math.floor(
                                                            product.rating
                                                        )
                                                            ? "#FFD700"
                                                            : "#C0C0C0"
                                                    }
                                                    aria-hidden="true"
                                                />
                                            ))}
                                        <Text size="xs" color="dimmed" ml={4}>
                                            {product.rating}/
                                            {Array.isArray(product.reviews)
                                                ? product.reviews.length
                                                : product.reviews}
                                        </Text>
                                    </Group>
                                </div>

                                <Group spacing={5}>
                                    {product.original_price && (
                                        <Text
                                            size="sm"
                                            color="dimmed"
                                            style={{
                                                textDecoration: "line-through",
                                            }}
                                        >
                                            ₱{product.original_price}
                                        </Text>
                                    )}
                                    <Text weight={700} size="lg">
                                        ₱{product.price}
                                    </Text>
                                </Group>
                            </Group>
                        </Paper>
                    ))}
                </SimpleGrid>
            )}
        </Card>
    );
}

export default LikesSection;
