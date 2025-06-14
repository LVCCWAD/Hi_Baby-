import { Paper, Text, Table } from "@mantine/core";

export default function TopSearchTerms({ searchTerms }) {
    return (
        <Paper p="md" radius="md" withBorder>
            <Text fw={500} mb="md">Top Search Terms</Text>

            {searchTerms && searchTerms.length > 0 ? (
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Search Term</Table.Th>
                            <Table.Th>Results</Table.Th>
                            <Table.Th>Uses</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {searchTerms.map((term, index) => (
                            <Table.Tr key={index}>
                                <Table.Td>{term.term}</Table.Td>
                                <Table.Td>{term.results}</Table.Td>
                                <Table.Td>{term.uses}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            ) : (
                <Text c="dimmed" ta="center" py="md">No search data available yet</Text>
            )}
        </Paper>
    );
}
