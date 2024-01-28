#!/bin/bash

# Define the directory to search in. Change this to your specific directory.
SEARCH_DIR="./apps/mantine-react-table-docs/examples/"

# Define the new multiline text to be added
NEW_TEXT="import React from 'react';
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
"

# Find all files named Legacy.tsx and replace their contents with the new text
find "$SEARCH_DIR" -type f -name "main.tsx" | while read -r file; do
    echo "Processing $file"
    echo "$NEW_TEXT" > "$file"
done

echo "Processing complete."
