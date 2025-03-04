import type { Meta, StoryObj } from '@storybook/react';
import { FormGroup } from './FormGroup';

const meta: Meta<typeof FormGroup> = {
  title: 'Components/FormGroup',
  component: FormGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
  args: {
    children: 'FormGroup Content',
  },
};
