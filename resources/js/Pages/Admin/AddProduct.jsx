import React, { useState } from "react";
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

function AddProduct({
    categories = [],
    colors = [],
    sizes = [],
    genders = [],
}) {
    const [stockStatus, setStockStatus] = useState("in_stock");
    const [imagePreview, setImagePreview] = useState(null);
    const [showImageError, setShowImageError] = useState(false);
    const MAX_FILE_SIZE_MB = 2;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        price: null,
        quantity: null,
        image: null,
        gender_id: null,
        category_ids: [],
        color_ids: [],
        size_ids: [],
        stock_status: "in_stock",
    });

    const handleImageUpload = (file) => {
        if (!file) {
            setData("image", null);
            setImagePreview(null);
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
            formData.append("stock_status", stockStatus);
            if (data.image) formData.append("image", data.image);
            data.category_ids.forEach((id) =>
                formData.append("category_ids[]", id)
            );
            data.color_ids.forEach((id) => formData.append("color_ids[]", id));
            data.size_ids.forEach((id) => formData.append("size_ids[]", id));

            post("/add-product", formData, {
                forceFormData: true,
                onSuccess: () => {
                    notifications.show({
                        title: "Success",
                        message: "Product added successfully",
                        color: "green",
                    });
                    reset();
                    setStockStatus("in_stock");
                    setImagePreview(null);
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
                <title>Add Product - Hi Baby!</title>
            </Head>
            <Modal
                opened={showImageError}
                onClose={() => setShowImageError(false)}
                withCloseButton={false}
                centered
                size="sm"
                overlayProps={{
                    blur: 3,
                    backgroundOpacity: 0.4,
                }}
                styles={{
                    header: {
                        backgroundColor: "#BAB86C",
                        color: "white",
                        padding: "16px",
                        fontSize: "18px",
                        fontWeight: 600,
                    },
                    body: { padding: "24px" },
                }}
            >
                <Text align="center" color="#333" size="md" mb="md">
                    The maximum image size allowed is {MAX_FILE_SIZE_MB} MB.
                </Text>

                <Flex justify="center">
                    <Button
                        onClick={() => setShowImageError(false)}
                        style={{ backgroundColor: "#BAB86C" }}
                        radius="md"
                        size="md"
                        px="40px"
                    >
                        OK
                    </Button>
                </Flex>
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
                        Add Product
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

                                    {/* Price & Quantity side by side */}
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

                            {/* Submit */}
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
                                    {processing ? "Adding..." : "Add Product"}
                                </Button>
                            </Flex>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </MantineProvider>
    );
}

export default AddProduct;
