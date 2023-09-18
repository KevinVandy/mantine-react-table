import Link from 'next/link';
import Image from 'next/image';
import { Anchor, Box, Button, Paper, Stack, Text, Title } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { HomeCards } from '../components/mdx/HomeCards';
import { LinkCards } from '../components/mdx/LinkCards';
import { StatBadges } from '../components/mdx/StatBadges';
import { ComparisonTable } from '../components/mdx/ComparisonTable';
import { LinkHeading } from '../components/mdx/LinkHeading';
import { FeatureTable } from '../components/mdx/FeatureTable';
import { getPrimaryColor } from 'mantine-react-table/src/column.utils';
import { PopularDocs } from '../components/mdx/PopularDocs';
import { Contributors } from '../components/mdx/Contributors';
import { InstallCommand } from '../components/mdx/InstallCommand';
import BasicExamples from '../example-groups/BasicExamples';

const HomePage = () => {
  return (
    <Stack sx={{ maxWidth: '1240px', margin: 'auto', paddingTop: '2rem' }}>
      <Title
        sx={{
          textAlign: 'center',
          fontSize: '5rem',
          fontWeight: 'bold',
          lineHeight: '6rem',
          '@media (max-width: 1024px)': {
            fontSize: '3rem',
            lineHeight: '4rem',
            marginBottom: '16px',
          },
          '@media (max-width: 768px)': {
            fontSize: '32px',
            lineHeight: '3rem',
          },
        }}
        order={1}
      >
        Welcome To
        <br />
        <Box
          sx={(theme) => ({
            background: `-webkit-linear-gradient(left, ${getPrimaryColor(
              theme,
            )}, ${theme.colors.blue[7]})`,
            display: 'inline',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}
        >
          Mantine&nbsp;React&nbsp;Table
        </Box>
      </Title>
      <Title
        color="dimmed"
        sx={{
          fontSize: '2.3rem',
          textAlign: 'center',
          lineHeight: '2.25rem',
          fontWeight: 'normal',
          '@media (max-width: 768px)': {
            fontSize: '1.5rem',
          },
        }}
        order={2}
      >
        Built with{' '}
        <Link href="https://mantine.dev/" passHref legacyBehavior>
          <Anchor
            sx={(theme) => ({
              color: getPrimaryColor(theme),
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            })}
            target="_blank"
            rel="noopener"
          >
            Mantine<sup>V7</sup>
          </Anchor>
        </Link>{' '}
        and&nbsp;
        <Link href="https://tanstack.com/table/v8" passHref legacyBehavior>
          <Anchor
            sx={(theme) => ({
              color: theme.colors.blue[8],
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            })}
            target="_blank"
            rel="noopener"
          >
            TanStack&nbsp;Table<sup>V8</sup>
          </Anchor>
        </Link>
      </Title>
      <StatBadges />
      <Box
        sx={{
          marginTop: '1rem',
          display: 'grid',
          gap: '24px',
          width: '100%',
          justifyContent: 'center',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          '@media (max-width: 1024px)': {
            gridTemplateColumns: '16rem 16rem',
          },
          '@media (max-width: 768px)': {
            gridTemplateColumns: '16rem',
          },
          '> a': {
            display: 'block',
          },
        }}
      >
        <Link href="/docs/getting-started/install" passHref>
          <Button
            rightIcon={<IconChevronRight />}
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
            rightIcon={<IconChevronRight />}
            fullWidth
            size="lg"
            variant="light"
          >
            API
          </Button>
        </Link>
        <Link href="/docs/examples" passHref>
          <Button
            rightIcon={<IconChevronRight />}
            fullWidth
            size="lg"
            variant="light"
          >
            Examples
          </Button>
        </Link>
        <Link href="/docs/guides" passHref>
          <Button
            rightIcon={<IconChevronRight />}
            fullWidth
            size="lg"
            variant="light"
          >
            Guides
          </Button>
        </Link>
      </Box>
      <Box>
        <InstallCommand grow position="center" />
      </Box>
      <HomeCards />
      <Title my="2rem" ta="center" order={3}>
        Popular Docs
      </Title>
      <PopularDocs />
      <Title mt="2rem" ta="center" order={3}>
        Examples to Get You Started
      </Title>
      <BasicExamples />
      <Title
        sx={{
          textAlign: 'center',
          marginTop: '5rem',
          fontSize: '32px',
        }}
        order={3}
      >
        Is{' '}
        <Box
          sx={(theme) => ({
            background: `-webkit-linear-gradient(left, ${getPrimaryColor(
              theme,
            )}, ${theme.colors.blue[7]})`,
            display: 'inline',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}
        >
          &lt;MantineReactTable&nbsp;/&gt;
        </Box>{' '}
        Right For Your Project?
      </Title>
      <LinkHeading
        color="dimmed"
        sx={{
          margin: '2rem auto',
          justifyContent: 'center',
        }}
        order={4}
      >
        Let&apos;s Compare
      </LinkHeading>
      <ComparisonTable />
      <LinkHeading
        color="dimmed"
        sx={{
          justifyContent: 'center',
          margin: '2rem auto',
        }}
        order={4}
      >
        Feature Comparison
      </LinkHeading>
      <FeatureTable />
      <Text component="p" size="sm" sx={{ marginTop: '16px' }}>
        *If you see any inaccuracies in this table, PRs are welcome!
      </Text>
      <LinkHeading
        sx={{
          justifyContent: 'center',
          marginTop: '2rem',
        }}
        order={3}
      >
        Maintainers and Contributors
      </LinkHeading>
      <Contributors />
      <LinkCards />
    </Stack>
  );
};

export default HomePage;
