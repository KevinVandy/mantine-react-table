import { Box } from '@mantine/core';
import { GuideCard } from './GuideCard';

export const PopularDocs = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '1rem',
        '@media (max-width: 1024px)': {
          gridTemplateColumns: '1fr 1fr',
        },
      }}
    >
      <GuideCard title="Props" href="/docs/api/props" />
      <GuideCard title="Basic Example" href="docs/examples/basic" />
      <GuideCard title="Advanced Example" href="docs/examples/advanced" />
      <GuideCard title="Fetching Example" href="docs/examples/react-query" />
      <GuideCard title="Localization" href="docs/guides/localization" />
      <GuideCard title="Create Columns" href="docs/guides/data-columns" />
      <GuideCard title="Column Filtering" href="docs/guides/column-filtering" />
      <GuideCard title="Selection" href="docs/guides/row-selection" />
    </Box>
  );
};
