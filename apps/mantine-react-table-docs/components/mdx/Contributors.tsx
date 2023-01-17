import { Box, Card, Text, Anchor } from '@mantine/core';
import { getPrimaryShade } from 'mantine-react-table/src/column.utils';
import Image from 'next/image';

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
    <Box
      sx={{
        marginTop: '4rem',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          padding: '16px 150px 3rem 150px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
          '@media(max-width: 900px)': {
            padding: '16px 16px 2rem 16px',
          },
        }}
      >
        {cardData.map((cd, index) => (
          <Anchor
            key={index}
            href={cd.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: 'none' }}
          >
            <Card
              sx={(theme) => ({
                alignItems: 'center',
                borderRadius: '8px',
                color: theme.colors[theme.primaryColor][getPrimaryShade(theme)],
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                minWidth: '200px',
                minHeight: '200px',
                gap: '16px',
                justifyContent: 'center',
                padding: '16px',
                textAlign: 'center',
                width: '10rem',
                '&:hover': {
                  boxShadow: `1px 4px 8px black`,
                  '& img': {
                    transform: 'scale(1.01)',
                    transition: 'transform 100ms ease-in-out',
                  },
                },
              })}
            >
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
    </Box>
  );
};
