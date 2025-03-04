import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '@loco-ui/theme';
import { Typography } from '@loco-ui/typography';
import { Button } from '@loco-ui/button';
import { Alert } from '@loco-ui/alert';
import { Card } from '@loco-ui/card';
import { Badge } from '@loco-ui/badge';
import { Divider } from '@loco-ui/divider';
import { Spinner } from '@loco-ui/spinner';
import { Package, Moon, Sun, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Accordion } from '@loco-ui/accordion';
import { Autocomplete } from '@loco-ui/autocomplete';

function App() {
  // Simple state to demonstrate re-render on alert close
  const [showAutoAlert, setShowAutoAlert] = useState(true);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <header className="px-4 py-2 bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
              <Typography variant="h1" className="text-gray-900 dark:text-white">LoCo-UI</Typography>
            </div>
            <ThemeToggle />
          </div>
        </header>
        
        <main className="container mx-auto py-8 space-y-12">
          <ComponentSection title="Alert Component Showcase">
            <Card className="bg-white rounded-lg dark:bg-gray-800 p-6 space-y-4">
              {/* Info Alert - Default with automatic icon */}
              <Alert 
                variant="info" 
                title="Information"
                dismissible
                onClose={() => console.log('Info alert closed')}
              >
                This alert uses the default info icon and slides in from the right.
              </Alert>
              
              {/* Success Alert - With solid background */}
              <Alert 
                variant="success" 
                title="Success"
                solid
                dismissible
                animationDirection="left"
                onClose={() => console.log('Success alert closed')}
              >
                This success alert has a solid background and slides in from the left.
              </Alert>

              {/* Warning Alert - Outline style */}
              <Alert 
                variant="warning" 
                title="Warning"
                outline
                dismissible
                animationDirection="top"
                onClose={() => console.log('Warning alert closed')}
              >
                This warning alert has an outline style and slides in from the top.
              </Alert>

              {/* Danger Alert - With custom icon */}
              <Alert 
                variant="danger" 
                title="Error"
                icon={<AlertTriangle className="h-5 w-5" />}
                dismissible
                animationDirection="bottom"
                onClose={() => console.log('Danger alert closed')}
              >
                This danger alert has a custom icon and slides in from the bottom.
              </Alert>
              
              {/* Info Alert - Without icon */}
              <Alert 
                variant="info"
                showIcon={false}
                title="No Icon Alert"
              >
                This alert has no icon.
              </Alert>
              
              {/* Auto-closing alert */}
              {showAutoAlert && (
                <Alert 
                  variant="info"
                  title="Auto Close"
                  autoClose={5000}
                  onClose={() => {
                    console.log('Auto-close alert closed');
                    setShowAutoAlert(false);
                  }}
                >
                  This alert will automatically close after 5 seconds with a slide-out animation.
                </Alert>
              )}
              
              {/* Button to reset auto-closing alert */}
              {!showAutoAlert && (
                <div className="mt-4">
                  <Button 
                    variant="primary"
                    onClick={() => setShowAutoAlert(true)}
                  >
                    Show Auto-Close Alert Again
                  </Button>
                </div>
              )}
            </Card>
          </ComponentSection>
          
          {/* Other component sections ... */}
          <ComponentSection title="Button Component">
            <Card className="bg-white rounded-lg dark:bg-gray-800 p-6">
              <div className="flex flex-wrap gap-4">
                <Button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors">
                  Default
                </Button>
                <Button variant="primary" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
                  Primary
                </Button>
                <Button variant="secondary" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
                  Secondary
                </Button>
              </div>
              <Divider className="my-4 border-t border-gray-200 dark:border-gray-700" />
            </Card>
          </ComponentSection>
          
          <ComponentSection title="Spinner Component">
            <Card className="bg-white rounded-lg dark:bg-gray-800 p-6">
              <div className="flex items-center gap-6">
                <Spinner size="sm" variant="primary" />
                <Spinner size="md" variant="secondary" />
                <Spinner size="lg" variant="success" />
              </div>
            </Card>
          </ComponentSection>

          <ComponentSection title="Accordion Component">
            <Card className="bg-white rounded-lg dark:bg-gray-800 p-6">
              <Typography variant="h4" className="mb-4">Default Accordion</Typography>
              <Accordion className="mb-8">
                <Accordion.Item title="What is LoCo-UI?">
                  LoCo-UI is a comprehensive React component library designed with modern best practices 
                  and a focus on accessibility and customization.
                </Accordion.Item>
                <Accordion.Item title="How do I install LoCo-UI?">
                  LoCo-UI can be installed via npm or yarn. Simply run <code>npm install loco-ui</code> 
                  or <code>yarn add loco-ui</code> to get started.
                </Accordion.Item>
                <Accordion.Item title="Is LoCo-UI customizable?" defaultOpen>
                  Yes! LoCo-UI is designed to be highly customizable through props and CSS classes.
                  You can easily adapt components to your brand's look and feel.
                </Accordion.Item>
              </Accordion>
              
              <Typography variant="h4" className="mb-4">Bordered Accordion with Plus/Minus Icons</Typography>
              <Accordion variant="bordered" iconType="plus-minus" allowMultiple className="mb-8">
                <Accordion.Item title="Can I use multiple open items?">
                  Yes, this accordion allows multiple items to be open simultaneously since we set 
                  the <code>allowMultiple</code> prop to true.
                </Accordion.Item>
                <Accordion.Item title="What icon options are available?">
                  LoCo-UI accordions support multiple icon types: chevrons, plus/minus icons, 
                  custom icons, or no icons at all.
                </Accordion.Item>
                <Accordion.Item title="How do animations work?">
                  The accordion has smooth height transitions when opening and closing items.
                  You can customize the animation duration or turn animations off completely.
                </Accordion.Item>
              </Accordion>
              
              <Typography variant="h4" className="mb-4">Separated Accordion Style</Typography>
              <Accordion variant="separated" iconType="none">
                <Accordion.Item title="What is the 'separated' variant?">
                  The separated variant gives each accordion item its own contained card-like appearance
                  with space between items for a distinct visual style.
                </Accordion.Item>
                <Accordion.Item title="Can accordions be disabled?">
                  Yes, individual accordion items can be disabled by setting the <code>disabled</code> prop.
                </Accordion.Item>
                <Accordion.Item 
                  title={
                    <div className="flex items-center">
                      <Badge variant="success" className="mr-2">New</Badge>
                      <span>Custom Header Content</span>
                    </div>
                  }
                >
                  You can customize accordion headers with complex content, not just text.
                  This example uses a Badge component alongside text.
                </Accordion.Item>
              </Accordion>
            </Card>
          </ComponentSection>

          <ComponentSection title="Autocomplete Component">
            <Card className="bg-white rounded-lg dark:bg-gray-800 p-6 space-y-6">
              {/* Basic Autocomplete */}
              <div>
                <Typography variant="h4" className="mb-4">Basic Autocomplete</Typography>
                <Autocomplete
                  placeholder="Select a fruit..."
                  options={[
                    { value: 'apple', label: 'Apple' },
                    { value: 'banana', label: 'Banana' },
                    { value: 'cherry', label: 'Cherry' },
                    { value: 'durian', label: 'Durian' },
                    { value: 'elderberry', label: 'Elderberry' },
                  ]}
                  label="Favorite Fruit"
                  helperText="Select your favorite fruit from the list"
                />
              </div>

              {/* Multiple Selection */}
              <div>
                <Typography variant="h4" className="mb-4">Multiple Selection</Typography>
                <Autocomplete
                  placeholder="Select programming languages..."
                  multiple
                  options={[
                    { value: 'js', label: 'JavaScript' },
                    { value: 'ts', label: 'TypeScript' },
                    { value: 'py', label: 'Python' },
                    { value: 'java', label: 'Java' },
                    { value: 'csharp', label: 'C#' },
                    { value: 'go', label: 'Go' },
                    { value: 'ruby', label: 'Ruby' },
                  ]}
                  label="Programming Languages"
                />
              </div>

              {/* Grouped Options */}
              <div>
                <Typography variant="h4" className="mb-4">Grouped Options</Typography>
                <Autocomplete
                  placeholder="Select an animal..."
                  groupBy
                  options={[
                    { value: 'dog', label: 'Dog', group: 'Mammals' },
                    { value: 'cat', label: 'Cat', group: 'Mammals' },
                    { value: 'elephant', label: 'Elephant', group: 'Mammals' },
                    { value: 'eagle', label: 'Eagle', group: 'Birds' },
                    { value: 'penguin', label: 'Penguin', group: 'Birds' },
                    { value: 'snake', label: 'Snake', group: 'Reptiles' },
                    { value: 'lizard', label: 'Lizard', group: 'Reptiles' },
                    { value: 'salmon', label: 'Salmon', group: 'Fish' },
                  ]}
                  label="Favorite Animal"
                />
              </div>

              {/* Disabled Options */}
              <div>
                <Typography variant="h4" className="mb-4">With Disabled Options</Typography>
                <Autocomplete
                  placeholder="Select a planet..."
                  options={[
                    { value: 'mercury', label: 'Mercury' },
                    { value: 'venus', label: 'Venus' },
                    { value: 'earth', label: 'Earth' },
                    { value: 'mars', label: 'Mars' },
                    { value: 'jupiter', label: 'Jupiter' },
                    { value: 'saturn', label: 'Saturn', disabled: true },
                    { value: 'uranus', label: 'Uranus', disabled: true },
                    { value: 'neptune', label: 'Neptune' },
                  ]}
                  label="Select Planet"
                  helperText="Some planets are not available for selection"
                />
              </div>

              {/* Different Sizes */}
              <div>
                <Typography variant="h4" className="mb-4">Different Sizes</Typography>
                <div className="space-y-4">
                  <Autocomplete
                    size="sm"
                    placeholder="Small size"
                    options={[
                      { value: '1', label: 'Option 1' },
                      { value: '2', label: 'Option 2' },
                      { value: '3', label: 'Option 3' },
                    ]}
                  />
                  
                  <Autocomplete
                    size="md"
                    placeholder="Medium size (default)"
                    options={[
                      { value: '1', label: 'Option 1' },
                      { value: '2', label: 'Option 2' },
                      { value: '3', label: 'Option 3' },
                    ]}
                  />
                  
                  <Autocomplete
                    size="lg"
                    placeholder="Large size"
                    options={[
                      { value: '1', label: 'Option 1' },
                      { value: '2', label: 'Option 2' },
                      { value: '3', label: 'Option 3' },
                    ]}
                  />
                </div>
              </div>

              {/* Error State */}
              <div>
                <Typography variant="h4" className="mb-4">Error State</Typography>
                <Autocomplete
                  placeholder="This field has an error..."
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' },
                  ]}
                  error={true}
                  errorMessage="Please select a valid option"
                />
              </div>

              {/* Disabled State */}
              <div>
                <Typography variant="h4" className="mb-4">Disabled State</Typography>
                <Autocomplete
                  placeholder="You cannot interact with this field"
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' },
                  ]}
                  disabled={true}
                />
              </div>
            </Card>
          </ComponentSection>
        </main>
      </div>
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}

function ComponentSection({ title, children }: { title: string; children: React.ReactNode; }) {
  return (
    <section className="mb-12">
      <Typography variant="h3" className="mb-6 text-2xl font-bold">{title}</Typography>
      {children}
    </section>
  );
}

export default App;