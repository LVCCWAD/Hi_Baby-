import React from "react";
import { Box, Text, Group, FileInput, Image, ActionIcon, rem } from "@mantine/core";
import { IconX, IconUpload } from "@tabler/icons-react";

const ImageUploader = ({ handleImageUpload, imagePreview, removeImage, error }) => {
  return (
    <Box>
      <Text size="md" fw={600} mb="xs">Product Image</Text>

      <Group spacing="lg" align="center">
        <Box style={{ width: 220 }}>
          <FileInput
            onChange={handleImageUpload}
            accept="image/*"
            placeholder="Click to add image"
            icon={<IconUpload size={20} />}
            radius="md"
            size="lg"
            styles={{
              input: {
                border: "2px dashed #ccc",
                padding: "40px 20px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#fafafa",
                transition: "border-color 0.3s",
              },
              icon: { marginBottom: 10 }
            }}
          />
        </Box>

        {imagePreview && (
          <Box
            style={{
              position: "relative",
              width: 120,
              height: 120,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            <Image
              src={imagePreview}
              alt="Preview"
              width="100%"
              height="100%"
              fit="cover"
            />
            <ActionIcon
              variant="filled"
              color="red"
              size="sm"
              style={{
                position: "absolute",
                top: rem(-8),
                right: rem(-8),
                boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
              onClick={removeImage}
            >
              <IconX size={12} />
            </ActionIcon>
          </Box>
        )}
      </Group>

      {error && (
        <Text size="xs" color="red" mt="xs">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default ImageUploader;
