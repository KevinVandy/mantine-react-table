import React from 'react';
import ReactDOM from 'react-dom/client';
import Example from './TS';
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider>
      <Example />
    </MantineProvider>
  </React.StrictMode>,
);
