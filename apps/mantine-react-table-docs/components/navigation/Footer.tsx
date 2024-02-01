import { Box, Divider, Anchor, Paper, Text, Flex } from '@mantine/core';
import { TableOfContentsList } from './TableOfContentsList';
import { routes } from './routes';
import classes from './Footer.module.css';

export const Footer = () => {
  return (
    <Paper
      component="footer"
      shadow="sm"
      withBorder
      className={classes.wrapper}
    >
      <Text c="dimmed" ta="center" mb="16px">
        © {new Date().getFullYear()} Kevin&nbsp;Van&nbsp;Cott
      </Text>
      <Flex justify={'center'} gap={16} wrap="wrap">
        <Anchor
          c="dimmed"
          href="https://www.npmjs.com/package/mantine-react-table"
          target="_blank"
          rel="noopener"
        >
          NPM
        </Anchor>
        <Anchor
          c="dimmed"
          href="https://github.com/KevinVandy/mantine-react-table"
          target="_blank"
          rel="noopener"
        >
          Source Code
        </Anchor>
        <Anchor
          c="dimmed"
          href="https://github.com/KevinVandy/mantine-react-table/issues"
          target="_blank"
          rel="noopener"
        >
          Submit a Bug Report
        </Anchor>
        <Anchor
          c="dimmed"
          href="https://discord.gg/5wqyRx6fnm"
          target="_blank"
          rel="noopener"
        >
          Join&nbsp;the&nbsp;Discord!
        </Anchor>
        <Anchor
          c="dimmed"
          href="https://twitter.com/kevinvancott"
          target="_blank"
          rel="noopener"
        >
          Twitter
        </Anchor>
      </Flex>
      <Divider my={'2rem'} />
      <Box className={classes.directoryWrapper}>
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
                ?.secondaryItems ?? []
            }
            isFooter
          />
          <TableOfContentsList
            items={
              routes
                .find((item) => item.href === '/docs/api')
                ?.items?.find((item) => item.label === 'Instance APIs')
                ?.secondaryItems ?? []
            }
            isFooter
          />
          <TableOfContentsList
            items={
              routes
                .find((item) => item.href === '/docs/api')
                ?.items?.find((item) => item.label === 'Components and Hooks')
                ?.secondaryItems ?? []
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
          <Text>Guides</Text>
          {routes
            .find((item) => item.href === '/docs/guides')
            ?.items?.map((item) => (
              <TableOfContentsList
                key={item.href}
                items={item?.items ?? []}
                isFooter
              />
            ))}
        </Box>
      </Box>
    </Paper>
  );
};
