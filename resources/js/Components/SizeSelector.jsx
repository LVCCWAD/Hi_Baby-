import { Text, SegmentedControl } from "@mantine/core";

const SizeSelector = ({ sizes, selectedSize, setSelectedSize }) => (
  <div>
    <Text weight={500} mb="xs">Sizes</Text>
    <SegmentedControl
      value={selectedSize}
      onChange={setSelectedSize}
      data={sizes.map(size => ({
        label: size.name,
        value: size.id.toString(),
      }))}
    />
  </div>
);

export default SizeSelector;
