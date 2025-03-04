import type { Meta, StoryObj } from '@storybook/react';
import { Row } from './Row';

const meta: Meta<typeof Row> = {
  title: 'Components/Row',
  component: Row,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Row>;

export const Default: Story = {
  args: {
    children: 'Row Content',
  },
};
