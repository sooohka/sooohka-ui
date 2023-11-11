import { BeakerIcon } from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';

import Textfield from './Textfield';

const meta: Meta<typeof Textfield> = {
  component: Textfield,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: {
      control: 'boolean',
    },
    isInvalid: {
      control: 'boolean',
    },
    isReadonly: {
      control: 'boolean',
    },
    isRequired: {
      control: 'boolean',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textfield>;

export const Basic: Story = {
  args: {},
  render: (args) => <Textfield {...args}>Name</Textfield>,
};

export const BasicHorizontal: Story = {
  args: {
    orientation: 'horizontal',
    isRequired: true,
  },
  render: (args) => <Textfield {...args}>Name</Textfield>,
};

export const WithLeftAddOn: Story = {
  args: {
    LeftAddon: <BeakerIcon className="w-4"></BeakerIcon>,
  },
  render: (args) => <Textfield {...args}>Name</Textfield>,
};

export const WithRightAddOn: Story = {
  args: {
    RightAddon: <BeakerIcon className="w-4"></BeakerIcon>,
  },
  render: (args) => <Textfield {...args}>Name</Textfield>,
};

export const WithBothAddOn: Story = {
  args: {
    LeftAddon: <BeakerIcon className="w-4"></BeakerIcon>,
    RightAddon: <BeakerIcon className="w-4"></BeakerIcon>,
  },
  render: (args) => <Textfield {...args}>Name</Textfield>,
};
