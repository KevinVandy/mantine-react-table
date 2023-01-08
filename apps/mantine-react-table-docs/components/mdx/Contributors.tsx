import { Box, Card, Text, Anchor } from '@mantine/core';
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
          padding: '1rem 150px 3rem 150px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          '@media(max-width: 900px)': {
            padding: '1rem 16px 2rem 16px',
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
                borderRadius: '0.5rem',
                color: theme.colors.blue[7],
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                minWidth: '200px',
                minHeight: '200px',
                gap: '1rem',
                justifyContent: 'center',
                padding: '1rem',
                textAlign: 'center',
                width: '10rem',
                '&:hover': {
                  boxShadow: `1px 4px 8px black`,
                  '& img': {
                    transform: 'scale(1.01)',
                    transition: 'transform 150ms ease-in-out',
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
