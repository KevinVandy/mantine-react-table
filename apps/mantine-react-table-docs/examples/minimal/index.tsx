import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
import Example from './sandbox/src/TS';
const JS = require('!!raw-loader!./sandbox/src/JS.js').default;
const TS = require('!!raw-loader!./sandbox/src/TS.tsx').default;
const CSS = require('!!raw-loader!./sandbox/src/CSS.module.css').default;

const ExampleTable = ({ showTopRow = true }) => {
  return (
    <SourceCodeSnippet
      Component={Example}
      cssCode={CSS}
      javaScriptCode={JS}
      typeScriptCode={TS}
      tableId="minimal"
      showTopRow={showTopRow}
    />
  );
};

export default ExampleTable;
