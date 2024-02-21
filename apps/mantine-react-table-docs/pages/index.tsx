import Link from 'next/link';
import {
  Alert,
  Anchor,
  Box,
  Button,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconChevronRight, IconInfoCircle } from '@tabler/icons-react';
import { HomeCards } from '../components/mdx/HomeCards';
import { LinkCards } from '../components/mdx/LinkCards';
import { StatBadges } from '../components/mdx/StatBadges';
import { ComparisonTable } from '../components/mdx/ComparisonTable';
import { LinkHeading } from '../components/mdx/LinkHeading';
import { FeatureTable } from '../components/mdx/FeatureTable';
import { Contributors } from '../components/mdx/Contributors';
import { InstallCommand } from '../components/mdx/InstallCommand';
import BasicExamples from '../example-groups/BasicExamples';
import classes from './index.module.css';

const HomePage = () => {
  return (
    <Stack className={classes.wrapper}>
      <Alert variant="light" color="blue" icon={<IconInfoCircle />}>
        Mantine React Table V2 is now in beta. 🎉
      </Alert>
      <Title className={classes.title} order={1}>
        Welcome To
        <br />
        <Text
          fw={'bold'}
          variant="gradient"
          gradient={{ from: 'teal.7', to: 'blue.7', deg: 90 }}
          className={classes.titleMantineReactTable}
        >
          Mantine&nbsp;React&nbsp;Table
        </Text>
      </Title>
      <Title c="dimmed" className={classes.subtitle} order={2}>
        Built with{' '}
        <Link href="https://mantine.dev/" passHref legacyBehavior>
          <Anchor
            className={classes.builtWithMantine}
            c="teal.7"
            target="_blank"
            rel="noopener"
          >
            Mantine<sup>V7</sup>
          </Anchor>
        </Link>{' '}
        and&nbsp;
        <Link href="https://tanstack.com/table/v8" passHref legacyBehavior>
          <Anchor
            c="blue.8"
            className={classes.builtWithTanStack}
            target="_blank"
            rel="noopener"
          >
            TanStack&nbsp;Table<sup>V8</sup>
          </Anchor>
        </Link>
      </Title>
      <StatBadges />
      <Box className={classes.buttonSection}>
        <Link href="/docs/getting-started/install" passHref>
          <Button
            rightSection={<IconChevronRight />}
            fullWidth
            size="lg"
            variant="gradient"
            gradient={{ from: 'teal', to: 'blue' }}
          >
            Get Started
          </Button>
        </Link>
        <Link href="/docs/api" passHref>
          <Button
            rightSection={<IconChevronRight />}
            fullWidth
            size="lg"
            variant="light"
          >
            API
          </Button>
        </Link>
        <Link href="/docs/examples" passHref>
          <Button
            rightSection={<IconChevronRight />}
            fullWidth
            size="lg"
            variant="light"
          >
            Examples
          </Button>
        </Link>
        <Link href="/docs/guides" passHref>
          <Button
            rightSection={<IconChevronRight />}
            fullWidth
            size="lg"
            variant="light"
          >
            Guides
          </Button>
        </Link>
      </Box>
      <Box>
        <InstallCommand />
      </Box>
      <HomeCards />
      <Title my="2rem" ta="center" order={3}>
        Popular Docs
      </Title>
      <Box className={classes.buttonSection}>
        <Link href="/docs/getting-started/usage">
          <Button size="xl" fullWidth variant="gradient">
            Usage
          </Button>
        </Link>
        <Link href="/docs/api/table-options">
          <Button size="xl" fullWidth variant="gradient">
            Table Options
          </Button>
        </Link>
        <Link href="/docs/examples/editing-crud">
          <Button size="xl" fullWidth variant="gradient">
            CRUD Examples
          </Button>
        </Link>
        <Link href="/docs/examples/react-query">
          <Button size="xl" fullWidth variant="gradient">
            Fetching Examples
          </Button>
        </Link>
        <Link href="/docs/guides/localization">
          <Button size="xl" fullWidth variant="gradient">
            Localization
          </Button>
        </Link>
        <Link href="/docs/guides/data-columns">
          <Button size="xl" fullWidth variant="gradient">
            Create Columns
          </Button>
        </Link>
        <Link href="/docs/guides/column-filtering">
          <Button size="xl" fullWidth variant="gradient">
            Column Filtering
          </Button>
        </Link>
        <Link href="/docs/guides/row-selection">
          <Button size="xl" fullWidth variant="gradient">
            Row Selection
          </Button>
        </Link>
      </Box>
      <Title mt="2rem" ta="center" order={3}>
        Examples to Get You Started
      </Title>
      <BasicExamples />
      <Title className={classes.comparisonTitle} order={3}>
        Is {''}
        <Text
          component="span"
          variant="gradient"
          gradient={{ from: 'teal.7', to: 'blue.7', deg: 90 }}
          className={classes.comparisonTitleMantineReactTable}
        >
          &lt;MantineReactTable&nbsp;/&gt;
        </Text>{' '}
        Right For Your Project?
      </Title>
      <LinkHeading c="dimmed" order={4}>
        Let&apos;s Compare
      </LinkHeading>
      <ComparisonTable />
      <LinkHeading c="dimmed" order={4}>
        Feature Comparison
      </LinkHeading>
      <FeatureTable />
      <Text component="p" size="sm" mt="1rem">
        *If you see any inaccuracies in this table, PRs are welcome!
      </Text>
      <LinkHeading order={3}>Maintainers and Contributors</LinkHeading>
      <Contributors />
      <LinkCards />
    </Stack>
  );
};

export default HomePage;
