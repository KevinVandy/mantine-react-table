import { Box, Card, Text, Title, Anchor } from '@mantine/core';
import Image from 'next/image';

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
    <Box
      sx={{
        marginTop: '4rem',
        textAlign: 'center',
      }}
    >
      <Title sx={{ padding: '16px' }} order={3}>
        Important Links
      </Title>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
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
              shadow="md"
              withBorder
              sx={(theme) => ({
                alignItems: 'center',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100px',
                fontWeight: 'bold',
                gap: '16px',
                justifyContent: 'center',
                padding: '16px',
                width: '10rem',
                '&:hover': {
                  boxShadow: `1px 4px 8px gray`,
                  '& img': {
                    transform: 'scale(1.01)',
                    transition: 'transform 150ms ease-in-out',
                  },
                },
              })}
            >
              <Image
                src={cd.image}
                alt={cd.text}
                width={60}
                height={60}
                style={{ filter: 'hue-rotate(175deg) brightness(1.5)' }}
              />
              <Text>{cd.text}</Text>
            </Card>
          </Anchor>
        ))}
      </Box>
    </Box>
  );
};
