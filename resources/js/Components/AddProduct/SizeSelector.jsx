import React from "react";
import { Box, Group, Button, Text } from "@mantine/core";

const SizeSelector = ({ sizeOptions, selectedSizes, setSelectedSizes, error }) => {
  const toggleSize = (sizeId) => {
    const updated = selectedSizes.includes(sizeId)
      ? selectedSizes.filter((id) => id !== sizeId)
      : [...selectedSizes, sizeId];
    setSelectedSizes(updated);
  };

  return (
    <Box>
      <Text size="sm" fw={500} mb="xs">Sizes</Text>
      <Group spacing="sm">
        {sizeOptions.map((size) => {
          const id = parseInt(size.value);
          const selected = selectedSizes.includes(id);
          return (
            <Button
              key={id}
              variant={selected ? "filled" : "outline"}
              color={selected ? "blue" : "gray"}
              size="sm"
              onClick={() => toggleSize(id)}
              style={{ minWidth: 40, height: 40, borderRadius: "8px" }}
            >
              {size.label}
            </Button>
          );
        })}
      </Group>
      {error && <Text size="xs" color="red" mt="xs">{error}</Text>}
    </Box>
  );
};

export default SizeSelector;
