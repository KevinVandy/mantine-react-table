import Head from 'next/head';
import { Accordion, Box, Title } from '@mantine/core';
import classes from './FAQs.module.css';
interface FAQStructuredData {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

interface Props {
  faqStructuredData: FAQStructuredData;
}

export const FAQs = ({ faqStructuredData }: Props) => {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      </Head>
      <Accordion variant="separated">
        {faqStructuredData.mainEntity.map((faq, index) => (
          <Accordion.Item key={index} value={faq.name}>
            <Accordion.Control>
              <Title order={4}>{faq.name}</Title>
            </Accordion.Control>
            <Accordion.Panel className={classes.panel}>
              <Box
                dangerouslySetInnerHTML={{ __html: faq.acceptedAnswer.text }}
              ></Box>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};
