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

function AddProduct({ categories = [], colors = [], sizes = [], genders = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        price: null,  // Changed from "" to null
        quantity: null,  // Changed from "" to null
        image: null,
        gender_id: null,  // Changed from "" to null
        category_ids: [],
        color_ids: [],
        size_ids: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);
        formData.append('gender_id', data.gender_id);
        formData.append('image', data.image);

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
        <Paper p="md" shadow="sm" pos="relative" bg="#FBF2E9">
            <p style={{fontFamily: 'WendyOne', fontSize:'50px', color: '#BAB86C' }} >Product</p>
            <LoadingOverlay visible={processing} blur={2} />
            <form onSubmit={handleSubmit} style={{marginLeft:'10%', marginRight:'10%', marginBottom:'10%', marginTop:'3%'}}>
                <Stack spacing="md" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                    }}>
                    <div style={{width:'320px'}}>
                    <TextInput
                        required
                        label="Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        error={errors.name}
                        disabled={processing}
                        description="Product name must be unique"
                    />

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
                    <Textarea
                        required
                        label="Description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        error={errors.description}
                        minRows={3}
                        description="Minimum 10 characters"
                    />
                    </div>
                
                    <div
                    style={{width:'320px'}}
                    >
                    <NumberInput
                            required
                            label="Available quantity"
                            value={data.quantity}
                            onChange={(value) => setData("quantity", value)}
                            error={errors.quantity}
                            min={0}
                            description="Must be greater than 0"
                        />

                    <FileInput
                        required
                        label="Product Image"
                        onChange={(file) => setData("image", file)}
                        error={errors.image}
                        placeholder="Upload image"
                        accept="image/*"
                        description="Accepted formats: .jpg, .png, .jpeg"
                    />

                    

                    <MultiSelect
                        required
                        label="Color"
                        data={colorOptions}
                        value={data.color_ids.map(String)}
                        onChange={(value) => setData("color_ids", value.map(Number))}
                        error={errors.color_ids}
                        placeholder="Select colors"
                        description="Select at least one color"
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
                    </div>

                    
                </Stack>
                <Button
                    type="submit"
                    color="blue"
                    loading={processing}
                    style={{width:'320px'}}
                    disabled={processing || Object.keys(errors).length > 0}
                >
                    {processing ? 'Adding Product...' : 'Add Product'}
                </Button>
            </form>
        </Paper>
    );
}

export default AddProduct;
