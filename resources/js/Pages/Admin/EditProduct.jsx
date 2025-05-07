import React from "react";
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
} from "@mantine/core";
import { notifications } from '@mantine/notifications';

function EditProduct({ product, categories, colors, sizes, genders }) {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || null,
        quantity: product.quantity || null,
        gender_id: product.gender_id?.toString() || null,
        category_ids: product.categories?.map(c => c.id) || [],
        color_ids: product.colors?.map(c => c.id) || [],
        size_ids: product.sizes?.map(s => s.id) || [],
        image: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);
        formData.append('gender_id', data.gender_id);
        formData.append('_method', 'put');

        if (data.image) {
            formData.append('image', data.image);
        }

        data.category_ids.forEach(id => formData.append('category_ids[]', id));
        data.color_ids.forEach(id => formData.append('color_ids[]', id));
        data.size_ids.forEach(id => formData.append('size_ids[]', id));

        post(`/products/${product.id}`, formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                notifications.show({
                    title: 'Success',
                    message: 'Product updated successfully',
                    color: 'green',
                });
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
        <Paper p="md" shadow="sm" pos="relative">
            <LoadingOverlay visible={processing} blur={2} />
            <form onSubmit={handleSubmit}>
                <Stack spacing="md">
                    <TextInput
                        required
                        label="Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                        disabled={processing}
                        description="Product name must be unique"
                    />

                    <Textarea
                        required
                        label="Description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        error={errors.description}
                        minRows={3}
                        description="Minimum 10 characters"
                    />

                    <Group grow>
                        <NumberInput
                            required
                            label="Price"
                            value={data.price}
                            onChange={(value) => setData("price", value)}
                            error={errors.price}
                            precision={2}
                            min={0}
                            description="Must be greater than 0"
                        />

                        <NumberInput
                            required
                            label="Quantity"
                            value={data.quantity}
                            onChange={(value) => setData("quantity", value)}
                            error={errors.quantity}
                            min={0}
                            description="Must be greater than 0"
                        />
                    </Group>

                    <Select
                        required
                        label="Gender"
                        data={genderOptions}
                        value={data.gender_id}
                        onChange={(value) => setData("gender_id", value)}
                        error={errors.gender_id}
                        placeholder="Select gender"
                        description="Required field"
                    />

                    <MultiSelect
                        required
                        label="Categories"
                        data={categoryOptions}
                        value={data.category_ids.map(String)}
                        onChange={(value) => setData("category_ids", value.map(Number))}
                        error={errors.category_ids}
                        placeholder="Select categories"
                        description="Select at least one category"
                    />

                    <MultiSelect
                        required
                        label="Sizes"
                        data={sizeOptions}
                        value={data.size_ids.map(String)}
                        onChange={(value) => setData("size_ids", value.map(Number))}
                        error={errors.size_ids}
                        placeholder="Select sizes"
                        description="Select at least one size"
                    />

                    <MultiSelect
                        required
                        label="Colors"
                        data={colorOptions}
                        value={data.color_ids.map(String)}
                        onChange={(value) => setData("color_ids", value.map(Number))}
                        error={errors.color_ids}
                        placeholder="Select colors"
                        description="Select at least one color"
                    />
                    <img src={`http://localhost:8000/storage/${product.image}`}  />
                    <FileInput
                        label="Product Image"
                        onChange={(file) => setData("image", file)}
                        error={errors.image}
                        placeholder="Upload image"
                        accept="image/*"
                        description="Accepted formats: .jpg, .png, .jpeg"
                    />

                    <Button
                        type="submit"
                        color="blue"
                        loading={processing}
                    >
                        Update Product
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}

export default EditProduct;


