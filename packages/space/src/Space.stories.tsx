import type { Meta, StoryObj } from '@storybook/react';
import { Space } from './Space';

const meta: Meta<typeof Space> = {
  title: 'Components/Space',
  component: Space,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Space>;

export const Default: Story = {
  args: {
    children: 'Space Content',
  },
};
