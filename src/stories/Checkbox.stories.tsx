import { BeakerIcon } from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '@/components';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Checkbox',
  component: () => <Checkbox />,
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
    isDisabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PrimarySolid: Story = {
  args: {
    colorScheme: 'primary',
    size: 'md',
  },
  render: (args) => <Checkbox {...args}>{'hello'}</Checkbox>,
};
