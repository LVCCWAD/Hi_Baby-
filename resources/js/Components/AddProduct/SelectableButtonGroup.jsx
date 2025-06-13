import React from "react";
import { Box, Text, Group, Button } from "@mantine/core";


function SelectableButtonGroup({
  label,
  options,
  selectedValues,
  single = false,
  onChange,
  error,
}) {
  const handleSelect = (value) => {
    const intValue = parseInt(value);

    if (single) {
      onChange(intValue);
    } else {
      const updated = selectedValues.includes(intValue)
        ? selectedValues.filter((v) => v !== intValue)
        : [...selectedValues, intValue];

      onChange(updated);
    }
  };

  return (
    <Box>
      <Text size="md" fw={600} mb="xs">{label}</Text>
      <Group spacing="sm">
        {options.map((option) => {
          const id = parseInt(option.value);
          const isSelected = single ? selectedValues === id : selectedValues.includes(id);

          return (
            <Button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              style={{
                backgroundColor: isSelected ? "#3B3B3B" : "#FFFFFF",
                color: isSelected ? "#FFFFFF" : "#3B3B3B",
                border: "2px solid #BAB86C",
                borderRadius: "8px",
                minWidth: 80,
                height: 40,
              }}
              variant="light"
            >
              {option.label}
            </Button>
          );
        })}
      </Group>
      {error && (
        <Text size="xs" color="red" mt="xs">{error}</Text>
      )}
    </Box>
  );
}

export default SelectableButtonGroup;
