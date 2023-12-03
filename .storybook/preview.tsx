import type { Preview } from '@storybook/react';
import '../src/styles/index.css';
import React from 'react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <Story></Story>
      </>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
