import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Card, CardBody, CardFooter, CardHeader } from './Card';

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
    <Card {...args}>
      <CardHeader {...args}>Hello</CardHeader>
      <CardBody {...args}>
        <ul>
          <li>Sunt ullamco commodo duis proident elit.</li>
          <li>Sunt ullamco commodo duis proident elit.</li>
          <li>Sunt ullamco commodo duis proident elit.</li>
        </ul>
      </CardBody>
      <CardFooter {...args}>
        <Button>Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  ),
};

export const Md: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Card {...args}>
      <CardHeader {...args}>Hello</CardHeader>
      <CardBody {...args}>
        <ul>
          <li>Sunt ullamco commodo duis proident elit.</li>
          <li>Sunt ullamco commodo duis proident elit.</li>
          <li>Sunt ullamco commodo duis proident elit.</li>
        </ul>
      </CardBody>
      <CardFooter {...args}>
        <Button>Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  ),
};
