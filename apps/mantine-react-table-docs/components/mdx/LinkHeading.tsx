import { type ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ActionIcon,
  Anchor,
  Title,
  type TitleProps,
  Tooltip,
} from '@mantine/core';
import { IconLink } from '@tabler/icons-react';
import classes from './LinkHeading.module.css';
import clsx from 'clsx';

interface Props extends TitleProps {
  children: ReactNode | string;
  tableId?: string;
  href?: string;
}

export const LinkHeading = ({ children, tableId, ...rest }: Props) => {
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
      <Anchor className={classes.anchor}>
        <Title
          className={clsx(id.includes('relevant') && 'relevant', classes.title)}
          id={id}
          {...rest}
        >
          {children}
          <ActionIcon
            aria-label="Copy link"
            onClick={handleCopy}
            className={classes.actionIcon}
          >
            <Tooltip withinPortal label={isCopied ? 'Copied!' : 'Copy Link'}>
              <IconLink />
            </Tooltip>
          </ActionIcon>
        </Title>
      </Anchor>
    </Link>
  );
};
