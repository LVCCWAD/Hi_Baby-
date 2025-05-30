import React from "react";
import { Flex, Button, Text } from "@mantine/core";
import AddressModal from "./AddressModal";

function AddressSection({
    selectedAddress,
    setAddressModalOpened,
    setEditingAddress,
    addressModalOpened,
    editingAddress,
    onAddressSubmit,
}) {
    return (
        <div>
            {selectedAddress ? (
                <div>
                    <Flex
                        direction={{ base: "column", sm: "row" }}
                        justify="space-between"
                        align={{ base: "flex-start", sm: "center" }}
                        mb="xs"
                        gap="xs"
                    >
                        <Text size="sm">
                            {selectedAddress.street}, {selectedAddress.barangay}
                            , {selectedAddress.city}, {selectedAddress.province}
                            , {selectedAddress.country},{" "}
                            {selectedAddress.zip_code}
                        </Text>

                        <Button
                            variant="subtle"
                            size="sm"
                            style={{ color: "#BAB86C" }}
                            onClick={() => {
                                setEditingAddress(selectedAddress);
                                setAddressModalOpened(true);
                            }}
                        >
                            Edit
                        </Button>
                    </Flex>
                </div>
            ) : (
                <Button
                    variant="light"
                    fullWidth
                    onClick={() => setAddressModalOpened(true)}
                >
                    Add Delivery Address
                </Button>
            )}

            <AddressModal
                opened={addressModalOpened}
                onClose={() => {
                    setAddressModalOpened(false);
                    setEditingAddress(null);
                }}
                initialValues={editingAddress}
                onSubmit={onAddressSubmit}
            />
        </div>
    );
}

export default AddressSection;
