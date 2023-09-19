import { Box, Card, Text, Anchor } from '@mantine/core';
import Image from 'next/image';
import classes from './Contributors.module.css';

const cardData = [
  {
    name: 'Kevin Van Cott',
    role: 'Maintainer, Developer',
    image: '/contributors/kevinvancott.jpg',
    href: 'https://github.com/KevinVandy',
  },
  {
    name: 'Ryan Kholousi',
    role: 'UI/UX Designer',
    image: '/contributors/ryankholousi.jpeg',
    href: 'https://www.linkedin.com/in/ryan-kholousi-66322979/',
  },
  {
    name: 'Daniel Humphrey',
    role: 'UI/UX, Technical Writer',
    image: '/contributors/danielhumphrey.jpeg',
    href: 'https://www.linkedin.com/in/daniel-humphrey-35945514a/',
  },
];

export const Contributors = () => {
  return (
    <Box className={classes.wrapper}>
      <Box className={classes.wrapper2}>
        {cardData.map((cd, index) => (
          <Anchor
            key={index}
            href={cd.href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.anchor}
          >
            <Card withBorder shadow="xs" className={classes.card}>
              <Image
                src={cd.image}
                alt={cd.name}
                width={170}
                height={170}
                style={{ borderRadius: '4px' }}
              />
              <Text>{cd.name}</Text>
              <Text size="xs">{cd.role}</Text>
            </Card>
          </Anchor>
        ))}
      </Box>
      <div style={{ textAlign: 'center' }}>
        <a
          href="https://github.com/kevinvandy/mantine-react-table/graphs/contributors"
          target="_blank"
          rel="noopener"
        >
          <img
            alt="GitHub Contributors"
            src="https://contrib.rocks/image?repo=kevinvandy/mantine-react-table"
          />
        </a>
      </div>
    </Box>
  );
};
