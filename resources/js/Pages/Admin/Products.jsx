import { Table, MantineProvider, Grid, Button, Image } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { router } from "@inertiajs/react";

import { IconCheck } from "@tabler/icons-react"; // Optional icon

import AdminHeader from "../../Components/AdminHeader.jsx";

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
                />
            </Table.Td>
            <Table.Td>{product.name}</Table.Td>
            <Table.Td>{product.description}</Table.Td>
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
                <Button
                    component="a"
                    href={`/products/${product.id}/edit`}
                    variant="outline"
                    color="teal"
                >
                    Edit
                </Button>
            </Table.Td>
            <Table.Td>
                <Button onClick={() => handleDelete(product.id)} color="red">
                    Delete
                </Button>
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
        </Table.Tr>
    );

    return (
        <MantineProvider>
            <AdminHeader />

            <Grid>
                <Grid.Col span={2}>
                    <h1>Products</h1>
                </Grid.Col>
                <Grid.Col span={2} offset={5}>
                    <Button component="a" href="/add-product" variant="outline">
                        Add Product{" "}
                    </Button>
                </Grid.Col>
            </Grid>

            <Table captionSide="bottom">
                {/* <Table.Caption>Some elements from periodic table</Table.Caption> */}
                <Table.Thead>{ths}</Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
                {/* <Table.Tfoot>{ths}</Table.Tfoot> */}
            </Table>
        </MantineProvider>
    );
}

export default Products;
