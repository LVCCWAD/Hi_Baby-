import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    TextInput,
    Textarea,
    NumberInput,
    Select,
    MultiSelect,
    Button,
    Paper,
    Stack,
    FileInput,
    Group,
    MantineProvider,
    LoadingOverlay,
    Radio,
    Box,
    Text,
    Image,
    ActionIcon,
    Grid,
    Container,
    Flex,
    Badge,
} from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { IconX, IconPlus } from '@tabler/icons-react';

function AddProduct({ categories = [], colors = [], sizes = [], genders = [] }) {
    const [stockStatus, setStockStatus] = useState('in_stock');
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);

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
        stock_status: 'in_stock',
    });

    const handleImageUpload = (files) => {
        if (files && files.length > 0) {
            const file = files[0];
            setData('image', file);

            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);
        formData.append('gender_id', data.gender_id);
        formData.append('stock_status', stockStatus);
        if (data.image) {
            formData.append('image', data.image);
        }

        // Append arrays properly
        data.category_ids.forEach(id => formData.append('category_ids[]', id));
        data.color_ids.forEach(id => formData.append('color_ids[]', id));
        data.size_ids.forEach(id => formData.append('size_ids[]', id));

        post("/add-product", formData, {
            forceFormData: true,
            onSuccess: () => {
                notifications.show({
                    title: 'Success',
                    message: 'Product added successfully',
                    color: 'green',
                });
                reset();
                setStockStatus('in_stock');
                setImagePreview(null);
                setSelectedImages([]);
            },
            onError: (errors) => {
                const errorMessages = Object.entries(errors)
                    .map(([field, message]) => `${field}: ${message}`)
                    .join('\n');

                notifications.show({
                    title: 'Validation Error',
                    message: errorMessages,
                    color: 'red',
                    autoClose: 5000,
                });
            },
        });
    };

    // Transform arrays for MultiSelect
    const categoryOptions = categories.map((category) => ({
        value: category.id.toString(),
        label: category.name,
    }));

    const colorOptions = colors.map((color) => ({
        value: color.id.toString(),
        label: color.name,
        color: color.hex_code,
    }));

    const sizeOptions = sizes.map((size) => ({
        value: size.id.toString(),
        label: size.name,
    }));

    const genderOptions = genders.map((gender) => ({
        value: gender.id.toString(),
        label: gender.name,
    }));

    return (
        <Container size="xl" p={0} style={{ minHeight: '100vh', backgroundColor: '#FBF2E9' }}>
            <Paper p={0} shadow="sm" pos="relative" bg="#FBF2E9" style={{ minHeight: '100vh' }}>
                <Text
                    style={{
                        fontFamily: 'WendyOne',
                        fontSize: 'clamp(32px, 5vw, 50px)',
                        color: '#BAB86C',
                        textAlign: 'center',
                        padding: '20px 0',
                        margin: 0
                    }}
                >
                    Product
                </Text>
                <LoadingOverlay visible={processing} blur={2} />

                <Container size="lg" px="md">
                    <form onSubmit={handleSubmit}>
                        <Grid gutter="xl">
                            {/* Left Column */}
                            <Grid.Col xs={12} md={6}>
                                <Stack spacing="lg">
                                    <TextInput
                                        required
                                        label="Name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        error={errors.name}
                                        disabled={processing}
                                        size="md"
                                        styles={{
                                            input: {
                                                backgroundColor: 'white',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px'
                                            }
                                        }}
                                    />

                                    <NumberInput
                                        required
                                        label="Price"
                                        value={data.price}
                                        onChange={(value) => setData("price", value)}
                                        error={errors.price}
                                        precision={2}
                                        min={0}
                                        size="md"
                                        styles={{
                                            input: {
                                                backgroundColor: 'white',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px'
                                            }
                                        }}
                                    />

                                    <MultiSelect
                                        required
                                        label="Categories"
                                        data={categoryOptions}
                                        value={data.category_ids.map(String)}
                                        onChange={(value) => setData("category_ids", value.map(Number))}
                                        error={errors.category_ids}
                                        placeholder="Select categories"
                                        size="md"
                                        styles={{
                                            input: {
                                                backgroundColor: 'white',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px'
                                            }
                                        }}
                                    />

                                    <Textarea
                                        required
                                        label="Description"
                                        value={data.description}
                                        onChange={(e) => setData("description", e.target.value)}
                                        error={errors.description}
                                        minRows={4}
                                        size="md"
                                        styles={{
                                            input: {
                                                backgroundColor: 'white',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px'
                                            }
                                        }}
                                    />
                                </Stack>
                            </Grid.Col>

                            {/* Right Column */}
                            <Grid.Col xs={12} md={6}>
                                <Stack spacing="lg">
                                    {/* Stock Status */}
                                    <Box>
                                        <Text size="sm" weight={500} mb="xs">Stock status</Text>
                                        <Group spacing="md">
                                            <Button
                                                variant={stockStatus === 'in_stock' ? 'filled' : 'outline'}
                                                color={stockStatus === 'in_stock' ? 'green' : 'gray'}
                                                size="sm"
                                                onClick={() => setStockStatus('in_stock')}
                                                style={{ borderRadius: '20px' }}
                                            >
                                                In Stock
                                            </Button>
                                            <Button
                                                variant={stockStatus === 'out_of_stock' ? 'filled' : 'outline'}
                                                color={stockStatus === 'out_of_stock' ? 'red' : 'gray'}
                                                size="sm"
                                                onClick={() => setStockStatus('out_of_stock')}
                                                style={{ borderRadius: '20px' }}
                                            >
                                                Out of Stock
                                            </Button>
                                        </Group>
                                    </Box>

                                    <NumberInput
                                        required
                                        label="Available quantity"
                                        value={data.quantity}
                                        onChange={(value) => setData("quantity", value)}
                                        error={errors.quantity}
                                        min={0}
                                        size="md"
                                        styles={{
                                            input: {
                                                backgroundColor: 'white',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px'
                                            }
                                        }}
                                    />

                                    {/* Images Upload */}
                                    <Box>
                                        <Text size="sm" weight={500} mb="xs">Images</Text>
                                        <Group spacing="md" align="flex-start">
                                            {/* Upload Button */}
                                            <FileInput
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="image-upload"
                                            />
                                            <Box
                                                component="label"
                                                htmlFor="image-upload"
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    border: '2px dashed #ddd',
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    backgroundColor: 'white',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <IconPlus size={24} color="#666" />
                                            </Box>

                                            {/* Image Previews */}
                                            {imagePreview && (
                                                <Box style={{ position: 'relative' }}>
                                                    <Image
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        width={80}
                                                        height={80}
                                                        fit="cover"
                                                        radius="md"
                                                    />
                                                    <ActionIcon
                                                        size="sm"
                                                        color="red"
                                                        variant="filled"
                                                        style={{
                                                            position: 'absolute',
                                                            top: -8,
                                                            right: -8
                                                        }}
                                                        onClick={removeImage}
                                                    >
                                                        <IconX size={12} />
                                                    </ActionIcon>
                                                </Box>
                                            )}
                                        </Group>
                                        {errors.image && (
                                            <Text size="xs" color="red" mt="xs">{errors.image}</Text>
                                        )}
                                    </Box>

                                    {/* Colors */}
                                    <Box>
                                        <Text size="sm" weight={500} mb="xs">Colors</Text>
                                        <Group spacing="sm">
                                            {colorOptions.map((color) => {
                                                const isSelected = data.color_ids.includes(parseInt(color.value));
                                                return (
                                                    <Box
                                                        key={color.value}
                                                        onClick={() => {
                                                            const colorId = parseInt(color.value);
                                                            const newColors = isSelected
                                                                ? data.color_ids.filter(id => id !== colorId)
                                                                : [...data.color_ids, colorId];
                                                            setData('color_ids', newColors);
                                                        }}
                                                        style={{
                                                            width: 32,
                                                            height: 32,
                                                            borderRadius: '50%',
                                                            backgroundColor: color.color || '#ccc',
                                                            cursor: 'pointer',
                                                            border: isSelected ? '3px solid #333' : '2px solid #ddd',
                                                            transition: 'all 0.2s'
                                                        }}
                                                    />
                                                );
                                            })}
                                            <ActionIcon
                                                variant="outline"
                                                size={32}
                                                style={{ borderRadius: '50%' }}
                                            >
                                                <IconPlus size={16} />
                                            </ActionIcon>
                                        </Group>
                                        {errors.color_ids && (
                                            <Text size="xs" color="red" mt="xs">{errors.color_ids}</Text>
                                        )}
                                    </Box>

                                    {/* Sizes */}
                                    <Box>
                                        <Text size="sm" weight={500} mb="xs">Sizes</Text>
                                        <Group spacing="sm">
                                            {sizeOptions.map((size) => {
                                                const isSelected = data.size_ids.includes(parseInt(size.value));
                                                return (
                                                    <Button
                                                        key={size.value}
                                                        variant={isSelected ? 'filled' : 'outline'}
                                                        color={isSelected ? 'blue' : 'gray'}
                                                        size="sm"
                                                        onClick={() => {
                                                            const sizeId = parseInt(size.value);
                                                            const newSizes = isSelected
                                                                ? data.size_ids.filter(id => id !== sizeId)
                                                                : [...data.size_ids, sizeId];
                                                            setData('size_ids', newSizes);
                                                        }}
                                                        style={{
                                                            minWidth: 40,
                                                            height: 40,
                                                            borderRadius: '8px'
                                                        }}
                                                    >
                                                        {size.label}
                                                    </Button>
                                                );
                                            })}
                                        </Group>
                                        {errors.size_ids && (
                                            <Text size="xs" color="red" mt="xs">{errors.size_ids}</Text>
                                        )}
                                    </Box>
                                </Stack>
                            </Grid.Col>
                        </Grid>

                        {/* Submit Button */}
                        <Flex justify="center" mt="xl" mb="xl">
                            <Button
                                type="submit"
                                size="lg"
                                loading={processing}
                                disabled={processing || Object.keys(errors).length > 0}
                                style={{
                                    backgroundColor: '#2C3E50',
                                    color: 'white',
                                    borderRadius: '8px',
                                    minWidth: 200,
                                    height: 48
                                }}
                            >
                                {processing ? 'Adding Product...' : 'Add Product'}
                            </Button>
                        </Flex>
                    </form>
                </Container>
            </Paper>
        </Container>
    );
}

export default AddProduct;
