import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    variant: 'solid',
  },
  render: (args) => <Button {...args}>Click me</Button>,
};
