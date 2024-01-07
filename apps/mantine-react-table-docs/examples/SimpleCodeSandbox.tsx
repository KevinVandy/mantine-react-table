import { useThemeContext } from '../styles/ThemeContext';

const SimpleCodeSandbox = () => {
  return (
    <iframe
      src={`https://codesandbox.io/embed/simple-mantine-react-table-y2kztl?fontsize=14&hidenavigation=1`}
      style={{
        width: '100%',
        height: '500px',
      }}
      title="simple-mantine-react-table-example"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  );
};

export default SimpleCodeSandbox;
