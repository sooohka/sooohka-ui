import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown, DropdownList, DropdownListItem, DropdownListItemGroup, DropdownTrigger } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Basic: Story = {
  args: {},
  render: (args) => (
    <Dropdown {...args}>
      <DropdownTrigger>trigger</DropdownTrigger>
      <DropdownList>
        <DropdownListItem>item</DropdownListItem>
        <DropdownListItem>item1</DropdownListItem>
        <DropdownListItem>item2</DropdownListItem>
      </DropdownList>
    </Dropdown>
  ),
};

// export const WithGroup: Story = {
//   args: {},
//   render: (args) => (
//     <Dropdown {...args}>
//       <DropdownTrigger>trigger</DropdownTrigger>
//       <DropdownList>
//         <DropdownListItemGroup>
//           <DropdownListItem>item</DropdownListItem>
//           <DropdownListItem>item1</DropdownListItem>
//           <DropdownListItem>item2</DropdownListItem>
//         </DropdownListItemGroup>
//         <DropdownListItemGroup>
//           <DropdownListItem>item</DropdownListItem>
//           <DropdownListItem>item1</DropdownListItem>
//           <DropdownListItem>item2</DropdownListItem>
//         </DropdownListItemGroup>
//       </DropdownList>
//     </Dropdown>
//   ),
// };
