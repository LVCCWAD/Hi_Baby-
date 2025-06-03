import React from "react";
import { Modal, Button, List, Text, ScrollArea, rem } from "@mantine/core";
import { Inertia } from "@inertiajs/inertia";

function NotificationModal({ opened, onClose, notifications }) {
  return (
    <Modal opened={opened} onClose={onClose} title="Notifications" size="md">
      {notifications.length === 0 ? (
        <Text align="center" color="dimmed" mt="md">
          No new notifications
        </Text>
      ) : (
        <ScrollArea style={{ height: rem(300) }} type="auto" offsetScrollbars>
          <List spacing="sm">
            {notifications.map((notification) => (
              <List.Item key={notification.id}>
                <Text fw={notification.read_at ? 400 : 700}>
                  {notification.title}
                </Text>
                <Text size="sm">{notification.description}</Text>
                <Text size="xs" c="gray">
                  {notification.time}
                </Text>
              </List.Item>
            ))}
          </List>
        </ScrollArea>
      )}

      
    </Modal>
  );
}

export default NotificationModal;
