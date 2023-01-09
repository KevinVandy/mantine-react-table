import { FC, useEffect, useState } from 'react';
import { Box, Anchor, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/router';

const MiniNav: FC = () => {
  const { pathname } = useRouter();
  const isXLDesktop = useMediaQuery('(min-width: 1800px)');
  const [headings, setHeadings] = useState<NodeListOf<HTMLElement>>();

  useEffect(() => {
    setHeadings(
      document.querySelectorAll(isXLDesktop ? 'h2, h3, h4, h5' : 'h3'),
    );
  }, [isXLDesktop, pathname]);

  return (
    <Box
      sx={{
        position: isXLDesktop ? 'fixed' : undefined,
        top: '80px',
        right: '2rem',
        minWidth: '100px',
        maxWidth: isXLDesktop ? '250px' : '500px',
      }}
    >
      <Text size="md">On This Page</Text>
      <ul style={{ padding: 0 }}>
        {Array.from(headings ?? []).map((heading, index) => {
          if (
            !isXLDesktop &&
            ['demo', 'source code'].includes(
              heading.innerText.toLowerCase().trim(),
            )
          ) {
            return;
          }
          return (
            <li
              key={index}
              style={{
                listStyle: 'none',
                paddingLeft:
                  heading.localName === 'h3'
                    ? '1rem'
                    : heading.localName === 'h4'
                    ? '2rem'
                    : heading.localName === 'h5'
                    ? '3rem'
                    : 0,
              }}
            >
              <Anchor
                href={`#${heading.id}`}
                sx={(theme) => ({
                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.gray[3]
                      : theme.colors.gray[7],
                })}
              >
                <Text underline component="span">
                  {heading.innerText}
                </Text>
              </Anchor>
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

export default MiniNav;
