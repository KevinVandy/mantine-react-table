import Link from 'next/link';
import {
  alpha,
  Box,
  Button,
  darken,
  Stack,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { HomeCards } from '../components/mdx/HomeCards';
import { LinkCards } from '../components/mdx/LinkCards';
import { StatBadges } from '../components/mdx/StatBadges';
import ComparisonTable from '../components/mdx/ComparisonTable';
import { LinkHeading } from '../components/mdx/LinkHeading';
import FeatureTable from '../components/mdx/FeatureTable';
import { SampleCodeSnippet } from '../components/mdx/SampleCodeSnippet';

const HomePage = () => {
  return (
    <>
      <Stack sx={{ maxWidth: '95ch', margin: 'auto' }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: {
              xs: '1.8rem',
              sm: '3rem',
              md: '4rem',
              lg: '4.5rem',
              xl: '5rem',
            },
            fontWeight: 'bold',
            marginTop: '5rem',
            mb: {
              xs: '1rem',
              md: '1.5rem',
              lg: '2rem',
            },
            lineHeight: {
              xs: '2.5rem',
              sm: '3.5rem',
              md: '5rem',
              lg: '5.5rem',
              xl: '6rem',
            },
          }}
          variant="h1"
        >
          Welcome To
          <br />
          <Box
            sx={(theme) => ({
              background: `-webkit-linear-gradient(left, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
              display: 'inline',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            })}
          >
            Mantine&nbsp;React&nbsp;Table
            <Box
              component="sup"
              sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1.2rem',
                  md: '1.5rem',
                  lg: '2.5rem',
                },
              }}
            >
              V1
            </Box>
          </Box>
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: {
              xs: '1.2rem',
              sm: '1.5rem',
              md: '2.2rem',
              lg: '2.25rem',
            },
            marginBottom: '3rem',
            textAlign: 'center',
            lineHeight: '2.25rem',
            fontWeight: 'normal',
          }}
          variant="h2"
        >
          Built with{' '}
          <Link href="https://mantine.dev/" passHref legacyBehavior>
            <MuiLink
              sx={{
                color: (theme) => theme.palette.primary.dark,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
              target="_blank"
              rel="noreferrer"
            >
              Mantine<sup>V5</sup>
            </MuiLink>
          </Link>{' '}
          and&nbsp;
          <Link href="https://tanstack.com/table/v8" passHref legacyBehavior>
            <MuiLink
              color="secondary.main"
              sx={{
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
              target="_blank"
              rel="noreferrer"
            >
              TanStack&nbsp;Table<sup>V8</sup>
            </MuiLink>
          </Link>
        </Typography>
        <StatBadges />
        <Typography
          color="text.secondary"
          sx={{
            fontSize: {
              xs: '1.1rem',
              md: '1.4rem',
              lg: '1.5rem',
            },
            marginTop: '2rem',
            textAlign: 'center',
            lineHeight: {
              xs: '1.8rem',
              md: '2rem',
              lg: '2.5rem',
            },
            fontWeight: 'normal',
            textTransform: 'capitalize',
          }}
          variant="h3"
        >
          Quickly create high-quality React data tables with
          Material&nbsp;Design
        </Typography>
        <Box
          sx={{
            margin: '3rem auto',
            marginBottom: '1rem',
            display: 'grid',
            gap: '1.5rem',
            width: '100%',
            justifyContent: 'center',
            gridTemplateColumns: {
              xs: '15rem',
              sm: '14rem 14rem',
              md: '16rem 16rem',
              lg: '12rem 11rem 11rem 11rem',
              xl: '1fr 1fr 1fr 1fr',
            },
            '> a': {
              display: 'block',
            },
          }}
        >
          <Link href="/docs/getting-started/install" passHref>
            <Button
              endIcon={<ArrowForwardIos />}
              fullWidth
              size="large"
              variant="contained"
            >
              Get Started
            </Button>
          </Link>
          <Link href="/docs/api" passHref>
            <Button
              endIcon={<ArrowForwardIos />}
              fullWidth
              size="large"
              sx={(theme) => ({
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.dark,
                '&:hover': {
                  backgroundColor: alpha(
                    darken(theme.palette.primary.main, 0.1),
                    0.2,
                  ),
                },
              })}
              variant="contained"
            >
              API
            </Button>
          </Link>
          <Link href="/docs/examples" passHref>
            <Button
              endIcon={<ArrowForwardIos />}
              fullWidth
              size="large"
              sx={(theme) => ({
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.dark,
                '&:hover': {
                  backgroundColor: alpha(
                    darken(theme.palette.primary.main, 0.1),
                    0.2,
                  ),
                },
              })}
              variant="contained"
            >
              Examples
            </Button>
          </Link>
          <Link href="/docs/guides" passHref>
            <Button
              endIcon={<ArrowForwardIos />}
              fullWidth
              size="large"
              sx={(theme) => ({
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.dark,
                '&:hover': {
                  backgroundColor: alpha(
                    darken(theme.palette.primary.main, 0.1),
                    0.2,
                  ),
                },
              })}
              variant="contained"
            >
              Guides
            </Button>
          </Link>
        </Box>
        <Box>
          <SampleCodeSnippet
            className="language-bash"
            style={{ paddingBottom: '1rem' }}
          >
            npm i mantine-react-table @mui/material @mui/icons-material
            @emotion/react @emotion/styled
          </SampleCodeSnippet>
        </Box>
        <HomeCards />
      </Stack>
      <Typography
        sx={{
          textAlign: 'center',
          marginTop: '5rem',
          fontSize: { xs: '1.5rem', md: '2rem', xl: '2.5rem' },
        }}
        variant="h3"
      >
        Is{' '}
        <Box
          sx={(theme) => ({
            background: `-webkit-linear-gradient(left, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
            display: 'inline',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          })}
        >
          &lt;MantineReactTable&nbsp;/&gt;
        </Box>{' '}
        Right For Your Project?
      </Typography>
      <LinkHeading
        color="text.secondary"
        sx={{
          textAlign: 'center',
          margin: '2rem',
        }}
        order={4}
      >
        Let&apos;s Compare
      </LinkHeading>
      <ComparisonTable />
      <LinkHeading
        color="text.secondary"
        sx={{
          textAlign: 'center',
          margin: '2rem',
        }}
        order={4}
      >
        Feature Comparison
      </LinkHeading>
      <FeatureTable />
      <Typography component="p" variant="subtitle2" sx={{ marginTop: '1rem' }}>
        *If you see any inaccuracies in this table, PRs are welcome!
      </Typography>
      <LinkCards />
    </>
  );
};

export default HomePage;
