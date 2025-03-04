# Loco-UI: A Modular & Customizable React Component Library

Loco-UI is a React-based component library designed for scalability, modularity, and reusability. Each component functions as an independent microfrontend module, allowing for seamless installation, maintenance, and updating of individual components without impacting the entire library.

## ✨ Features

- **Microfrontend-Based Standalone Components**: Each component is packaged separately, enabling selective imports without unnecessary dependencies.
- **Theming & Customization**: Built-in dark mode support and fully customizable using Tailwind CSS.
- **Monorepo & Versioning Strategy**: Each module is independently versioned, allowing for granular updates and improvements.
- **TypeScript Support**: Full TypeScript support with clear type definitions for better developer experience.

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/G0biKrish/LoCo-Ui.git
cd LoCo-Ui

# Install dependencies
npm install

# Start the development server
npm run dev

# Start Storybook
npm run storybook
```

### Using Components

Each component can be installed and used independently:

```bash
npm install @loco-ui/button @loco-ui/theme
```

```jsx
import { Button } from '@loco-ui/button';
import { ThemeProvider } from '@loco-ui/theme';

function App() {
  return (
    <ThemeProvider>
      <div>
        <Button variant="primary">Click me</Button>
      </div>
    </ThemeProvider>
  );
}
```

### Creating Additional Components

To create additional components, use the script:

```bash
node scripts/create-component.js ComponentName
```

## 📚 Component Categories

### Basic UI Components
- Button
- Icon
- Typography
- Link

### Form Components
- Form
- InputField
- Textarea
- Checkbox
- RadioButton
- DropdownMenu
- DatePicker
- TimePicker
- FileUpload
- Switch
- Slider
- Autocomplete
- FormGroup
- Label

### Navigation Components
- Navbar
- Sidebar
- Breadcrumb
- Pagination
- Tabs
- Drawer
- Menu
- Stepper
- Link

### Feedback Components
- Modal
- Tooltip
- Spinner
- Alert
- Notification
- Toast
- Popover
- Skeleton

### Data Display Components
- Card
- Accordion
- Badge
- Avatar
- ProgressBar
- Table
- List
- TreeView
- Carousel
- Tag
- Chip
- Rating
- Collapse
- Timeline
- Statistic

### Layout Components
- Container
- Grid
- Row
- Column
- Footer
- Header
- Divider
- Space

### Utility Components
- Portal
- Transition
- ScrollToTop
- ErrorBoundary

## 🛠 Technical Stack

- **UI Framework**: React 18+
- **Styling**: Tailwind CSS
- **Build System**: Vite
- **Monorepo Management**: Lerna
- **Documentation**: Storybook

## 📏 Development Guidelines

1. **Component Isolation**: Each component should be stateless where possible and rely on props for data.
2. **Accessibility (a11y) Compliance**: Follow ARIA best practices to improve usability.
3. **Dark Mode & Theming**: Use CSS variables or Tailwind's theme extension for easy theming.
4. **Hook-Based Functional Components**: Provide React Hooks for common patterns.
5. **Code Splitting & Lazy Loading**: Implement dynamic imports to improve load times.

## 📅 Update Log

### v1.1.0
- Added new `Autocomplete` component for enhanced form inputs.
- Improved `Button` component with additional variants and sizes.
- Enhanced `Modal` component with better accessibility features.

### Planned Updates
- Bug fixes
- Storybook configurations
- Adding API support to Autocomplete 
- Renaming Components with LoCo Prefix 
- Updating Remaining Components

## 📞 Contact

For any questions, suggestions, or issues, please feel free to reach out:

- **Email**: gobithehacker@gmai.com
- **GitHub Issues**: [Loco-UI Issues](https://github.com/G0biKrish/LoCo-Ui/issues)
- **Instagram**: [@LocoUI](https://www.instagram.com/gobikrishnan_nagamani/)

We appreciate your feedback and contributions to improve Loco-UI!

## 📄 License

MIT
