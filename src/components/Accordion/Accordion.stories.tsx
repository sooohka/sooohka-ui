import type { Meta, StoryObj } from '@storybook/react';

import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: {
        type: 'object',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'cillum',
        panel: 'Pariatur consequat Lorem sunt aliqua commodo reprehenderit.',
        disabled: false,
      },
      {
        id: '2',
        title: 'cillum',
        panel: 'Pariatur consequat Lorem sunt aliqua commodo reprehenderit.',
        disabled: false,
      },
      {
        id: '3',
        title: 'cillum',
        panel: 'Pariatur consequat Lorem sunt aliqua commodo reprehenderit.',
        disabled: false,
      },
    ],
    collapsible: true,
  },
  render: (args) => <Accordion {...args} />,
};
