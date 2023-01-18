import { Card, Stack, Title } from '@mantine/core';
import { getPrimaryShade } from 'mantine-react-table/src/column.utils';
import Image from 'next/image';

const cardData = [
  {
    text: 'High-quality and performant modern table features with a minimal amount of effort',
    image: '/quality.svg',
    alt: 'Quality',
  },
  {
    text: 'Great defaults, with customization treated as a top priority',
    image: '/customizable.svg',
    alt: 'Customizable',
  },
  {
    text: 'Easy to opt out of features or UI that you do not need',
    image: '/opt-out.svg',
    alt: 'Easy Opt-out',
  },
  {
    text: 'Efficient bundle size (41kb minzipped, including dependencies)',
    image: '/efficient.svg',
    alt: 'Efficient',
  },
];

export const HomeCards = () => {
  return (
    <Stack sx={{ marginTop: '16px', gap: '16px' }}>
      {cardData.map((cd, index) => (
        <Card
          key={index}
          sx={(theme) => ({
            alignItems: 'center',
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
            display: 'flex',
            gap: '24px',
            padding: '16px',
          })}
        >
          <Image
            src={cd.image}
            alt={cd.text}
            height={50}
            width={50}
            style={{ filter: 'hue-rotate(295deg) brightness(1.25)' }}
          />
          <Title order={5}>{cd.text}</Title>
        </Card>
      ))}
    </Stack>
  );
};
