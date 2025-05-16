import { Group, Badge } from "@mantine/core";

const CategoryBadges = ({ categories }) => (
  <Group mt="md">
    {categories.map(cat => (
      <Badge key={cat.id} variant="light">{cat.name}</Badge>
    ))}
  </Group>
);

export default CategoryBadges;
