import {
    Table,
    MantineProvider,
    Modal,
    Flex,
    Button,
    Image,
    Box,
    Text,
    Badge,
    Group,
    Rating,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

import classes from "../../../css/Components/AdminProducts.module.css";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons-react";

function Products({ products = [] }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const confirmDelete = (id) => {
        setSelectedProduct(id);
        open();
    };

    const handleDelete = () => {
        router.delete(`/products/${selectedProduct}`, {
            onSuccess: () => {
                showNotification({
                    title: "Deleted",
                    message: "Product has been deleted successfully.",
                    color: "green",
                    icon: <IconCheck />,
                });
                close();
            },
            onError: () => {
                showNotification({
                    title: "Error",
                    message: "Failed to delete product.",
                    color: "red",
                });
                close();
            },
        });
    };

    const rows = products.map((product) => (
        <Table.Tr key={product.id}>
            <Table.Td>
                <Image
                    src={`/storage/${product.image}`}
                    width={60}
                    height={60}
                    alt={product.name}
                    style={{
                        maxWidth: "60px",
                        maxHeight: "60px",
                        objectFit: "contain",
                    }}
                />
            </Table.Td>
            <Table.Td>
                <Text fw={600} size="sm">
                    {product.name}
                </Text>
            </Table.Td>
            <Table.Td className={classes.description}>
                <Text size="sm" color="dimmed" lineClamp={2}>
                    {product.description}
                </Text>
            </Table.Td>
            <Table.Td>
                <Badge
                    color={
                        product.gender?.name?.toLowerCase() === "boys"
                            ? "blue"
                            : product.gender?.name?.toLowerCase() === "girls"
                            ? "pink"
                            : "gray"
                    }
                    variant="light"
                    size="sm"
                >
                    {product.gender?.name || "N/A"}
                </Badge>
            </Table.Td>

            <Table.Td>
                {product.categories?.length > 0 ? (
                    product.categories.map((category, idx) => (
                        <Badge
                            key={idx}
                            color="blue"
                            variant="light"
                            size="sm"
                            mr={5}
                            mb={5}
                        >
                            {category.name}
                        </Badge>
                    ))
                ) : (
                    <Text size="sm" color="dimmed">
                        N/A
                    </Text>
                )}
            </Table.Td>
            <Table.Td>
                {product.sizes?.length > 0 ? (
                    product.sizes.map((size, idx) => (
                        <Badge
                            key={idx}
                            color="gray"
                            variant="light"
                            size="sm"
                            mr={5}
                            mb={5}
                        >
                            {size.name}
                        </Badge>
                    ))
                ) : (
                    <Text size="sm" color="dimmed">
                        N/A
                    </Text>
                )}
            </Table.Td>
            <Table.Td>
                <Group spacing={5}>
                    {product.colors?.length > 0 ? (
                        product.colors.map((color, idx) => (
                            <Group spacing={3} key={idx}>
                                <Text size="xs">{color.name}</Text>
                                <div
                                    style={{
                                        width: 14,
                                        height: 14,
                                        backgroundColor: color.hex_code,
                                        borderRadius: "50%",
                                        border: "1px solid #ddd",
                                    }}
                                />
                            </Group>
                        ))
                    ) : (
                        <Text size="sm" color="dimmed">
                            N/A
                        </Text>
                    )}
                </Group>
            </Table.Td>
            <Table.Td>
                <Text fw={500}>{product.quantity}</Text>
            </Table.Td>
            <Table.Td>
                <Text fw={500}>${product.price}</Text>
            </Table.Td>
            <Table.Td>
                {product.reviews?.length > 0 ? (
                    <>
                        <Rating
                            value={
                                product.reviews.reduce(
                                    (sum, review) => sum + review.rating,
                                    0
                                ) / product.reviews.length
                            }
                            fractions={2}
                            readOnly
                            size="sm"
                        />
                        <Text size="xs" color="dimmed" mt={4}>
                            ({product.reviews.length} reviews)
                        </Text>
                    </>
                ) : (
                    <Text size="sm" color="dimmed">
                        No reviews
                    </Text>
                )}
            </Table.Td>

            <Table.Td>
                <a
                    href={`/products/${product.id}/edit`}
                    style={{ cursor: "pointer" }}
                >
                    <IconPencil size={20} stroke={2} color="#228be6" />{" "}
                    {/* Mantine blue */}
                </a>
            </Table.Td>
            <Table.Td>
                <a
                    onClick={() => confirmDelete(product.id)}
                    style={{ cursor: "pointer" }}
                >
                    <IconTrash size={20} stroke={2} color="#fa5252" />{" "}
                    {/* Mantine red */}
                </a>
            </Table.Td>
        </Table.Tr>
    ));

    const ths = (
        <Table.Tr>
            <Table.Th>Image</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Gender</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Size</Table.Th>
            <Table.Th>Color</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Reviews</Table.Th>
        </Table.Tr>
    );

    return (
        <div
            style={{
                backgroundColor: "#f9f5eb",
                minHeight: "100vh",
                padding: "2rem",
            }}
        >
            <MantineProvider>
                <Flex justify="space-between" align="center" mb="md">
                    <Box className={classes.title}>
                        <p style={{ fontFamily: "WendyOne", fontSize: "50px" }}>
                            Products
                        </p>
                    </Box>

                    <Button
                        component="a"
                        href="/add-product"
                        variant="outline"
                        bg="#BAB86C"
                        radius={15}
                        color="#FBF2E9"
                        style={{ fontWeight: 600 }}
                    >
                        <p>Add Product</p>
                    </Button>
                </Flex>

                <Table striped highlightOnHover withColumnBorders>
                    <Table.Thead>{ths}</Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>

                <Modal
                    opened={opened}
                    onClose={close}
                    title="Confirm Deletion"
                    centered
                >
                    <Text size="md" fw={500}>
                        Are you sure you want to delete this product?
                    </Text>
                    <Flex justify="flex-end" gap="md" mt="md">
                        <Button variant="default" onClick={close}>
                            Cancel
                        </Button>
                        <Button color="red" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Flex>
                </Modal>
            </MantineProvider>
        </div>
    );
}

export default Products;
