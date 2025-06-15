import React from "react";
import {
    Card,
    Image,
    Text,
    Box,
    Badge,
    Flex,
    MantineProvider,
} from "@mantine/core";
import { Link } from "@inertiajs/react";
import { IconHeartFilled } from "@tabler/icons-react";

function LikesSection({ likedProducts, onUnlike }) {
    const handleUnlike = (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onUnlike) onUnlike(productId);
    };

    return (
        <MantineProvider>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text weight={700} size="lg" mb="md">
                    My Likes
                </Text>

                {likedProducts.length === 0 ? (
                    <Text align="center" color="dimmed" py="xl">
                        You haven't liked any products yet.
                    </Text>
                ) : (
                    <Flex wrap="wrap" gap="lg">
                        {likedProducts.map((product) => {
                            const originalPrice = Math.round(product.price * 1.2);
                            const discountPercentage = Math.round(
                                ((originalPrice - product.price) / originalPrice) * 100
                            );

                            return (
                                <Link
                                    key={product.id}
                                    href={`/user/products/${product.id}`}
                                    style={{
                                        textDecoration: "none",
                                        flex: "1 1 calc(25% - 1rem)", // 4 per row on large screens
                                        minWidth: "220px",
                                        maxWidth: "250px",
                                    }}
                                >
                                    <Card
                                        shadow="sm"
                                        padding="lg"
                                        radius="md"
                                        withBorder
                                        style={{
                                            width: "100%",
                                            height: 380, // fixed card height
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Box
                                            style={{
                                                height: 200,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                overflow: "hidden",
                                                borderRadius: "8px",
                                            }}
                                        >
                                            <Image
                                                src={
                                                    product.image
                                                        ? `/storage/${product.image}`
                                                        : "/default-image.jpg"
                                                }
                                                alt={product.name}
                                                height={200}
                                                fit="contain"
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

                                        <Flex justify="space-between" align="center" mt="md">
                                            <Text weight={600} size="sm" lineClamp={1}>
                                                {product.name}
                                            </Text>

                                            <Box
                                                onClick={(e) => handleUnlike(product.id, e)}
                                                sx={(theme) => ({
                                                    cursor: "pointer",
                                                    backgroundColor: theme.white,
                                                    borderRadius: "50%",
                                                    width: 30,
                                                    height: 30,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                                                })}
                                            >
                                                <IconHeartFilled size={18} color="#ff6b6b" />
                                            </Box>
                                        </Flex>

                                        <Box mt={5}>
                                            <Text weight={900} size="lg" color="#6b8e23">
                                                ₱{product.price}
                                            </Text>

                                            <Flex align="center" gap={5}>
                                                <Text
                                                    size="sm"
                                                    color="gray"
                                                    style={{ textDecoration: "line-through" }}
                                                >
                                                    ₱{originalPrice}
                                                </Text>

                                                <Text size="sm" color="red" weight={700}>
                                                    -{discountPercentage}%
                                                </Text>
                                            </Flex>
                                        </Box>
                                    </Card>
                                </Link>
                            );
                        })}
                    </Flex>
                )}
            </Card>
        </MantineProvider>
    );
}

export default LikesSection;
