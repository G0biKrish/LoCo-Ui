import type { Meta, StoryObj } from '@storybook/react';
import { Statistic } from './Statistic';

const meta: Meta<typeof Statistic> = {
  title: 'Components/Statistic',
  component: Statistic,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Statistic>;

export const Default: Story = {
  args: {
    children: 'Statistic Content',
  },
};
