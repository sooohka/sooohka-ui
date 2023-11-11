import type { Meta, StoryObj } from '@storybook/react';

import Textfield from './Textfield';

const meta: Meta<typeof Textfield> = {
  component: Textfield,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Textfield>;

export const Basic: Story = {
  args: {},
  render: (args) => <Textfield {...args} />,
};
