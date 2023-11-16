import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Sm: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <Card
      {...args}
      headerContent={'hello'}
      bodyContent={
        <ul>
          <li>Sunt ullamco commodo duis proident elit.</li>
          <li>Sunt ullamco commodo duis proident elit.</li>
          <li>Sunt ullamco commodo duis proident elit.</li>
        </ul>
      }
      footerContent={
        <>
          <Button>Cancel</Button>
          <Button>Submit</Button>
        </>
      }
    ></Card>
  ),
};

export const Md: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Card
      {...args}
      headerContent={'hello'}
      bodyContent={
        <ul>
          <li>Sunt ullamco commodo duis proident elit.</li>
          <li>Sunt ullamco commodo duis proident elit.</li>
          <li>Sunt ullamco commodo duis proident elit.</li>
        </ul>
      }
      footerContent={
        <>
          <Button>Cancel</Button>
          <Button>Submit</Button>
        </>
      }
    ></Card>
  ),
};
