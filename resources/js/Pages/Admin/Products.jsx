import { Table, MantineProvider, Grid, Button } from '@mantine/core';
import AdminHeader from "../../Components/AdminHeader.jsx";


const elements = [
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png', name: 'SnuggleSoft', description: "Explore a wide range of stylish and comfortable pants for every occasion. Find the perfect fit and style for your wardrobe.", category: 'Pajamas   ', quantity: 50, price: 759
    },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png', name: 'SnuggleSoft', description: "Explore a wide range of stylish and comfortable pants for every occasion. Find the perfect fit and style for your wardrobe.", category: 'Pajamas   ', quantity: 50, price: 759
    }, { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png', name: 'SnuggleSoft', description: "Explore a wide range of stylish and comfortable pants for every occasion. Find the perfect fit and style for your wardrobe.", category: 'Pajamas   ', quantity: 50, price: 759
    },

    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png', name: 'SnuggleSoft', description: "Explore a wide range of stylish and comfortable pants for every occasion. Find the perfect fit and style for your wardrobe.", category: 'Pajamas   ', quantity: 50, price: 759
    },

    {
        avatar:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png', name: 'SnuggleSoft', description: "Explore a wide range of stylish and comfortable pants for every occasion. Find the perfect fit and style for your wardrobe.", category: 'Pajamas   ', quantity: 50, price: 759
    },
];

function Products() {
    const rows = elements.map((element) => (
        <Table.Tr key={element.image}>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.description}</Table.Td>
            <Table.Td>{element.category}</Table.Td>
            <Table.Td>{element.quantity}</Table.Td>
            <Table.Td>{element.price}</Table.Td>

        </Table.Tr>
    ));

    const ths = (
        <Table.Tr>
            {/* <Table.Th>Image</Table.Th> */}
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Quantity</Table.Th>
            <Table.Th>Price</Table.Th>
        </Table.Tr>
    );

    return (
        <MantineProvider>
            <AdminHeader />

            <Grid>
                <Grid.Col span={2}><h1>Analytics</h1>
                </Grid.Col>
                <Grid.Col span={2} offset={5}><Button>Add Product </Button></Grid.Col>
            </Grid>

            <Table captionSide="bottom">
                <Table.Caption>Some elements from periodic table</Table.Caption>
                <Table.Thead>{ths}</Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
                {/* <Table.Tfoot>{ths}</Table.Tfoot> */}
            </Table>
        </MantineProvider>

    );
}

export default Products;