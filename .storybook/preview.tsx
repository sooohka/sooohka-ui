import type { Preview } from '@storybook/react';
import '../output.css';
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
