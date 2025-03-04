import type { Meta, StoryObj } from '@storybook/react';
import { Portal } from './Portal';

const meta: Meta<typeof Portal> = {
  title: 'Components/Portal',
  component: Portal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Portal>;

export const Default: Story = {
  args: {
    children: 'Portal Content',
  },
};
