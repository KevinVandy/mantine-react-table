import React, { FC } from 'react';
import { Card, Title } from '@mantine/core';
import Link from 'next/link';

interface Props {
  title: string;
  href: string;
}

export const GuideCard: FC<Props> = ({ href, title }) => {
  return (
    <Link href={href}>
      <Card
        shadow="xl"
        sx={() => ({
          transition: 'box-shadow 100ms ease-in-out',
          '&:hover': {
            boxShadow: `1px 4px 8px gray`,
          },
        })}
      >
        <Title
          ta="center"
          sx={(theme) => ({
            fontSize: '1.25rem',
          })}
          order={4}
        >
          {title}
        </Title>
      </Card>
    </Link>
  );
};
