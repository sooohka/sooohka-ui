import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Sm: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => <Avatar {...args} />,
};

export const Md: Story = {
  args: {
    size: 'md',
  },
  render: (args) => <Avatar {...args} />,
};

export const Lg: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => <Avatar {...args} />,
};
