import React from "react";
import {
  Container,
  Title,
  Table,
  Badge,
  Text,
  Center,
  Divider,
} from "@mantine/core";

function Orders({ orders = [] }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "shipped":
        return "#b5bd6a";
      case "paid":
        return "#b5bd6a";
      case "delivered":
        return "#b5bd6a";
      case "pending":
        return "#b5bd6a";
      default:
        return "#b5bd6a";
    }
  };

  const getStatusStyles = (status) => {
    return {
      border: "1px solid #b5bd6a",
      color: "#a69c3a",
      fontWeight: 600,
      backgroundColor: "transparent",
      padding: "4px 16px",
    };
  };

  const rows = orders.map((order) => (
    <React.Fragment key={order.id}>
      <tr>
        <td style={{ fontWeight: "bold", paddingTop: "20px", paddingBottom: "20px" }}>
          {String(order.id).padStart(5, "0")}
        </td>
        <td style={{ paddingTop: "20px", paddingBottom: "20px" }}>{order.user?.name || "N/A"}</td>
        <td style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          {order.address}
        </td>
        <td style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Badge
            variant="outline"
            radius="xl"
            size="lg"
            style={getStatusStyles(order.status)}
          >
            {order.status?.toUpperCase()}
          </Badge>
        </td>
      </tr>
      <tr>
        <td colSpan={4} style={{ padding: 0 }}>
          <Divider color="#e0dbc3" style={{ margin: 0 }} />
        </td>
      </tr>
    </React.Fragment>
  ));

  return (
    <div style={{ backgroundColor: "#f9f5eb", minHeight: "100vh", padding: "2rem" }}>

    <Container size="lg" mt="xl" style={{ backgroundColor: "#f9f5eb", padding: "2rem", borderRadius: "8px" }}>
      <Title
        order={2}
        mb="xl"
        align="left"
        style={{
          color: "#b5bd6a",
          fontWeight: 800,
          fontFamily: "WendyOne" ,
          fontSize: "32px",
          marginBottom: "30px"
        }}
      >
        Orders
      </Title>

      {orders.length === 0 ? (
        <Center>
          <Text>No orders found.</Text>
        </Center>
      ) : (
        <Table
          horizontalSpacing="xl"
          fontSize="md"
          style={{
            backgroundColor: "transparent",
            borderCollapse: "separate",
            borderSpacing: "0",
            fontFamily: "Arial, sans-serif",
            width: "100%"
          }}
        >
          <thead>
            <tr>
              <th style={{ fontWeight: 700, textAlign: "left", borderBottom: "1px solid #e0dbc3", paddingBottom: "10px" }}>ID</th>
              <th style={{ fontWeight: 700, textAlign: "left", borderBottom: "1px solid #e0dbc3", paddingBottom: "10px" }}>NAME</th>
              <th style={{ fontWeight: 700, textAlign: "left", borderBottom: "1px solid #e0dbc3", paddingBottom: "10px" }}>ADDRESS</th>
              <th style={{ fontWeight: 700, textAlign: "left", borderBottom: "1px solid #e0dbc3", paddingBottom: "10px" }}>STATUS</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      )}
    </Container>
    </div>
  );
}

export default Orders;
