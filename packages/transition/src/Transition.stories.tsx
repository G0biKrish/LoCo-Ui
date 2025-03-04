import type { Meta, StoryObj } from '@storybook/react';
import { Transition } from './Transition';

const meta: Meta<typeof Transition> = {
  title: 'Components/Transition',
  component: Transition,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Transition>;

export const Default: Story = {
  args: {
    children: 'Transition Content',
  },
};
