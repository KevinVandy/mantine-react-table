import { useRouter } from 'next/router';
import { Box, Tabs } from '@mantine/core';

interface Props {
  links: {
    value: string;
    label: string;
  }[];
}

const OptionsSwitcher = ({ links }: Props) => {
  const { pathname, push } = useRouter();

  return (
    <>
      <Box>
        <Tabs
          keepMounted={false}
          value={pathname.split('/').pop()}
          onChange={(newPath) => push(newPath as string)}
        >
          <Tabs.List>
            {links.map(({ value, label }) => (
              <Tabs.Tab key={value} value={value}>
                {label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </Box>
    </>
  );
};

export default OptionsSwitcher;
