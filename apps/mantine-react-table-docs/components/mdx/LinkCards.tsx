import { Box, Card, Text, Title, Anchor } from '@mantine/core';
import Image from 'next/image';
import classes from './LinkCards.module.css';

const cardData = [
  {
    text: 'NPM',
    image: '/npm.svg',
    href: 'https://www.npmjs.com/package/mantine-react-table',
  },
  {
    text: 'Source Code',
    image: '/source-code.svg',
    href: 'https://github.com/kevinvandy/mantine-react-table',
  },
  {
    text: 'GitHub Issues',
    image: '/github-issues.svg',
    href: 'https://github.com/kevinvandy/mantine-react-table/issues',
  },
  {
    text: 'Discord',
    image: '/discord.svg',
    href: 'https://discord.gg/5wqyRx6fnm',
  },
  {
    text: 'Storybook',
    image: '/storybook.svg',
    href: 'https://mantine-react-table.dev',
  },
];

export const LinkCards = () => {
  return (
    <Box className={classes.wrapper}>
      <Title className={classes.title} order={3}>
        Important Links
      </Title>
      <Box className={classes.wrapper2}>
        {cardData.map((cd, index) => (
          <Anchor
            key={index}
            href={cd.href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.anchor}
          >
            <Card shadow="md" withBorder className={classes.card}>
              <Image
                src={cd.image}
                alt={cd.text}
                width={60}
                height={60}
                style={{ filter: 'hue-rotate(295deg) brightness(1.25)' }}
              />
              <Text>{cd.text}</Text>
            </Card>
          </Anchor>
        ))}
      </Box>
    </Box>
  );
};
