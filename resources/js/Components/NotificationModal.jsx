import React from "react";
import { Modal, Button, List, Text, ScrollArea, rem, Box, Group } from "@mantine/core";
import { Inertia } from "@inertiajs/inertia";

function NotificationModal({ opened, onClose, notifications }) {
  return (
    <Modal opened={opened} onClose={onClose} title="Notifications" size="md" centered>
      {notifications.length === 0 ? (
        <Text align="center" color="dimmed" mt="md">
          No new notifications
        </Text>
      ) : (
        <ScrollArea style={{ height: rem(400) }} type="auto" offsetScrollbars>
          <List spacing="sm">
            {notifications.map((notification) => (
              <Box
                key={notification.id}
                p="md"
                mb="sm"
                style={{
                  backgroundColor: "#f9f6f1",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
                }}
              >
                <Group position="apart" mb={5}>
                  <Text
                    fw={notification.read_at ? 400 : 700}
                    style={{
                      color: "#b4b74f",
                      fontSize: "16px",
                    }}
                  >
                    {notification.title}
                  </Text>
                  <Text size="xs" color="gray">
                    {notification.time}
                  </Text>
                </Group>

                <Text size="sm" mb={5}>
                  {notification.description}
                </Text>
              </Box>
            ))}
          </List>
        </ScrollArea>
      )}
    </Modal>
  );
}

export default NotificationModal;
