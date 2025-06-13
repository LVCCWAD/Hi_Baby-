import React from "react";
import { Box, Text, Group, Center } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

const ColorSelector = ({ colorOptions, selectedColors, setSelectedColors, error }) => {
  const toggleColor = (colorId) => {
    const updated = selectedColors.includes(colorId)
      ? selectedColors.filter((id) => id !== colorId)
      : [...selectedColors, colorId];
    setSelectedColors(updated);
  };

  return (
    <Box>
      <Text size="md" fw={600} mb="xs">Colors</Text>
      <Group spacing="sm">
        {colorOptions.map((color) => {
          const id = parseInt(color.value);
          const isSelected = selectedColors.includes(id);
          return (
            <Box
              key={color.value}
              onClick={() => toggleColor(id)}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: color.color || "#ccc",
                cursor: "pointer",
                border: isSelected ? "3px solid #2C3E50" : "2px solid #ddd",
                boxShadow: isSelected ? "0 0 8px rgba(0,0,0,0.4)" : "none",
                position: "relative",
                transition: "all 0.2s",
              }}
            >
              {isSelected && (
                <Center
                  style={{
                    position: "absolute",
                    inset: 0,
                    color: "white",
                  }}
                >
                  <IconCheck size={18} stroke={2.5} />
                </Center>
              )}
            </Box>
          );
        })}
      </Group>
      {error && <Text size="xs" color="red" mt="xs">{error}</Text>}
    </Box>
  );
};

export default ColorSelector;
