import { BeakerIcon } from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Button',
  component: () => <Button />,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    colorScheme: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
    size: {
      options: ['md'],
      control: { type: 'select' },
    },
    variant: {
      options: ['solid', 'outline', 'icon'],
      control: { type: 'select' },
    },
    isDisabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PrimarySolid: Story = {
  args: {
    colorScheme: 'primary',
    size: 'md',
    variant: 'solid',
  },
  render: (args) => <Button {...args}>{'hello'}</Button>,
};
export const PrimaryOutline: Story = {
  args: {
    colorScheme: 'primary',
    size: 'md',
    variant: 'outline',
  },
  render: (args) => <Button {...args}>{'hello'}</Button>,
};

export const PrimaryIcon: Story = {
  args: {
    colorScheme: 'primary',
    size: 'md',
    variant: 'icon',
  },
  render: (args) => (
    <Button {...args}>
      <BeakerIcon />
    </Button>
  ),
};
