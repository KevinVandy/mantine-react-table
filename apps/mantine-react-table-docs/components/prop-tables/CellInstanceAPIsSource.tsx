import { Box, Text } from '@mantine/core';
import { SourceCodeSnippet } from '../mdx/SourceCodeSnippet';
const TS = require('!!raw-loader!./CellInstanceAPIsTable.tsx').default;

const ExampleTable = () => {
  return (
    <Box style={{ marginTop: '20rem' }}>
      <Text>
        Wanna see the source code for this table? Check it out down below!
      </Text>
      <SourceCodeSnippet tableId="cell-instance-apis" typeScriptCode={TS} />
    </Box>
  );
};

export default ExampleTable;
