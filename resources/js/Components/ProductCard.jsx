import {
    Card,
    Image,
    Text,
    Box,
    Badge,
    Flex,
    Group,
    MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { IconHeartFilled, IconHeart } from "@tabler/icons-react";

function ProductCard({ product }) {
    const [isLiked, setIsLiked] = useState(product.liked || false);
    const [likeCount, setLikeCount] = useState(product.likes_count || 0);

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
            <Link href={`/user/products/${product.id}`} style={{ textDecoration: "none" }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
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

                    {/* Name and Like Button with Like Count */}
                    <Flex justify="space-between" align="center" mt="md">
                        <Text weight={600} lineClamp={1}>
                            {product.name}
                        </Text>

                        <Flex align="center" gap={5}>
                            <Box
                                onClick={handleLikeToggle}
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
                                {isLiked ? (
                                    <IconHeartFilled size={18} color="#ff6b6b" />
                                ) : (
                                    <IconHeart size={18} color="#adb5bd" />
                                )}
                            </Box>

                            <Text size="xs" color="dimmed">
                                {likeCount} {likeCount === 1 ? "like" : "likes"}
                            </Text>
                        </Flex>
                    </Flex>

                    {/* Pricing Section */}
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
        </MantineProvider>
    );
}

export default ProductCard;
