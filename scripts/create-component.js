import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get component name from command line arguments
const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

// Convert to PascalCase for component name
const pascalCaseName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

// Create directory structure
const componentDir = path.join(__dirname, '..', 'packages', componentName.toLowerCase());
const srcDir = path.join(componentDir, 'src');

// Create directories if they don't exist
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

// Create package.json
const packageJson = `{
  "name": "@loco-ui/${componentName.toLowerCase()}",
  "version": "0.1.0",
  "description": "${pascalCaseName} component for Loco-UI",
  "main": "dist/index.js",
  "module": "dist/index.es.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "vite build",
    "test": "jest"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "clsx": "^2.0.0"
  }
}`;

// Create component file
const componentFile = `import React from 'react';
import { clsx } from 'clsx';

export interface ${pascalCaseName}Props {
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const ${pascalCaseName} = React.forwardRef<HTMLDivElement, ${pascalCaseName}Props>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'loco-${componentName.toLowerCase()}',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

${pascalCaseName}.displayName = '${pascalCaseName}';

export default ${pascalCaseName};
`;

// Create index file
const indexFile = `export * from './${pascalCaseName}';
export { default as ${pascalCaseName} } from './${pascalCaseName}';
`;

// Create stories file
const storiesFile = `import type { Meta, StoryObj } from '@storybook/react';
import { ${pascalCaseName} } from './${pascalCaseName}';

const meta: Meta<typeof ${pascalCaseName}> = {
  title: 'Components/${pascalCaseName}',
  component: ${pascalCaseName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${pascalCaseName}>;

export const Default: Story = {
  args: {
    children: '${pascalCaseName} Content',
  },
};
`;

// Create README file
const readmeFile = `# @loco-ui/${componentName.toLowerCase()}

A ${componentName.toLowerCase()} component for the Loco-UI component library.

## Installation

\`\`\`bash
npm install @loco-ui/${componentName.toLowerCase()}
\`\`\`

## Usage

\`\`\`jsx
import { ${pascalCaseName} } from '@loco-ui/${componentName.toLowerCase()}';

function App() {
  return (
    <${pascalCaseName}>
      // Your content here
    </${pascalCaseName}>
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS classes to apply |
| children | ReactNode | - | The content to render inside the component |

## License

MIT
`;

// Create tsconfig.json
const tsconfigFile = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "declarationDir": "dist",
    "outDir": "dist"
  },
  "include": ["src"],
  "references": [{ "path": "../../tsconfig.node.json" }]
}`;

// Create vite.config.ts
const viteConfigFile = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'LocoUI${pascalCaseName}',
      fileName: (format) => \`index.\${format}.js\`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
`;

// Write files
fs.writeFileSync(path.join(componentDir, 'package.json'), packageJson);
fs.writeFileSync(path.join(srcDir, `${pascalCaseName}.tsx`), componentFile);
fs.writeFileSync(path.join(srcDir, 'index.ts'), indexFile);
fs.writeFileSync(path.join(srcDir, `${pascalCaseName}.stories.tsx`), storiesFile);
fs.writeFileSync(path.join(componentDir, 'README.md'), readmeFile);
fs.writeFileSync(path.join(componentDir, 'tsconfig.json'), tsconfigFile);
fs.writeFileSync(path.join(componentDir, 'vite.config.ts'), viteConfigFile);

console.log(`Component ${pascalCaseName} created successfully!`);