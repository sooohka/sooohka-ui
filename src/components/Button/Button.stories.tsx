import { BeakerIcon } from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components';
import { log } from '@/utils';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    colorScheme: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg', 'icon'],
      control: { type: 'select' },
    },
    variant: {
      options: ['solid', 'outline', 'ghost', 'link'],
      control: { type: 'select' },
    },
    isDisabled: {
      control: { type: 'boolean' },
    },
    LeftIcon: {
      control: { type: 'ReactNode' },
    },
    RightIcon: {
      control: { type: 'ReactNode' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimarySolid: Story = {
  args: {
    colorScheme: 'primary',
    size: 'md',
    variant: 'solid',
    LeftIcon: BeakerIcon,

    onClick: () => log('hi'),
  },
  render: (args) => <Button {...args}>{'hello'}</Button>,
};
export const PrimaryOutline: Story = {
  args: {
    colorScheme: 'primary',
    size: 'md',
    variant: 'outline',
    RightIcon: BeakerIcon,
  },
  render: (args) => <Button {...args}>{'hello'}</Button>,
};

export const PrimaryLink: Story = {
  args: {
    colorScheme: 'primary',
    size: 'md',
    variant: 'link',
  },
  render: (args) => <Button {...args}>hello</Button>,
};

export const PrimaryGhost: Story = {
  args: {
    colorScheme: 'primary',
    size: 'md',
    variant: 'ghost',
  },
  render: (args) => <Button {...args}>hello</Button>,
};

export const PrimaryIcon: Story = {
  args: {
    colorScheme: 'primary',
    size: 'icon',
    variant: 'outline',
  },
  render: (args) => (
    <Button {...args}>
      <BeakerIcon></BeakerIcon>
    </Button>
  ),
};
