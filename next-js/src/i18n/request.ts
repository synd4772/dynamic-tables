import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  // @ts-expect-error: dsaaaaaaadddddddasd
  if (!routing.locales.includes(locale)) notFound();
 
  return {
    messages: (await import(`../../translations/${locale}.json`)).default
  };
});