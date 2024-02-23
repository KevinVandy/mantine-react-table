import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
import Example from './sandbox/src/TS';

const TS = require('!!raw-loader!./sandbox/src/TS.tsx').default;
const CSS = require('!!raw-loader!./sandbox/src/CSS.module.css').default;

const ExampleTable = () => {
  return (
    <SourceCodeSnippet
      Component={Example}
      typeScriptCode={TS}
      cssCode={CSS}
      tableId="customize-css-variables"
    />
  );
};

export default ExampleTable;
