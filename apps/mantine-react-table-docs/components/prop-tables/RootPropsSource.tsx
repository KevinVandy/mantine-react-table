import { Box, Text } from '@mantine/core';
import { SourceCodeSnippet } from '../mdx/SourceCodeSnippet';
const TS = require('!!raw-loader!./RootPropTable.tsx').default;

const ExampleTable = () => {
  return (
    <Box sx={{ marginTop: '20rem' }}>
      <Text>
        Wanna see the source code for this table? Check it out down below!
      </Text>
      <SourceCodeSnippet tableId="root-props" typeScriptCode={TS} />
    </Box>
  );
};

export default ExampleTable;
