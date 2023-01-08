import { FC } from 'react';
import { Box, Divider, Anchor, Paper, Text } from '@mantine/core';
import TableOfContentsList from './TableOfContentsList';
import { routes } from './routes';

const Footer: FC = () => {
  return (
    <Paper
      component="footer"
      sx={{
        borderRadius: '8px',
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
        marginTop: '100px',
        padding: '1.5rem',
      }}
    >
      <Text color="gray.5" ta="center">
        © {new Date().getFullYear()} Kevin&nbsp;Van&nbsp;Cott
      </Text>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <Anchor
          color="text.secondary"
          href="https://www.npmjs.com/package/mantine-react-table"
          target="_blank"
          rel="noopener"
        >
          NPM
        </Anchor>
        <Anchor
          color="text.secondary"
          href="https://github.com/KevinVandy/mantine-react-table"
          target="_blank"
          rel="noopener"
        >
          Source Code
        </Anchor>
        <Anchor
          color="text.secondary"
          href="https://github.com/KevinVandy/mantine-react-table/issues"
          target="_blank"
          rel="noopener"
        >
          Submit a Bug Report
        </Anchor>
        <Anchor
          color="text.secondary"
          href="https://discord.gg/5wqyRx6fnm"
          target="_blank"
          rel="noopener"
        >
          Join&nbsp;the&nbsp;Discord!
        </Anchor>
        <Anchor
          color="text.secondary"
          href="https://twitter.com/ThomasVanCott"
          target="_blank"
          rel="noopener"
        >
          Twitter
        </Anchor>
      </Box>
      <Divider sx={{ margin: '2rem 0' }} />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '1rem',
          gap: '0.5rem',
          justifyContent: 'space-between',
          '@media (max-width: 800px)': {
            flexDirection: 'column',
            justifyContent: 'space-around',
          },
          '@media (max-width: 600px)': {
            flexDirection: 'column',
            justifyContent: 'flex-start',
          },
        }}
      >
        <Box>
          <Text>Site Directory</Text>
          <TableOfContentsList items={routes} isFooter />
        </Box>
        <Box>
          <Text>API Reference</Text>
          <TableOfContentsList
            items={
              routes.find((item) => item.href === '/docs/getting-started')
                ?.items ?? []
            }
            isFooter
          />
          <TableOfContentsList
            items={
              routes
                .find((item) => item.href === '/docs/api')
                ?.items?.find((item) => item.label === 'Props and Options')
                ?.items ?? []
            }
            isFooter
          />
          <TableOfContentsList
            items={
              routes
                .find((item) => item.href === '/docs/api')
                ?.items?.find((item) => item.label === 'Instance APIs')
                ?.items ?? []
            }
            isFooter
          />
        </Box>
        <Box>
          <Text>Examples</Text>
          <TableOfContentsList
            items={
              routes.find((item) => item.href === '/docs/examples')?.items ?? []
            }
            isFooter
          />
        </Box>
        <Box>
          <Text>Fundamental Guides</Text>
          <TableOfContentsList
            items={
              (
                routes.find((item) => item.href === '/docs/guides')?.items ?? []
              ).find((item) => item.label === 'Fundamentals')?.items ?? []
            }
            isFooter
          />
        </Box>
        <Box>
          <Text>Feature Guides</Text>
          <TableOfContentsList
            items={
              (
                routes.find((item) => item.href === '/docs/guides')?.items ?? []
              ).find((item) => item.label === 'Feature Guides')?.items ?? []
            }
            isFooter
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default Footer;
