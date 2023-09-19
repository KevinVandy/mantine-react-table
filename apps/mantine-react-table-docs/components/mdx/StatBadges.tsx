import { Flex } from '@mantine/core';
import classes from './StatBadges.module.css';

export const StatBadges = () => {
  return (
    <Flex className={classes.statBadges}>
      <a
        aria-label="NPM Version"
        href="https://npmjs.com/package/mantine-react-table"
        target="_blank_"
      >
        <img
          alt="NPM Version"
          src="https://badgen.net/npm/v/mantine-react-table?color=blue"
        />
      </a>
      <a
        aria-label="Number of Downloads"
        href="https://npmtrends.com/mantine-react-table"
        target="_blank_"
      >
        <img
          alt="Downloads"
          src="https://badgen.net/npm/dt/mantine-react-table?label=installs&icon=npm&color=blue"
        />
      </a>
      <a
        aria-label="Bundle Size"
        href="https://bundlephobia.com/result?p=mantine-react-table"
        target="_blank_"
      >
        <img
          alt="Bundle Size"
          src="https://badgen.net/bundlephobia/minzip/mantine-react-table@latest?color=blue"
        />
      </a>
      <a
        aria-label="GitHub Stars"
        href="https://star-history.com/#kevinvandy/mantine-react-table&Date"
        target="_blank_"
      >
        <img
          alt="GitHub Stars"
          src="https://badgen.net/github/stars/KevinVandy/mantine-react-table?color=blue"
        />
      </a>
      <a
        href="https://github.com/KevinVandy/mantine-react-table/blob/main/LICENSE"
        target="_blank"
        rel="noopener"
      >
        <img
          alt=""
          src="https://badgen.net/github/license/KevinVandy/mantine-react-table?color=blue"
        />
      </a>
    </Flex>
  );
};
