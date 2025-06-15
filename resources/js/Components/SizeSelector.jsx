import { Text, Group, Button } from "@mantine/core";

const SizeSelector = ({ sizes, selectedSize, setSelectedSize }) => (
  <div>
    <Text weight={600} mb="sm" size="md" color="#333">Sizes</Text>
    <Group spacing="sm">
      {sizes.map((size) => (
        <Button
          key={size.id}
          variant={selectedSize === size.id.toString() ? "filled" : "outline"}
          color={selectedSize === size.id.toString() ? "dark" : "gray"}
          size="md"
          onClick={() => setSelectedSize(size.id.toString())}
          style={{
            minWidth: "50px",
            height: "40px",
            borderRadius: "4px",
            fontWeight: 500,
            backgroundColor: selectedSize === size.id.toString() ? "#333" : "transparent",
            borderColor: "#ddd",
            color: selectedSize === size.id.toString() ? "white" : "#333"
          }}
        >
          {size.name}
        </Button>
      ))}
    </Group>
  </div>
);

export default SizeSelector;
