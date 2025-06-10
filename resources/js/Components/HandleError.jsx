import React from 'react';
import { Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const Error = ({ message }) => {
    if (!message) return null;

    return (
        <Text
            size="sm"
            style={{
                color: '#dc2626', // Tailwind red-600
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: 6,
            }}
        >
            <IconAlertCircle size={14} />
            {message}
        </Text>
    );
};

export default Error;
