import { Box, Divider, Anchor, Paper, Text } from '@mantine/core';
import { TableOfContentsList } from './TableOfContentsList';
import { routes } from './routes';

export const Footer = () => {
  return (
    <Paper
      component="footer"
      shadow="sm"
      withBorder
      sx={{
        borderRadius: '8px',
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
        marginTop: '100px',
        padding: '24px',
      }}
    >
      <Text color="dimmed" ta="center" mb="16px">
        © {new Date().getFullYear()} Kevin&nbsp;Van&nbsp;Cott
      </Text>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <Anchor
          color="dimmed"
          href="https://www.npmjs.com/package/mantine-react-table"
          target="_blank"
          rel="noopener"
        >
          NPM
        </Anchor>
        <Anchor
          color="dimmed"
          href="https://github.com/KevinVandy/mantine-react-table"
          target="_blank"
          rel="noopener"
        >
          Source Code
        </Anchor>
        <Anchor
          color="dimmed"
          href="https://github.com/KevinVandy/mantine-react-table/issues"
          target="_blank"
          rel="noopener"
        >
          Submit a Bug Report
        </Anchor>
        <Anchor
          color="dimmed"
          href="https://discord.gg/5wqyRx6fnm"
          target="_blank"
          rel="noopener"
        >
          Join&nbsp;the&nbsp;Discord!
        </Anchor>
        <Anchor
          color="dimmed"
          href="https://twitter.com/kevinvancott"
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
          marginTop: '16px',
          gap: '8px',
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
                ?.items?.find((item) => item.label === 'Options')?.items ?? []
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
