import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
import Example from './sandbox/src/TS';

const TS = require('!!raw-loader!./sandbox/src/TS.tsx').default;

const ExampleTable = () => {
  return (
    <SourceCodeSnippet
      Component={Example}
      typeScriptCode={TS}
      tableId="custom-column-filtering-ui"
    />
  );
};

export default ExampleTable;
