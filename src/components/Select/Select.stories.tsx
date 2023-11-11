import { BeakerIcon } from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';

import Select from './Select';

const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
    isInvalid: {
      control: {
        type: 'boolean',
      },
    },
    isReadonly: {
      control: {
        type: 'boolean',
      },
    },
    isRequired: {
      control: {
        type: 'boolean',
      },
    },
    LeftAddon: {
      control: {
        type: 'text',
      },
    },
    name: {
      control: {
        type: 'text',
      },
    },
    value: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  args: {
    LeftAddon: <BeakerIcon className="h-4 w-4"></BeakerIcon>,
  },
  render: (args) => (
    <Select {...args}>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Select>
  ),
};

export const WithLeftAddon: Story = {
  args: {
    LeftAddon: <BeakerIcon className="h-4 w-4"></BeakerIcon>,
  },
  render: (args) => (
    <Select {...args}>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Select>
  ),
};
