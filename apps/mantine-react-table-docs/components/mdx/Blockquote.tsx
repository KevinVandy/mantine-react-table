import { Blockquote as MantineBlockquote } from '@mantine/core';
import classes from './Blockquote.module.css';

export const Blockquote = (props) => {
  return (
    <MantineBlockquote icon={null} className={classes.blockquote} {...props} />
  );
};
