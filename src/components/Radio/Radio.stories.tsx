import type { Meta, StoryObj } from '@storybook/react';

import { Radio } from '@/components';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    colorScheme: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    isDisabled: {
      control: { type: 'boolean' },
    },
    isInvalid: {
      control: { type: 'boolean' },
    },
    isReadonly: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    colorScheme: 'primary',
    size: 'md',
  },
  render: (args) => <Radio {...args}>{'hello'}</Radio>,
};
