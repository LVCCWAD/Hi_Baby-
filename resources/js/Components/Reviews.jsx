import { useForm } from "@inertiajs/react";
import {
  Textarea,
  NumberInput,
  Button,
  Stack,
  Paper,
  Text,
  Title,
  Group,
  ActionIcon,
  Divider,
  Rating,
  Box,
  Avatar,
  Notification,
} from "@mantine/core";
import { IconTrash, IconEdit, IconUserCircle } from "@tabler/icons-react";
import { useState } from "react";

function Reviews({ product, auth }) {
  const [editingReview, setEditingReview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    data,
    setData,
    post,
    put,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    review: "",
    rating: 0,
  });

  const currentUserId = auth?.user?.id;

  // 👇 Check if user already submitted a review
  const existingReview = product.reviews?.find(
    (review) => review.user_id === currentUserId
  );

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
      review: review.review,
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
      <Title order={3} mb="sm">
        Customer Reviews
      </Title>

      {/* Success Notification */}
      {showSuccess && (
        <Notification color="green" withCloseButton onClose={() => setShowSuccess(false)}>
          {editingReview ? "Review updated!" : "Review submitted!"}
        </Notification>
      )}

      {/* Review Form - Show only if user hasn't reviewed or is editing */}
      {!existingReview || editingReview ? (
        <Paper withBorder shadow="xs" p="lg" radius="md" mt="md">
          <form onSubmit={handleSubmit}>
            <Stack>
              <Textarea
                label="Your Review"
                placeholder="Share your thoughts..."
                value={data.review}
                onChange={(e) => setData("review", e.target.value)}
                error={errors.review}
                required
              />

              <Rating
                value={data.rating}
                onChange={(value) => setData("rating", value)}
                count={5}
                size="lg"
                color="yellow"
                required
              />
              {errors.rating && (
                <Text size="xs" color="red">
                  {errors.rating}
                </Text>
              )}

              <Button type="submit" loading={processing} fullWidth>
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

      {/* Reviews List */}
      <Stack mt="xl">
        {Array.isArray(product.reviews) && product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <Paper
              key={review.id}
              shadow="xs"
              p="md"
              radius="md"
              withBorder
              bg="gray.0"
            >
              <Group position="apart" align="flex-start">
                <Group>
                  <Avatar color="blue" radius="xl">
                    <IconUserCircle size={24} />
                  </Avatar>
                  <Box>
                    <Text weight={600}>{review.user?.username || "Anonymous"}</Text>
                    <Rating value={review.rating} readOnly size="sm" color="yellow" />
                    <Text mt={5} size="sm">
                      {review.review}
                    </Text>
                  </Box>
                </Group>

                {review.user_id === currentUserId && (
                  <Group spacing={0}>
                    <ActionIcon
                      color="blue"
                      variant="light"
                      onClick={() => handleEdit(review)}
                    >
                      <IconEdit size={18} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => handleDelete(review.id)}
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                  </Group>
                )}
              </Group>
            </Paper>
          ))
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
