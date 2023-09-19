import { Text } from '@mantine/core';
import clsx from 'clsx';
import classes from './Paragraph.module.css';

export function Paragraph(props: any) {
  return (
    <Text className={clsx('docsearch-content', classes.paragraph)} {...props} />
  );
}
