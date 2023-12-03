import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import Card, { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
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

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>sit</CardTitle>
        <CardDescription>Aliqua anim id occaecat et pariatur ad occaecat officia magna enim elit.</CardDescription>
      </CardHeader>
      <CardContent>
        Ullamco quis qui nisi eiusmod ipsum mollit anim ut dolor sint quis id magna. Veniam deserunt occaecat esse
        excepteur ea voluptate non nisi tempor pariatur cillum amet sunt deserunt. Elit ea culpa eu est ut ut sunt sunt
        proident. Velit ad ad cupidatat esse consequat.
      </CardContent>
      <CardFooter gap="3">
        <Button variant="outline">Cancel</Button>
        <Button variant="solid">Cancel</Button>
      </CardFooter>
    </Card>
  ),
};
