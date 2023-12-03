import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
    },
    isInvalid: {
      control: 'boolean',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    checked: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  args: {},
  render: (args) => <Checkbox {...args}>hi</Checkbox>,
};
