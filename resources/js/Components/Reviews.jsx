import { useForm } from "@inertiajs/react";
import {
    Textarea, Button, Stack, Paper, Text, Title, Group,
    ActionIcon, Divider, Rating, Box, Avatar, Notification, Badge
} from "@mantine/core";
import { IconTrash, IconEdit, IconUserCircle, IconStar } from "@tabler/icons-react";
import { useState } from "react";

const primaryColor = "#BAB86C";

function Reviews({ product, auth }) {
    const [editingReview, setEditingReview] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        review: "",
        rating: 0,
    });

    const currentUserId = auth?.user?.id;
    const existingReview = product.reviews?.find(review => review.user_id === currentUserId);

    const handleSubmit = (e) => {
        e.preventDefault();
        const route = editingReview
            ? `/user/products/${product.id}/reviews/${editingReview.id}`
            : `/user/products/${product.id}/reviews`;

        const method = editingReview ? put : post;

        method(route, {
            onSuccess: () => {
                reset();
                setEditingReview(null);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            },
        });
    };

    const handleEdit = (review) => {
        setEditingReview(review);
        setData({
            review: review.review || "",
            rating: review.rating,
        });
    };

    const handleDelete = (reviewId) => {
        if (confirm("Are you sure you want to delete this review?")) {
            destroy(`/user/products/${product.id}/reviews/${reviewId}`, {
                onSuccess: () => {
                    reset();
                    setEditingReview(null);
                },
            });
        }
    };

    return (
        <>
            <Divider my="xl" />
            <Title order={3} mb="sm" style={{ color: primaryColor }}>
                Customer Reviews
            </Title>

            {showSuccess && (
                <Notification color="teal" withCloseButton onClose={() => setShowSuccess(false)}>
                    {editingReview ? "Review updated!" : "Review submitted!"}
                </Notification>
            )}

            {!existingReview || editingReview ? (
                <Paper shadow="md" p="lg" radius="lg" mt="md" withBorder style={{ borderColor: primaryColor }}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing="md">
                            <Textarea
                                label="Your Review"
                                placeholder="Share your thoughts..."
                                value={data.review}
                                onChange={(e) => setData("review", e.target.value)}
                                error={errors.review}
                                autosize
                                minRows={3}
                            />

                            <Stack spacing="xs">
                                <Text weight={500} size="sm" color="dimmed">
                                    Your Rating
                                </Text>
                                <Rating
                                    value={data.rating}
                                    onChange={(value) => setData("rating", value)}
                                    count={5}
                                    size="xl"
                                    color={primaryColor}
                                    required
                                    emptySymbol={<IconStar size={24} />}
                                />
                                {errors.rating && <Text size="xs" color="red">{errors.rating}</Text>}
                            </Stack>

                            <Button type="submit" loading={processing} fullWidth radius="lg" size="md" style={{ backgroundColor: primaryColor }}>
                                {editingReview ? "Update Review" : "Submit Review"}
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            ) : (
                <Text color="dimmed" size="sm" mt="sm">
                    You have already submitted a review. You can edit or delete it below.
                </Text>
            )}

            <Stack mt="xl">
                {Array.isArray(product.reviews) && product.reviews.length > 0 ? (
                    product.reviews.map((review) => {
                        const user = review.user;
                        const imageUrl = user?.picture ? `/storage/${user.picture}` : null;

                        return (
                            <Paper
                                key={review.id}
                                shadow="sm"
                                p="lg"
                                radius="lg"
                                withBorder
                                style={{ backgroundColor: "#fafafa", borderColor: primaryColor }}
                            >
                                <Group position="apart" align="flex-start">
                                    <Group>
                                        <Avatar src={imageUrl} radius="xl" size="lg" color="gray">
                                            {!imageUrl && <IconUserCircle size={28} />}
                                        </Avatar>
                                        <Box>
                                            <Group spacing="xs">
                                                <Text weight={600}>{user?.username || "Anonymous"}</Text>
                                                <Badge color="yellow" variant="light">
                                                    {review.rating} / 5
                                                </Badge>
                                            </Group>

                                            <Rating value={review.rating} readOnly size="sm" color={primaryColor} mt={4} />

                                            {review.review && (
                                                <Text mt={8} size="sm" color="gray.8">{review.review}</Text>
                                            )}
                                        </Box>
                                    </Group>

                                    {review.user_id === currentUserId && (
                                        <Group spacing={8}>
                                            <ActionIcon color="blue" variant="light" onClick={() => handleEdit(review)}>
                                                <IconEdit size={20} />
                                            </ActionIcon>
                                            <ActionIcon color="red" variant="light" onClick={() => handleDelete(review.id)}>
                                                <IconTrash size={20} />
                                            </ActionIcon>
                                        </Group>
                                    )}
                                </Group>
                            </Paper>
                        );
                    })
                ) : (
                    <Text color="dimmed" align="center" mt="md">
                        No reviews yet. Be the first to share your experience!
                    </Text>
                )}
            </Stack>
        </>
    );
}

export default Reviews;
