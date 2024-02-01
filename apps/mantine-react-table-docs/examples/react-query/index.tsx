import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
import Example from './sandbox/src/TS';

const TS = require('!!raw-loader!./sandbox/src/TS.tsx').default;
const API = require('!!raw-loader!./../../pages/api/data').default;

const ExampleTable = () => {
  return (
    <SourceCodeSnippet
      Component={Example}
      apiCode={API}
      typeScriptCode={TS}
      tableId="react-query"
    />
  );
};

export default ExampleTable;
