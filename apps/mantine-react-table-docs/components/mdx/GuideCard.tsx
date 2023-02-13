import React from 'react';
import { Card, Title } from '@mantine/core';
import Link from 'next/link';

interface Props {
  title: string;
  href: string;
}

export const GuideCard = ({ href, title }: Props) => {
  return (
    <Link href={href}>
      <Card
        withBorder
        shadow="xs"
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
            fontSize: '1.15rem',
          })}
          order={4}
        >
          {title}
        </Title>
      </Card>
    </Link>
  );
};
