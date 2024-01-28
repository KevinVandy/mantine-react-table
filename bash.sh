#!/bin/bash

# Define the directory to search in. Change this to your specific directory.
SEARCH_DIR="./apps/mantine-react-table-docs/examples/"

# Define the text to be added
TEXT="import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';"

# Find all files named TS.tsx and append the text to the beginning of each file
find "$SEARCH_DIR" -type f -name "Legacy.tsx" | while read -r file; do
    # Check if the file already contains the line to avoid duplicate insertion
    echo "Processing $file"
    if ! grep -qxF "$TEXT" "$file"; then
        # Use a temporary file to prepend the text
        temp_file=$(mktemp)
        echo "$TEXT" > "$temp_file"
        cat "$file" >> "$temp_file"
        mv "$temp_file" "$file"
    fi
done

echo "Processing complete."
