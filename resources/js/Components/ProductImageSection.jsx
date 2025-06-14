import { Box, Image } from "@mantine/core";

const ProductImageSection = ({ product }) => (
    <Box
        style={{
            backgroundColor: "#f5f5f0",
            borderRadius: "12px",
            padding: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "500px",
            position: "relative"
        }}
    >
        <Image
            src={product.image}
            alt={product.name}
            style={{
                maxWidth: "100%",
                maxHeight: "450px",
                objectFit: "contain",
                borderRadius: "8px",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))"
            }}
        />
    </Box>
);

export default ProductImageSection;
