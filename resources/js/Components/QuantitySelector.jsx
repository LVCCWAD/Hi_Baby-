import { Group, ActionIcon, Text, Box } from "@mantine/core";

const QuantitySelector = ({ quantity, setQuantity }) => (
  <div>
    <Text weight={600} mb="sm" size="md" color="#333">Quantity</Text>
    <Group spacing={0} style={{ width: "fit-content" }}>
      <ActionIcon
        variant="outline"
        size="lg"
        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
        style={{
          borderColor: "#ddd",
          borderRadius: "8px 0 0 8px",
          backgroundColor: "#f8f9fa",
          color: "#333",
          width: "40px",
          height: "40px"
        }}
      >
        −
      </ActionIcon>
      <Box
        style={{
          width: "60px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ddd",
          borderLeft: "none",
          borderRight: "none",
          backgroundColor: "white",
          fontSize: "16px",
          fontWeight: 500
        }}
      >
        {quantity}
      </Box>
      <ActionIcon
        variant="outline"
        size="lg"
        onClick={() => setQuantity(prev => prev + 1)}
        style={{
          borderColor: "#ddd",
          borderRadius: "0 8px 8px 0",
          backgroundColor: "#f8f9fa",
          color: "#333",
          width: "40px",
          height: "40px"
        }}
      >
        +
      </ActionIcon>
    </Group>
  </div>
);

export default QuantitySelector;
