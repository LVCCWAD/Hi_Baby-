import {
    Card,
    Image,
    Text,
    Button,
    Group,
    Badge,
    Grid,
    Container,
    Center,
    MantineProvider,
} from "@mantine/core";
import { useState } from "react";
import AuthHeader from "../../Components/AuthHeader";
import GuestHeader from "../../Components/GuestHeader";

function Home({ products = [] }) {
    console.log("Products from Laravel:", products); // 👈 Add this here

    return (
        <Container size="xl">
            <GuestHeader />
            <Button component="a" href="/girls-products" variant="outline">
                        View More{" "}
                    </Button>
            <Text size="xl" weight={700} align="center" mb="md">
                Shop Our Products
            </Text>

            <Grid>
                {products.map((product) => (
                    <Grid.Col key={product.id} span={4}>
                        <ProductCard product={product} />
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
}

function ProductCard({ product }) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <MantineProvider>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                        src={`/storage/${product.image}`}
                        height={200}
                        alt={product.name}
                        fit="cover"
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={600}>{product.name}</Text>
                    <Badge color="pink" variant="light">
                        {product.gender?.name || "Unisex"}
                    </Badge>
                </Group>

                <Group position="apart" mt="md">
                    <Text weight={700} color="blue">
                        ₱{product.price}
                    </Text>
                    {/* <Button variant="light" color="blue" radius="md">
            Add to Cart
          </Button> */}
                </Group>
            </Card>
        </MantineProvider>
    );
}

export default Home;
