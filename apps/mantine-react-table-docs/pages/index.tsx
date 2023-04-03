import Link from 'next/link';
import Image from 'next/image';
import { Anchor, Box, Button, Stack, Text, Title } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { HomeCards } from '../components/mdx/HomeCards';
import { LinkCards } from '../components/mdx/LinkCards';
import { StatBadges } from '../components/mdx/StatBadges';
import { ComparisonTable } from '../components/mdx/ComparisonTable';
import { LinkHeading } from '../components/mdx/LinkHeading';
import { FeatureTable } from '../components/mdx/FeatureTable';
import { SampleCodeSnippet } from '../components/mdx/SampleCodeSnippet';
import { getPrimaryColor } from 'mantine-react-table/src/column.utils';
import { PopularDocs } from '../components/mdx/PopularDocs';
import { Contributors } from '../components/mdx/Contributors';

const HomePage = () => {
  return (
    <>
      <Stack sx={{ maxWidth: '95ch', margin: 'auto' }}>
        <Text
          sx={(theme) => ({
            margin: 'auto',
            display: 'inline-block',
            background: `-webkit-linear-gradient(left, ${theme.colors.yellow[7]}, ${theme.colors.red[7]})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            '&:hover': {
              textDecoration: 'underline',
              textDecorationColor: theme.colors.orange[7],
            },
          })}
        >
          1.0 Now in Beta for Mantine V6
        </Text>
        <Text
          sx={(theme) => ({
            margin: 'auto',
            display: 'inline-block',
            background: `-webkit-linear-gradient(left, ${theme.colors.orange[7]}, ${theme.colors.yellow[7]})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            '&:hover': {
              textDecoration: 'underline',
              textDecorationColor: theme.colors.yellow[7],
            },
          })}
        >
          v0.9.5 is the last version for Mantine V5
        </Text>
        <Title
          sx={{
            textAlign: 'center',
            fontSize: '5rem',
            fontWeight: 'bold',
            marginTop: '3rem',
            marginBottom: '1rem',
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
              Mantine<sup>V6</sup>
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '1rem auto',
          }}
        >
          <Image
            alt="Mui + React Table"
            src={`/banner.png`}
            height={60}
            width={308}
          />
        </Box>
        <StatBadges />
        <Box
          sx={{
            margin: '3rem auto',
            marginBottom: '16px',
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
              sx={(theme) => ({
                backgroundColor: theme.fn.rgba(getPrimaryColor(theme), 0.1),
                color: getPrimaryColor(theme),
                '&:hover': {
                  backgroundColor: theme.fn.rgba(
                    theme.fn.darken(getPrimaryColor(theme), 0.1),
                    0.2,
                  ),
                },
              })}
              variant="filled"
            >
              API
            </Button>
          </Link>
          <Link href="/docs/examples" passHref>
            <Button
              rightIcon={<IconChevronRight />}
              fullWidth
              size="lg"
              sx={(theme) => ({
                backgroundColor: theme.fn.rgba(getPrimaryColor(theme), 0.1),
                color: getPrimaryColor(theme),
                '&:hover': {
                  backgroundColor: theme.fn.rgba(
                    theme.fn.darken(getPrimaryColor(theme), 0.1),
                    0.2,
                  ),
                },
              })}
              variant="filled"
            >
              Examples
            </Button>
          </Link>
          <Link href="/docs/guides" passHref>
            <Button
              rightIcon={<IconChevronRight />}
              fullWidth
              size="lg"
              sx={(theme) => ({
                backgroundColor: theme.fn.rgba(getPrimaryColor(theme), 0.1),
                color: getPrimaryColor(theme),
                '&:hover': {
                  backgroundColor: theme.fn.rgba(
                    theme.fn.darken(getPrimaryColor(theme), 0.1),
                    0.2,
                  ),
                },
              })}
              variant="filled"
            >
              Guides
            </Button>
          </Link>
        </Box>
        <Box py="16px">
          <SampleCodeSnippet className="language-bash">
            npm i mantine-react-table@beta @mantine/core @mantine/hooks
            @mantine/dates @emotion/react @tabler/icons-react dayjs
          </SampleCodeSnippet>
        </Box>
        <HomeCards />
        <Title my="2rem" ta="center" order={3}>
          Popular Docs
        </Title>
        <PopularDocs />
        <LinkCards />
      </Stack>
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
      <LinkHeading sx={{ marginTop: '3rem' }} order={3}>
        Maintainers and Contributors
      </LinkHeading>
      <Contributors />
    </>
  );
};

export default HomePage;
