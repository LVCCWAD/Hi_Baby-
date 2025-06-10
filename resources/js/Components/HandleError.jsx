import React from 'react';
import { Alert, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const Error = ({ message }) => {
    if (!message) return null;

    return (
        <Alert
            icon={<IconAlertCircle size={16} />}
            color="red"
            variant="light"
            radius={8}
            style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                marginTop: '8px',
                marginBottom: '8px'
            }}
        >
            <Text size="sm" style={{ color: '#dc2626', fontWeight: 500 }}>
                {message}
            </Text>
        </Alert>
    );
};

export default Error;
