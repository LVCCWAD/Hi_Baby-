import { Container, Grid, MantineProvider } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

import ProductImageSection from "../../Components/ProductImageSection";
import ProductInfoSection from "../../Components/ProductInfoSection";

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
            quantity,
        });
        post("/cart/add");
    };

    if (!product) return <div>Loading product...</div>;

    return (
        <MantineProvider>
            <AuthHeader />

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
                                selectedColor &&
                                selectedSize &&
                                quantity > 0 &&
                                !processing
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
