import { Container, Grid, MantineProvider } from "@mantine/core";
import { useState } from "react";
import { router } from "@inertiajs/react";
import AddressSection from "../../Components/AddressSection";
import ProductImageSection from "../../Components/ProductImageSection";
import ProductInfoSection from "../../Components/ProductInfoSection";
import Reviews from "../../Components/Reviews";

const mockAddress =
    "456 Mockingbird Lane, Barangay 123, Sample City, Test Province, Mockland, 12345";

function ProductDetail({ product, auth }) {
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [addressModalOpened, setAddressModalOpened] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    // Use mockAddress as default selected address string
    const [selectedAddress, setSelectedAddress] = useState(mockAddress);

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

    const handleAddressSubmit = async (values) => {
        try {
            if (editingAddress) {
                await router.put(`/addresses/${editingAddress.id}`, values, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setSelectedAddress(values.addressString || mockAddress);
                        setAddressModalOpened(false);
                        setEditingAddress(null);
                    },
                });
            } else {
                await router.post("/addresses", values, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: (page) => {
                        // If backend sends full address string in props
                        if (page.props?.address) {
                            setSelectedAddress(page.props.address);
                        } else {
                            // fallback to submitted address string or mock
                            setSelectedAddress(
                                values.addressString || mockAddress
                            );
                        }
                        setAddressModalOpened(false);
                        setEditingAddress(null);
                    },
                });
            }
            return true;
        } catch (error) {
            console.error("Submission error:", error);
            return false;
        }
    };

    const handleBuyNow = () => {
        if (!selectedAddress || selectedAddress.trim() === "") {
            alert("Please add a shipping address before placing the order.");
            setAddressModalOpened(true);
            return;
        }

        if (!selectedColor || !selectedSize || quantity < 1) {
            alert("Please select color, size and quantity before buying.");
            return;
        }

        setLoading(true);

        router.post(
            "/orders",
            {
                address: selectedAddress,
                product_id: product.id,
                color_id: selectedColor,
                size_id: selectedSize,
                quantity: quantity,
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const orderId = page.props?.order_id;
                    if (orderId) {
                        router.visit(`/order-success/${orderId}`);
                    } else {
                        alert(
                            "Order placed but order ID missing. Please check your orders."
                        );
                    }
                },
                onError: (errors) => {
                    alert(errors?.address || "Failed to place order.");
                },
                onFinish: () => setLoading(false),
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
                                selectedColor &&
                                selectedSize &&
                                quantity > 0 &&
                                !processing
                            }
                            handleBuyNow={handleBuyNow}
                            processing={processing || loading}
                        />
                    </Grid.Col>
                </Grid>

                <Reviews product={product} auth={auth} />

                <AddressSection
                    selectedAddress={selectedAddress}
                    setAddressModalOpened={setAddressModalOpened}
                    addressModalOpened={addressModalOpened}
                    editingAddress={editingAddress}
                    setEditingAddress={setEditingAddress}
                    onAddressSubmit={handleAddressSubmit}
                />
            </Container>
        </MantineProvider>
    );
}

export default ProductDetail;
