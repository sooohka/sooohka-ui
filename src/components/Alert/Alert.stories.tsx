import type { Meta, StoryObj } from '@storybook/react';

import Alert from './Alert';

const meta: Meta<typeof Alert> = {
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
    description: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Basic: Story = {
  args: {
    title: 'Lorem ipsum dolor sit amet',
    description: 'Pariatur consequat Lorem sunt aliqua commodo reprehenderit.',
  },
  render: (args) => <Alert {...args} />,
};
