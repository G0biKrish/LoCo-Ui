import type { Meta, StoryObj } from '@storybook/react';
import { ScrollToTop } from './ScrollToTop';

const meta: Meta<typeof ScrollToTop> = {
  title: 'Components/ScrollToTop',
  component: ScrollToTop,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollToTop>;

export const Default: Story = {
  args: {
    children: 'ScrollToTop Content',
  },
};
