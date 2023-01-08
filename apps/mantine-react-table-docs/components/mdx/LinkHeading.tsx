import { FC, ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ActionIcon,
  Anchor,
  packSx,
  Sx,
  Title,
  TitleProps,
  Tooltip,
} from '@mantine/core';
import { IconLink } from '@tabler/icons';

interface Props extends TitleProps {
  children: ReactNode | string;
  tableId?: string;
  href?: string;
  sx?: Sx | Sx[];
}

export const LinkHeading: FC<Props> = ({ children, tableId, ...rest }) => {
  const { pathname } = useRouter();

  const [isCopied, setIsCopied] = useState(false);

  const id = `${tableId ? `${tableId}-` : ''}${children
    ?.toString()
    ?.toLowerCase?.()
    ?.replaceAll?.(' ', '-')}`?.replaceAll?.('/', '-');

  const href = `${pathname}#${id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.origin + href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <Link href={href} passHref legacyBehavior>
      <Anchor
        sx={{
          color: 'inherit',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <Title
          className={id.includes('relevant') ? 'relevant' : undefined}
          id={id}
          {...rest}
          sx={[
            { display: 'flex', gap: '1rem', alignItems: 'center' },
            ...packSx(rest.sx),
          ]}
        >
          {children}
          <ActionIcon
            aria-label="Copy link"
            onClick={handleCopy}
            sx={{
              opacity: 0.2,
              transition: 'all 150ms ease',
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <Tooltip
              withinPortal
              withArrow
              label={isCopied ? 'Copied!' : 'Copy Link'}
            >
              <IconLink />
            </Tooltip>
          </ActionIcon>
        </Title>
      </Anchor>
    </Link>
  );
};
