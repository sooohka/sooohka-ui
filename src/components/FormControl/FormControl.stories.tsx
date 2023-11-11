import type { Meta, StoryObj } from '@storybook/react';

import { Textfield } from '../Textfield';
import FormControl from './FormControl';

const meta: Meta<typeof FormControl> = {
  component: FormControl,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
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
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormControl>;

export const Basic: Story = {
  args: { orientation: 'vertical', label: 'Name', isRequired: true },
  render: (args) => (
    <FormControl {...args}>{({ ...stateProps }) => <Textfield {...stateProps}></Textfield>}</FormControl>
  ),
};

export const BasicHorizontal: Story = {
  args: { orientation: 'horizontal', label: 'Name', isRequired: true },
  render: (args) => (
    <FormControl {...args}>{({ ...stateProps }) => <Textfield {...stateProps}></Textfield>}</FormControl>
  ),
};
