import { usePage } from '@inertiajs/react';
import { Container, Text, Grid } from '@mantine/core';
import ProductCard from '../../Components/ProductCard';

function GirlsCollectionPage() {
  const { products, category } = usePage().props;

  return (
    <Container
      size="xl"
      style={{ backgroundColor: "#f9f6f1", padding: "40px 20px" }}
    >
      <Text
        size="xl"
        weight={700}
        mb={30}
        color="gray.8"
        style={{ fontSize: "32px", fontFamily: "WendyOne" }}
      >
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} - Girls Collection` : 'All Girls Collection'}
      </Text>

      {products.length === 0 ? (
        <Text size="lg" color="dimmed">
          No products found.
        </Text>
      ) : (
        <Grid gutter="lg">
          {products.map((product) => (
            <Grid.Col
              key={product.id}
              span={4}
              style={{
                minWidth: "300px",
                minHeight: "200px",
                maxWidth: "300px",
                maxHeight: "500px",
              }}
            >
              <ProductCard product={product} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default GirlsCollectionPage;
