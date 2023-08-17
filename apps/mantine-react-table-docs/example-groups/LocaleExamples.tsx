import { useState } from 'react';
import { Tabs, Box } from '@mantine/core';
import AR_Table from '../examples/localization-i18n-ar';
import BG_Table from '../examples/localization-i18n-bg';
import CS_Table from '../examples/localization-i18n-cs';
import DA_Table from '../examples/localization-i18n-da';
import DE_Table from '../examples/localization-i18n-de';
import EN_Table from '../examples/localization-i18n-en';
import ES_Table from '../examples/localization-i18n-es';
import ET_Table from '../examples/localization-i18n-et';
import FA_Table from '../examples/localization-i18n-fa';
import FI_Table from '../examples/localization-i18n-fi';
import FR_Table from '../examples/localization-i18n-fr';
import HU_Table from '../examples/localization-i18n-hu';
import ID_Table from '../examples/localization-i18n-id';
import IT_Table from '../examples/localization-i18n-it';
import JA_Table from '../examples/localization-i18n-ja';
import KO_Table from '../examples/localization-i18n-ko';
import NL_Table from '../examples/localization-i18n-nl';
import NO_TABLE from '../examples/localization-i18n-no';
import PL_Table from '../examples/localization-i18n-pl';
import PT_BR_Table from '../examples/localization-i18n-pt-BR';
import PT_Table from '../examples/localization-i18n-pt';
import RO_Table from '../examples/localization-i18n-ro';
import RU_Table from '../examples/localization-i18n-ru';
import SK_Table from '../examples/localization-i18n-sk';
import SR_Cyrl_RS_Table from '../examples/localization-i18n-sr-Cyrl-RS';
import SR_Latn_RS_Table from '../examples/localization-i18n-sr-Latn-RS';
import SV_Table from '../examples/localization-i18n-sv';
import TR_Table from '../examples/localization-i18n-tr';
import UK_Table from '../examples/localization-i18n-uk';
import VI_Table from '../examples/localization-i18n-vi';
import ZH_HANS_Table from '../examples/localization-i18n-zh-hans';
import ZH_HANT_Table from '../examples/localization-i18n-zh-hant';

const supportedLocales = [
  'ar',
  'bg',
  'cs',
  'da',
  'de',
  'en',
  'es',
  'et',
  'fa',
  'fi',
  'fr',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'nl',
  'no',
  'pl',
  'pt',
  'pt-BR',
  'ro',
  'ru',
  'sk',
  'sr-Cyrl-RS',
  'sr-Latn-RS',
  'sv',
  'tr',
  'uk',
  'vi',
  'zh-Hans',
  'zh-Hant',
];

const LocaleExamples = () => {
  const [currentLocale, setCurrentLocale] = useState<string | null>('es');

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Tabs onTabChange={setCurrentLocale} value={currentLocale}>
          <Tabs.List>
            {supportedLocales.map((locale) => (
              <Tabs.Tab key={locale} value={locale}>
                {locale}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </Box>
      <Box sx={{ minHeight: '1500px' }} lang={currentLocale ?? 'en'}>
        {currentLocale === 'ar' && <AR_Table />}
        {currentLocale === 'bg' && <BG_Table />}
        {currentLocale === 'cs' && <CS_Table />}
        {currentLocale === 'da' && <DA_Table />}
        {currentLocale === 'de' && <DE_Table />}
        {currentLocale === 'en' && <EN_Table />}
        {currentLocale === 'es' && <ES_Table />}
        {currentLocale === 'et' && <ET_Table />}
        {currentLocale === 'fa' && <FA_Table />}
        {currentLocale === 'fi' && <FI_Table />}
        {currentLocale === 'fr' && <FR_Table />}
        {currentLocale === 'hu' && <HU_Table />}
        {currentLocale === 'id' && <ID_Table />}
        {currentLocale === 'it' && <IT_Table />}
        {currentLocale === 'ja' && <JA_Table />}
        {currentLocale === 'ko' && <KO_Table />}
        {currentLocale === 'nl' && <NL_Table />}
        {currentLocale === 'pl' && <PL_Table />}
        {currentLocale === 'pt' && <PT_Table />}
        {currentLocale === 'pt-BR' && <PT_BR_Table />}
        {currentLocale === 'ro' && <RO_Table />}
        {currentLocale === 'ru' && <RU_Table />}
        {currentLocale === 'sk' && <SK_Table />}
        {currentLocale === 'sr-Cyrl-RS' && <SR_Cyrl_RS_Table />}
        {currentLocale === 'sr-Latn-RS' && <SR_Latn_RS_Table />}
        {currentLocale === 'sv' && <SV_Table />}
        {currentLocale === 'tr' && <TR_Table />}
        {currentLocale === 'uk' && <UK_Table />}
        {currentLocale === 'vi' && <VI_Table />}
        {currentLocale === 'zh-Hans' && <ZH_HANS_Table />}
        {currentLocale === 'zh-Hant' && <ZH_HANT_Table />}
        {currentLocale === 'no' && <NO_TABLE />}
      </Box>
    </>
  );
};

export default LocaleExamples;
