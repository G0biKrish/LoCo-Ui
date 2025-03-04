# @loco-ui/theme

Theme provider for the Loco-UI component library, providing dark mode support and theme customization.

## Installation

```bash
npm install @loco-ui/theme
```

## Usage

Wrap your application with the ThemeProvider:

```jsx
import { ThemeProvider } from '@loco-ui/theme';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <YourApp />
    </ThemeProvider>
  );
}
```

Use the useTheme hook to access and modify the current theme:

```jsx
import { useTheme } from '@loco-ui/theme';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## Props

### ThemeProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultTheme | 'light' \| 'dark' | 'light' | The default theme to use |
| children | ReactNode | - | The content to be rendered within the theme context |

## Hook

### useTheme

Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| theme | 'light' \| 'dark' | The current theme |
| setTheme | (theme: 'light' \| 'dark') => void | Function to set the theme directly |
| toggleTheme | () => void | Function to toggle between light and dark themes |

## License

MIT