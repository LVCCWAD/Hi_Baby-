import React from 'react';
import { Modal, Button, List, Text } from '@mantine/core';

function NotificationModal({ opened, onClose }) {
  const notifications = [
    {
      title: 'Package Delivered',
      description: 'Your package JT000000002554825282 was delivered.',
      time: '1hr',
    },
    {
      title: 'Your COD package is out for delivery',
      description: 'Be ready to pay ₱3,000.00 to receive parcel JT000000002554825282 delivered by J&T Express.',
      time: '3hr',
    },
    {
      title: 'Order placed',
      description: 'Your order JT000000002554825282 was submitted. Thanks for shopping with Hi, Baby!',
      time: '1d',
    },
    {
      title: 'Order shipped',
      description: 'Your package JT00001268746863 was shipped and will be delivered by J&T Express.',
      time: '2d',
    },
    {
      title: 'Review your order',
      description: 'Enjoying your recent purchase? Share your thoughts to help other shoppers.',
      time: '4d',
    },
  ];

  return (
    <Modal opened={opened} onClose={onClose} title="Notifications">
      <List spacing="sm">
        {notifications.map((notification, index) => (
          <List.Item key={index}>
            <Text weight={500}>{notification.title}</Text>
            <Text size="sm">{notification.description}</Text>
            <Text size="xs" color="gray">{notification.time}</Text>
          </List.Item>
        ))}
      </List>
      <Button fullWidth mt="md" onClick={onClose}>
        Mark all as read
      </Button>
    </Modal>
  );
}

export default NotificationModal;
