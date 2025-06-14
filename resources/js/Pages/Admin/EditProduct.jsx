import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import {
    TextInput,
    Textarea,
    NumberInput,
    Button,
    Paper,
    Stack,
    LoadingOverlay,
    Text,
    Container,
    Modal,
    Flex,
    MantineProvider,
    Group,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import SelectableButtonGroup from "@/Components/AddProduct/SelectableButtonGroup";
import QuantityInput from "@/Components/AddProduct/QuantityInput";
import ImageUploader from "@/Components/AddProduct/ImageUploader";
import ColorSelector from "@/Components/AddProduct/ColorSelector";

function EditProduct({
    product,
    categories = [],
    colors = [],
    sizes = [],
    genders = [],
}) {
    const [imagePreview, setImagePreview] = useState(
        product.image ? `/storage/${product.image}` : null
    );
    const [showImageError, setShowImageError] = useState(false);
    const MAX_FILE_SIZE_MB = 2;

    const { data, setData, post, processing, errors } = useForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || null,
        quantity: product.quantity || null,
        image: null,
        gender_id: product.gender_id?.toString() || null,
        category_ids: product.categories?.map((c) => c.id) || [],
        color_ids: product.colors?.map((c) => c.id) || [],
        size_ids: product.sizes?.map((s) => s.id) || [],
    });

    const handleImageUpload = (file) => {
        if (!file) {
            setData("image", null);
            setImagePreview(product.image ? `/storage/${product.image}` : null);
            return;
        }
        if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
            setShowImageError(true);
            return;
        }
        setData("image", file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setData("image", null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", data.price);
            formData.append("quantity", data.quantity);
            formData.append("gender_id", data.gender_id);
            formData.append("_method", "put");
            if (data.image) formData.append("image", data.image);
            data.category_ids.forEach((id) =>
                formData.append("category_ids[]", id)
            );
            data.color_ids.forEach((id) => formData.append("color_ids[]", id));
            data.size_ids.forEach((id) => formData.append("size_ids[]", id));

            post(`/products/${product.id}`, formData, {
                forceFormData: true,
                onSuccess: () => {
                    notifications.show({
                        title: "Success",
                        message: "Product updated successfully",
                        color: "green",
                    });
                },
                onError: (errors) => {
                    const errorMessages = Object.entries(errors)
                        .map(([field, message]) => `${field}: ${message}`)
                        .join("\n");
                    notifications.show({
                        title: "Validation Error",
                        message: errorMessages,
                        color: "red",
                    });
                },
            });
        } catch (err) {
            notifications.show({
                title: "Error",
                message: err.message || "Unknown error",
                color: "red",
            });
        }
    };

    const categoryOptions = categories.map(({ id, name }) => ({
        value: id.toString(),
        label: name,
    }));

    const colorOptions = colors.map(({ id, name, hex_code }) => ({
        value: id.toString(),
        label: name,
        color: hex_code,
    }));

    const sizeOptions = sizes.map(({ id, name }) => ({
        value: id.toString(),
        label: name,
    }));

    const genderOptions = genders.map(({ id, name }) => ({
        value: id.toString(),
        label: name,
    }));

    return (
        <MantineProvider>
            <Head>
                <title>
                    {product?.name
                        ? `Edit ${product.name} - Hi Baby!`
                        : "Edit Product - Hi Baby!"}
                </title>
            </Head>
            <Modal
                opened={showImageError}
                onClose={() => setShowImageError(false)}
                title="File too large"
            >
                <Text>
                    The maximum image size allowed is {MAX_FILE_SIZE_MB} MB.
                </Text>
            </Modal>

            <Container
                size="md"
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Paper
                    radius="lg"
                    p="xl"
                    style={{ width: "100%", background: "#FDFDFD" }}
                >
                    <Text
                        style={{
                            fontFamily: "WendyOne",
                            fontSize: "clamp(32px, 5vw, 50px)",
                            color: "#BAB86C",
                            textAlign: "center",
                            padding: "20px 0",
                        }}
                    >
                        Edit Product
                    </Text>

                    <LoadingOverlay visible={processing} blur={2} />

                    <form onSubmit={handleSubmit}>
                        <Stack spacing="xl">
                            {/* Section 1 */}
                            <Paper
                                p="lg"
                                shadow="sm"
                                radius="md"
                                style={{ background: "#FAFAFA" }}
                            >
                                <Stack spacing="lg">
                                    <TextInput
                                        label="Product Name"
                                        required
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        error={errors.name}
                                        size="md"
                                        radius="md"
                                    />

                                    <Group grow align="flex-end">
                                        <NumberInput
                                            label="Price"
                                            required
                                            value={data.price}
                                            onChange={(value) =>
                                                setData("price", value)
                                            }
                                            error={errors.price}
                                            precision={2}
                                            min={0}
                                            size="md"
                                            radius="md"
                                        />

                                        <QuantityInput
                                            value={data.quantity}
                                            onChange={(value) =>
                                                setData("quantity", value)
                                            }
                                            error={errors.quantity}
                                        />
                                    </Group>

                                    <Textarea
                                        label="Description"
                                        required
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        error={errors.description}
                                        size="md"
                                        radius="md"
                                    />

                                    <SelectableButtonGroup
                                        label="Categories"
                                        options={categoryOptions}
                                        selectedValues={data.category_ids}
                                        single={false}
                                        onChange={(updated) =>
                                            setData("category_ids", updated)
                                        }
                                        error={errors.category_ids}
                                    />
                                </Stack>
                            </Paper>

                            {/* Section 2 */}
                            <Paper
                                p="lg"
                                shadow="sm"
                                radius="md"
                                style={{ background: "#FAFAFA" }}
                            >
                                <Stack spacing="lg">
                                    <SelectableButtonGroup
                                        label="Gender"
                                        options={genderOptions}
                                        selectedValues={data.gender_id}
                                        single={true}
                                        onChange={(value) =>
                                            setData("gender_id", value)
                                        }
                                        error={errors.gender_id}
                                    />

                                    <ImageUploader
                                        handleImageUpload={handleImageUpload}
                                        imagePreview={imagePreview}
                                        removeImage={removeImage}
                                        error={errors.image}
                                    />

                                    <ColorSelector
                                        colorOptions={colorOptions}
                                        selectedColors={data.color_ids}
                                        setSelectedColors={(colors) =>
                                            setData("color_ids", colors)
                                        }
                                        error={errors.color_ids}
                                    />

                                    <SelectableButtonGroup
                                        label="Sizes"
                                        options={sizeOptions}
                                        selectedValues={data.size_ids}
                                        single={false}
                                        onChange={(updated) =>
                                            setData("size_ids", updated)
                                        }
                                        error={errors.size_ids}
                                    />
                                </Stack>
                            </Paper>

                            <Flex justify="left" mt="md" ml="md">
                                <Button
                                    type="submit"
                                    size="lg"
                                    radius="md"
                                    loading={processing}
                                    style={{
                                        backgroundColor: "#2C3E50",
                                        padding: "0 50px",
                                    }}
                                >
                                    {processing
                                        ? "Updating..."
                                        : "Update Product"}
                                </Button>
                            </Flex>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </MantineProvider>
    );
}

export default EditProduct;
