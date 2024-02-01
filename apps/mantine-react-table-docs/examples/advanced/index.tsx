import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
import Example from './sandbox/src/TS';

const TS = require('!!raw-loader!./sandbox/src/TS.tsx').default;
const Legacy = require('!!raw-loader!./sandbox/src/Legacy.tsx').default;

const ExampleTable = ({ showTopRow = true }) => {
  return (
    <SourceCodeSnippet
      Component={Example}
      legacyCode={Legacy}
      typeScriptCode={TS}
      tableId="advanced"
      showTopRow={showTopRow}
    />
  );
};

export default ExampleTable;
