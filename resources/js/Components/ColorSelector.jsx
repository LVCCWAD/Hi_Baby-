import { Group, Text, Box } from "@mantine/core";

const ColorSelector = ({ colors, selectedColor, setSelectedColor }) => (
  <div>
    <Text weight={600} mb="sm" size="md" color="#333">Color</Text>
    <Group spacing="sm">
      {colors.map((color) => (
        <Box
          key={color.id}
          onClick={() => setSelectedColor(color.id)}
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: color.hex_code,
            border: selectedColor === color.id
              ? "3px solid #333"
              : "2px solid #ddd",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: selectedColor === color.id
              ? "0 0 0 2px rgba(0,0,0,0.1)"
              : "none"
          }}
        />
      ))}
    </Group>
  </div>
);

export default ColorSelector;
