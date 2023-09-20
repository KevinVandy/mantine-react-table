import { Box, Card, Code, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { AnchorLink } from './AnchorLink';
import classes from './HomeCards.module.css';

export function HomeCards() {
  return (
    <Box className={classes.homeCardsGrid}>
      <Stack className={classes.homeCardsStack}>
        <Box className={classes.homeCardsGrid2}>
          <Card>
            <Title order={3}>The Best of Both Worlds</Title>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem auto',
              }}
            >
              <Image
                alt="Mui + React Table"
                src={`/banner.png`}
                height={50}
                width={256}
              />
            </Box>
            <Text>
              Combine TanStack Table&apos;s Extensive API With Mantine&apos;s
              Awesome Pre-Built Components!
            </Text>
          </Card>
          <Card>
            <Title order={3}>
              <Image
                alt="Efficiency Icon"
                height={24}
                width={24}
                src={'/efficient.svg'}
              />{' '}
              Efficient Bundle Size
            </Title>
            <Text>33-47 KB depending on components imported.</Text>
            <Text>
              Import the recommended <Code>MantineReactTable</Code> component,
              or optionally import lighter weight MRT sub-components that only
              include the UI you need.
            </Text>
          </Card>
        </Box>
        <Box className={classes.homeCardsGrid2}>
          <Card>
            <Title order={3}>
              <Image
                alt="Quality Icon"
                height={24}
                width={24}
                src={'/customizable.svg'}
              />{' '}
              Pre-Built or 100% Custom
            </Title>
            <Text>
              Use the pre-built single component data grid with the{' '}
              <Code>&lt;MantineReactTable /&gt;</Code> component.
            </Text>
            <Text>
              Or build your own markup from scratch using the{' '}
              <Code>useMantineReactTable</Code> hook.
            </Text>
            <Text>
              All internal MRT components are exported for you to use as
              &quot;lego blocks&quot; to build your own custom tables.
            </Text>
          </Card>
          <Card>
            <Title order={3}>
              <Image
                alt="Customizable Icon"
                height={24}
                width={24}
                src={`/source-code.svg`}
              />{' '}
              Easy Customization
            </Title>
            <Text>
              Just about everything is customizable or overridable in Mantine
              React Table. Pass in custom props or styles to all internal
              components. Use simple <Code>enable*</Code> props to easily enable
              or disable features.
            </Text>
          </Card>
        </Box>
      </Stack>
      <Stack className={classes.homeCardsStack}>
        <Card>
          <Title order={3}>
            <Image
              alt="Quality Icon"
              height={24}
              width={24}
              src={`/quality.svg`}
            />{' '}
            Powerful Features
          </Title>
          <Text>
            Mantine React Table has most of the features you would expect from a
            modern table library including{' '}
            <AnchorLink href="/docs/guides/pagination">Pagination</AnchorLink>,{' '}
            <AnchorLink href="/docs/guides/sorting">Sorting</AnchorLink>,{' '}
            <AnchorLink href="/docs/guides/column-filtering">
              Filtering
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/row-selection">
              Row Selection
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/expanding-sub-rows">
              Row Expansion
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/column-resizing">
              Column Resizing
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/column-ordering-dnd">
              Column Reordering
            </AnchorLink>
            , etc.
          </Text>
          <Text>
            However, Mantine React Table also has advanced features that you may
            not find in other table libraries such as{' '}
            <AnchorLink href="/docs/guides/virtualization">
              Virtualization
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/aggregation-and-grouping">
              Aggregation and Grouping
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/examples/advanced">
              Advanced Filter UIs
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/global-filtering">
              Fuzzy Search
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/editing">
              Full Editing (CRUD)
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/column-pinning">
              Column Pinning
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/row-numbers">Row Numbers</AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/click-to-copy">
              Click to Copy
            </AnchorLink>
            , and more.
          </Text>
        </Card>
        <Card>
          <Title order={3}>30+ i18n Locales</Title>
          <Text>
            The MRT Community has contributed{' '}
            <AnchorLink href="/docs/guides/localization">
              over&nbsp;30&nbsp;Locales
            </AnchorLink>{' '}
            for everyone to import and use.
          </Text>
        </Card>
      </Stack>
    </Box>
  );
}
