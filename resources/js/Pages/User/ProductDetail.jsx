import { Container, Grid, MantineProvider } from "@mantine/core";
import { useState } from "react";
import { router } from "@inertiajs/react";

import ProductImageSection from "../../Components/ProductImageSection";
import ProductInfoSection from "../../Components/ProductInfoSection";
import Reviews from "../../Components/Reviews";

function ProductDetail({ product, auth }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [processing, setProcessing] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();

    setProcessing(true);

    router.post(
      "/cart/add",
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: selectedColor,
        size: selectedSize,
        quantity,
      },
      {
        onSuccess: () => {
          console.log("Added to cart!");
          setProcessing(false);
        },
        onError: (err) => {
          console.log("Failed to add:", err);
          setProcessing(false);
        },
      }
    );
  };

  if (!product) return <div>Loading product...</div>;

  return (
    <MantineProvider>

      <Container size="lg" mt="xl">
        <Grid>
          <Grid.Col span={6}>
            <ProductImageSection product={product} />
          </Grid.Col>
          <Grid.Col span={6}>
            <ProductInfoSection
              product={product}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              quantity={quantity}
              setQuantity={setQuantity}
              handleAddToCart={handleAddToCart}
              canAddToCart={
                selectedColor && selectedSize && quantity > 0 && !processing
              }
              processing={processing}
            />
          </Grid.Col>
        </Grid>

        <Reviews product={product} auth={auth} />
      </Container>
    </MantineProvider>
  );
}

export default ProductDetail;
