import React from "react";
import { Box, Text, Button, Image, CloseButton } from "@mantine/core";

function ImageUploader({ handleImageUpload, imagePreview, removeImage, error }) {
    return (
        <Box>
            <Text size="sm" mb="xs">Product Image</Text>

            {imagePreview ? (
                <Box
                    style={{
                        position: "relative",
                        borderRadius: "12px",
                        overflow: "hidden",
                        maxWidth: "300px",
                        maxHeight: "300px",
                        border: "1px solid #ddd",
                    }}
                >
                    <Image
                        src={imagePreview}
                        alt="Product"
                        style={{ width: "100%", height: "auto", display: "block" }}
                    />

                    <CloseButton
                        onClick={removeImage}
                        title="Remove image"
                        size="lg"
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            backgroundColor: "#fff",
                            borderRadius: "50%",
                            zIndex: 10,
                            boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                        }}
                    />
                </Box>
            ) : (
                <Button component="label" variant="outline" color="gray" radius="md">
                    Upload Image
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                    />
                </Button>
            )}

            {error && <Text color="red" size="xs" mt="xs">{error}</Text>}
        </Box>
    );
}

export default ImageUploader;
