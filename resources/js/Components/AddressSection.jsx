import React from 'react';
import { Group, Button, Text } from "@mantine/core";
import AddressModal from './AddressModal';

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
          <Group position="apart" mb="xs">
            <Text weight={500}>Delivery Address</Text>
            <Button
              variant="subtle"
              size="sm"
              onClick={() => {
                setEditingAddress(selectedAddress);
                setAddressModalOpened(true);
              }}
            >
              Edit
            </Button>
          </Group>
          <Text size="sm">
            {selectedAddress.street}, {selectedAddress.barangay},
            {selectedAddress.city}, {selectedAddress.province},
            {selectedAddress.country}, {selectedAddress.zip_code}
          </Text>
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
