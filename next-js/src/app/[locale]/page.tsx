import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div className="main-container" data-testid="home-page-container" style={{ textAlign: 'center' }}>
      <div>
        |__:)__/
      </div>
      <h1>{t('title')}</h1>
      
      <div style={{ padding: 20 }} >
        <Link style={{ textDecoration: 'underline' }}  href={'/documents'} >{t('documents')}</Link>
      </div>

      <div style={{ padding: 10 }} >
        <Link style={{ padding: 10 }} href={'/'} locale="en" >EN</Link>
        <Link style={{ padding: 10 }} href={'/'} locale="ru">RU</Link>
      </div>

    </div>
  );
}
