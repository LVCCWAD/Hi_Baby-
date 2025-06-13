import React from "react";
import { NumberInput } from "@mantine/core";

const QuantityInput = ({ value, onChange, error, disabled }) => {
  return (
    <NumberInput
      required
      label="Available quantity"
      value={value}
      onChange={onChange}
      error={error}
      min={0}
      size="md"
      disabled={disabled}
      styles={{
        input: {
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "8px",
        },
      }}
    />
  );
};

export default QuantityInput;
