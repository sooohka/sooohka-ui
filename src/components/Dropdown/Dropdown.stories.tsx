import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown.Root> = {
  component: Dropdown.Root,
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

type Story = StoryObj<typeof Dropdown.Root>;

export const Basic: Story = {
  args: {
    shouldCloseOnOutsideClick: false,
    shouldCloseOnSelect: false,
  },
  render: (args) => (
    <Dropdown.Root {...args}>
      <Dropdown.Trigger>trigger</Dropdown.Trigger>
      <Dropdown.List>
        <Dropdown.ListItem>
          <Button variant="ghost">item</Button>
        </Dropdown.ListItem>
        <Dropdown.ListItem>
          <Button variant="ghost">item2</Button>
        </Dropdown.ListItem>
        <Dropdown.ListItem>
          <Button variant="ghost">
            Dolor proident ex laborum veniam ipsum ad Lorem culpa sint in incididunt Lorem fugiat commodo anim.
          </Button>
        </Dropdown.ListItem>
      </Dropdown.List>
    </Dropdown.Root>
  ),
};

export const WithRenderProps: Story = {
  args: {},
  render: (args) => (
    <Dropdown.Root {...args}>
      {({ triggerRef, onToggle }) => (
        <>
          <Button ref={triggerRef} variant="outline" onClick={onToggle}>
            open
          </Button>
          <Dropdown.List>
            <Dropdown.ListItem>item</Dropdown.ListItem>
            <Dropdown.ListItem>item1</Dropdown.ListItem>
            <Dropdown.ListItem>item2</Dropdown.ListItem>
          </Dropdown.List>
        </>
      )}
    </Dropdown.Root>
  ),
};
