import { useMantineColorScheme } from '@mantine/core';
import { useThemeContext } from '../styles/ThemeContext';

const SimpleCodeSandbox = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <iframe
      src={`https://codesandbox.io/embed/simple-mantine-react-table-y2kztl?fontsize=14&hidenavigation=1&theme=${colorScheme}`}
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
