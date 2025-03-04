import type { Meta, StoryObj } from '@storybook/react';
import { TreeView } from './TreeView';

const meta: Meta<typeof TreeView> = {
  title: 'Components/TreeView',
  component: TreeView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TreeView>;

export const Default: Story = {
  args: {
    children: 'TreeView Content',
  },
};
