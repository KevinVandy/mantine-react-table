import { Blockquote as MantineBlockquote } from '@mantine/core';
import { getPrimaryColor } from 'mantine-react-table/src/column.utils';

export const Blockquote = (props) => {
  return (
    <MantineBlockquote
      icon={null}
      sx={(theme) => ({
        borderLeft: `solid 8px ${theme.fn.rgba(
          theme.fn.darken(getPrimaryColor(theme), 0.2),
          0.6,
        )}`,
        padding: '8px 16px',
        backgroundColor: theme.fn.rgba(getPrimaryColor(theme), 0.05),
        borderRadius: '4px',
        margin: '3rem',
        '@media (max-width: 720px)': {
          margin: '16px',
        },
      })}
      {...props}
    />
  );
};
