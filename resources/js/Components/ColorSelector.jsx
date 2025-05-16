import { Text, Group, ActionIcon } from "@mantine/core";

const ColorSelector = ({ colors, selectedColor, setSelectedColor }) => (
  <div>
    <Text weight={500} mb="xs">Color</Text>
    <Group spacing="xs">
      {colors.map((color) => (
        <ActionIcon
          key={color.id}
          size="xl"
          variant={selectedColor === color.id ? "filled" : "light"}
          style={{
            backgroundColor: color.hex_code,
            border: selectedColor === color.id
              ? "2px solid blue"
              : "1px solid #ddd"
          }}
          onClick={() => setSelectedColor(color.id)}
        />
      ))}
    </Group>
  </div>
);

export default ColorSelector;
