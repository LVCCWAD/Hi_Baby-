import {
    Table,
    MantineProvider,
    Grid,
    Flex,
    Button,
    Image,
    Box,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { router } from "@inertiajs/react";

import classes from "../../../css/Components/AdminProducts.module.css";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons-react"; // Optional icon

function Products({ products = [] }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            router.delete(`/products/${id}`, {
                onSuccess: () => {
                    showNotification({
                        title: "Deleted",
                        message: "Product has been deleted successfully.",
                        color: "green",
                        icon: <IconCheck />,
                    });
                },
                onError: () => {
                    showNotification({
                        title: "Error",
                        message: "Failed to delete product.",
                        color: "red",
                    });
                },
            });
        }
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
            <Table.Td>{product.name}</Table.Td>
            <Table.Td className={classes.description}>
                {product.description}
            </Table.Td>
            <Table.Td>{product.gender?.name || "N/A"}</Table.Td>
            <Table.Td>
                {product.categories && product.categories.length > 0
                    ? product.categories.map((category, idx) => (
                          <div
                              key={idx}
                              className="mr-1 inline-block bg-blue-100 px-2 py-1 rounded"
                          >
                              {category.name}
                          </div>
                      ))
                    : "N/A"}
            </Table.Td>
            <Table.Td>
                {product.sizes && product.sizes.length > 0
                    ? product.sizes.map((size, idx) => (
                          <div
                              key={idx}
                              className="mr-1 inline-block bg-gray-200 px-2 py-1 rounded"
                          >
                              {size.name}
                          </div>
                      ))
                    : "N/A"}
            </Table.Td>

            <Table.Td>
                <div className="flex flex-wrap gap-2">
                    {product.colors && product.colors.length > 0
                        ? product.colors.map((color, idx) => (
                              <div
                                  key={idx}
                                  className="flex items-center gap-2"
                              >
                                  <span>{color.name}</span>
                                  <div
                                      style={{
                                          width: 16,
                                          height: 16,
                                          backgroundColor: color.hex_code,
                                          borderRadius: "50%",
                                      }}
                                  />
                              </div>
                          ))
                        : "N/A"}
                </div>
            </Table.Td>

            <Table.Td>{product.quantity}</Table.Td>
            <Table.Td>${product.price}</Table.Td>
            <Table.Td>
                {product.reviews && product.reviews.length > 0 ? (
                    <>
                        <div>
                            Avg:{" "}
                            {(
                                product.reviews.reduce(
                                    (sum, review) => sum + review.rating,
                                    0
                                ) / product.reviews.length
                            ).toFixed(1)}{" "}
                            / 5
                        </div>
                        <div>{product.reviews.length} reviews</div>
                    </>
                ) : (
                    "No reviews"
                )}
            </Table.Td>

            <Table.Td>
                <a href={`/products/${product.id}/edit`} color="teal">
                    <IconPencil size={16} stroke={1.5} color="black" />
                </a>
            </Table.Td>
            <Table.Td>
                <a onClick={() => handleDelete(product.id)} color="red">
                    <IconTrash size={16} stroke={1.5} color="black" />
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
                    >
                        <p>Add Product</p>
                    </Button>
                </Flex>
                <Table captionSide="bottom">
                    {/* <Table.Caption>Some elements from periodic table</Table.Caption> */}
                    <Table.Thead>{ths}</Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                    {/* <Table.Tfoot>{ths}</Table.Tfoot> */}
                </Table>
            </MantineProvider>
        </div>
    );
}

export default Products;
