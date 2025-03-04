import type { Meta, StoryObj } from '@storybook/react';
import { Column } from './Column';

const meta: Meta<typeof Column> = {
  title: 'Components/Column',
  component: Column,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Column>;

export const Default: Story = {
  args: {
    children: 'Column Content',
  },
};
