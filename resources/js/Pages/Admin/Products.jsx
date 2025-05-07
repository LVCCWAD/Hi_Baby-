import {
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    Grid,
    MantineProvider,
  } from "@mantine/core";
  import { showNotification } from "@mantine/notifications";
  import { router } from "@inertiajs/react";
  import { IconCheck } from "@tabler/icons-react";

  import AdminHeader from "../../Components/AdminHeader.jsx";

  function Products({ products = [] }) {
    const handleDelete = (id) => {
      if (confirm("Are you sure you want to delete this product?")) {
        router.delete(`/products/${id}`, {
          onSuccess: () => {
            showNotification({
              title: "Deleted",
              message: "Product has been deleted successfully.",
              color: "green",
              icon: <IconCheck />,
            });
          },
          onError: () => {
            showNotification({
              title: "Error",
              message: "Failed to delete product.",
              color: "red",
            });
          },
        });
      }
    };

    const productCards = products.map((product) => (
      <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={`/storage/${product.image}`}
              height={180}
              alt={product.name}
              withPlaceholder
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500} size="lg">
              {product.name}
            </Text>
            <Badge color="gray" variant="light">
              {product.gender?.name || "Unisex"}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed" mb="sm">
            {product.description || "No description"}
          </Text>

          <Group spacing={4} mb="xs" wrap="wrap">
            {product.categories?.map((cat, idx) => (
              <Badge key={idx} color="blue" variant="light">
                {cat.name}
              </Badge>
            ))}
          </Group>

          <Group spacing={4} mb="xs" wrap="wrap">
            {product.sizes?.map((size, idx) => (
              <Badge key={idx} color="gray" variant="outline">
                {size.name}
              </Badge>
            ))}
          </Group>

          <Group spacing={4} mb="xs" wrap="wrap">
            {product.colors?.map((color, idx) => (
              <Group key={idx} spacing={6}>
                <Text size="xs">{color.name}</Text>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: color.hex_code,
                    borderRadius: "50%",
                  }}
                />
              </Group>
            ))}
          </Group>

          <Text size="sm" mt="xs">
            <strong>In stock:</strong> {product.quantity}
          </Text>

          <Group position="apart" mt="md">
            <Text size="lg" weight={600} color="blue">
              ₱{product.price}
            </Text>
            <Button variant="light" color="blue" radius="md">
              Add to Cart
            </Button>
          </Group>

          <Group mt="sm" position="apart">
            <Button
              component="a"
              href={`/products/${product.id}/edit`}
              variant="outline"
              color="teal"
              size="xs"
            >
              Edit
            </Button>
            <Button
              color="red"
              variant="outline"
              size="xs"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </Button>
          </Group>
        </Card>
      </Grid.Col>
    ));

    return (
      <MantineProvider>
        <AdminHeader />

        <Grid>
          <Grid.Col span={6}>
            <h1>Products</h1>
          </Grid.Col>
          <Grid.Col span={2} offset={4}>
            <Button component="a" href="/add-product" variant="outline">
              Add Product
            </Button>
          </Grid.Col>
        </Grid>

        <Grid mt="md">{productCards}</Grid>
      </MantineProvider>
    );
  }

  export default Products;
