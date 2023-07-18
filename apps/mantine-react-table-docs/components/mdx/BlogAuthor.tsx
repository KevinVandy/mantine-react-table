import Image from 'next/image';
import { Box, Anchor, Stack, Title, Text } from '@mantine/core';

interface Props {
  author?: string;
  authorImage?: string;
  authorLink?: string;
  publishDate: string;
}

export const BlogAuthor = ({
  author = 'Kevin Van Cott',
  authorImage = '/contributors/kevinvancott.jpg',
  authorLink = 'https://www.kevinvancott.dev',
  publishDate,
}: Props) => {
  return (
    <Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 50px',
          gap: '1rem',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Text fz="14pt">
          By{' '}
          <Anchor
            color="text.primary"
            sx={{
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
            target="_blank"
            rel="noopener noreferrer"
            href={authorLink}
          >
            {author}
          </Anchor>
        </Text>
        <Image
          alt="author"
          src={authorImage}
          width={30}
          height={30}
          style={{ borderRadius: '50%' }}
        />
      </Box>
      <Text color="gray">
        Published: <i>{new Date(publishDate).toLocaleDateString()}</i>
      </Text>
    </Stack>
  );
};
