import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
import ExampleGrouping from './sandbox/src/TS';
const TS = require('!!raw-loader!./sandbox/src/TS.tsx').default;

const ExampleTable = ({ showTopRow = true }) => {
  return (
    <SourceCodeSnippet
      Component={ExampleGrouping}
      typeScriptCode={TS}
      tableId="enable-column-grouping"
      showTopRow={showTopRow}
    />
  );
};

export default ExampleTable;
