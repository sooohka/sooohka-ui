import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Dropdown, DropdownList, DropdownListItem, DropdownTrigger } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    shouldCloseOnOutsideClick: {
      control: { type: 'boolean' },
    },
    shouldCloseOnSelect: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Basic: Story = {
  args: {
    shouldCloseOnOutsideClick: false,
    shouldCloseOnSelect: false,
  },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownTrigger>trigger</DropdownTrigger>
      <DropdownList>
        <DropdownListItem>
          <Button variant="ghost">item</Button>
        </DropdownListItem>
        <DropdownListItem>
          <Button variant="ghost">item2</Button>
        </DropdownListItem>
        <DropdownListItem>
          <Button variant="ghost">
            Dolor proident ex laborum veniam ipsum ad Lorem culpa sint in incididunt Lorem fugiat commodo anim.
          </Button>
        </DropdownListItem>
      </DropdownList>
    </Dropdown>
  ),
};

export const WithRenderProps: Story = {
  args: {},
  render: (args) => (
    <Dropdown {...args}>
      {({ triggerRef, onToggle }) => (
        <>
          <Button ref={triggerRef} variant="outline" onClick={onToggle}>
            open
          </Button>
          <DropdownList>
            <DropdownListItem>item</DropdownListItem>
            <DropdownListItem>item1</DropdownListItem>
            <DropdownListItem>item2</DropdownListItem>
          </DropdownList>
        </>
      )}
    </Dropdown>
  ),
};
