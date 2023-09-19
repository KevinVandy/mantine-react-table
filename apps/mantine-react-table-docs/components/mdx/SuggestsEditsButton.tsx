import { Anchor, Button, Stack, Text } from '@mantine/core';
import { IconBrandGithub, IconEdit } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { usePlausible } from 'next-plausible';
import classes from './SuggestsEditButton.module.css';

export const SuggestsEditsButton = () => {
  const { pathname } = useRouter();
  const plausible = usePlausible();

  return (
    <Stack mt="2rem" justify="center">
      <a
        href={`https://github.com/KevinVandy/mantine-react-table/edit/main/apps/mantine-react-table-docs/pages${pathname}${
          ['/'].includes(pathname)
            ? 'index.tsx'
            : ['/docs', '/docs/api', '/docs/examples', '/docs/guides'].includes(
                pathname,
              )
            ? '/index.mdx'
            : '.mdx'
        }`}
        rel="noopener"
        target="_blank"
        style={{ margin: '3rem auto' }}
      >
        <Button
          color="teal"
          rightSection={<IconBrandGithub />}
          leftSection={<IconEdit />}
          onClick={() => plausible('edit-on-github')}
          className={classes.button}
          variant="outline"
        >
          Suggest an Edit for this page on GitHub
        </Button>
      </a>
      <Text className={classes.youCanHelpMakeTheseDocsBetter}>
        You can help make these docs better!{' '}
        <a
          aria-label="Learn how to contribute"
          href="http://makeapullrequest.com"
          target="_blank"
          rel="noopener"
          style={{ marginLeft: '8px' }}
        >
          <img
            alt="PRs are Welcome"
            src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square"
          />
        </a>
      </Text>
      <Text className={classes.materialUi}>
        Using{' '}
        <Anchor
          color="blue.6"
          href="https://mui.com/"
          target="_blank"
          rel="noopener"
        >
          Material-UI
        </Anchor>{' '}
        instead of Mantine?
        <br />
        Check out{' '}
        <Anchor
          href="https://material-react-table.com"
          target="_blank"
          className={classes.materialUiAnchor}
        >
          Material&nbsp;React&nbsp;Table
        </Anchor>
      </Text>
    </Stack>
  );
};
