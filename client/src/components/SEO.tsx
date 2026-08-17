import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://ciapafed.org';
const SITE_NAME = 'CIAPAFED';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

type SeoEntry = {
  title: string;
  description: string;
  path: string;
  keywords: string[];
};

const seoEntries: SeoEntry[] = [
  {
    path: '/',
    title: 'CIAPAFED | ONG agriculture familiale et environnement durable en RDC',
    description:
      "CIAPAFED accompagne les communaut\u00e9s rurales de Ma\u00ef-Ndombe et du Kwilu dans l'agriculture familiale, la conservation des for\u00eats et le d\u00e9veloppement durable.",
    keywords: ['CIAPAFED', 'ONG RDC', 'agriculture familiale', 'environnement durable', 'Ma\u00ef-Ndombe', 'Kwilu']
  },
  {
    path: '/a-propos',
    title: '\u00c0 propos de CIAPAFED | ONG congolaise pour les communaut\u00e9s rurales',
    description:
      "D\u00e9couvrez CIAPAFED, le Centre d'Initiative et d'Appui Participatif \u00e0 l'Agriculture Familiale et l'Environnement Durable, actif en RDC depuis 2014.",
    keywords: ['\u00e0 propos CIAPAFED', 'ONG congolaise', 'd\u00e9veloppement durable RDC', 'communaut\u00e9s rurales']
  },
  {
    path: '/domaines',
    title: "Domaines d'intervention | Agroforesterie, conservation et climat",
    description:
      "Explorez les domaines d'intervention de CIAPAFED : agroforesterie, conservation REDD+, climat, am\u00e9nagement durable du territoire, \u00e9ducation et formation.",
    keywords: ['agroforesterie RDC', 'REDD+', 'conservation foresti\u00e8re', 'climat', 'formation communautaire']
  },
  {
    path: '/projets',
    title: 'Projets CIAPAFED | Agriculture, for\u00eats et initiatives communautaires',
    description:
      'Consultez les projets men\u00e9s par CIAPAFED en RDC pour restaurer les paysages, prot\u00e9ger les for\u00eats et renforcer les communaut\u00e9s locales.',
    keywords: ['projets CIAPAFED', 'restauration foresti\u00e8re', 'projets agricoles RDC', 'initiatives communautaires']
  },
  {
    path: '/realisations',
    title: 'R\u00e9alisations CIAPAFED | R\u00e9sultats et exp\u00e9riences de terrain',
    description:
      "Parcourez les r\u00e9alisations de CIAPAFED dans l'agriculture familiale, la conservation, la biodiversit\u00e9, la sensibilisation et la formation.",
    keywords: ['r\u00e9alisations CIAPAFED', 'exp\u00e9riences terrain', 'biodiversit\u00e9 RDC', 'sensibilisation environnementale']
  },
  {
    path: '/ressources',
    title: 'Ressources CIAPAFED | Documents, rapports et publications',
    description:
      'Acc\u00e9dez aux documents, rapports et ressources institutionnelles publi\u00e9s par CIAPAFED sur ses actions en RDC.',
    keywords: ['ressources CIAPAFED', 'rapports ONG', 'documents agriculture', 'publications environnement']
  },
  {
    path: '/actualites',
    title: 'Actualit\u00e9s CIAPAFED | Activit\u00e9s, projets et publications',
    description:
      'Suivez les actualit\u00e9s, formations, activit\u00e9s de terrain et publications de CIAPAFED en agriculture familiale et environnement durable.',
    keywords: ['actualit\u00e9s CIAPAFED', 'activit\u00e9s ONG RDC', 'formations agricoles', 'publications CIAPAFED']
  },
  {
    path: '/galerie',
    title: 'Galerie CIAPAFED | Photos des activit\u00e9s de terrain',
    description:
      'D\u00e9couvrez en images les activit\u00e9s, projets, formations et interventions communautaires de CIAPAFED en RDC.',
    keywords: ['galerie CIAPAFED', 'photos ONG RDC', 'activit\u00e9s terrain', 'communaut\u00e9s rurales']
  },
  {
    path: '/partenaires',
    title: 'Partenaires CIAPAFED | Bailleurs et collaborations',
    description:
      'D\u00e9couvrez les partenaires, bailleurs et organisations qui accompagnent CIAPAFED dans ses actions de d\u00e9veloppement durable en RDC.',
    keywords: ['partenaires CIAPAFED', 'bailleurs RDC', 'collaboration ONG', 'd\u00e9veloppement durable']
  },
  {
    path: '/contact',
    title: 'Contact CIAPAFED | Partenariats et informations',
    description:
      "Contactez CIAPAFED pour une demande d'information, une proposition de partenariat ou une collaboration autour de projets durables en RDC.",
    keywords: ['contact CIAPAFED', 'partenariat ONG', 'ONG agriculture RDC', 'collaboration environnement']
  }
];

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertJsonLd(id: string, data: object) {
  let element = document.head.querySelector<HTMLScriptElement>(`script#${id}`);

  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.text = JSON.stringify(data);
}

function resolveSeo(pathname: string): SeoEntry {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  const exact = seoEntries.find((entry) => entry.path === normalizedPath);

  if (exact) return exact;

  if (normalizedPath.startsWith('/projets/')) {
    return {
      path: normalizedPath,
      title: 'Projet CIAPAFED | D\u00e9tails et r\u00e9sultats',
      description:
        "D\u00e9couvrez les objectifs, zones d'intervention, partenaires et r\u00e9sultats associ\u00e9s \u00e0 ce projet men\u00e9 par CIAPAFED en RDC.",
      keywords: ['projet CIAPAFED', 'd\u00e9veloppement durable RDC', 'agriculture familiale', 'conservation']
    };
  }

  if (normalizedPath.startsWith('/actualites/')) {
    return {
      path: normalizedPath,
      title: 'Actualit\u00e9 CIAPAFED | Activit\u00e9s et publications',
      description:
        'Lisez cette publication de CIAPAFED sur ses activit\u00e9s de terrain, ses projets et ses actions aupr\u00e8s des communaut\u00e9s rurales.',
      keywords: ['actualit\u00e9 CIAPAFED', 'publication ONG', 'activit\u00e9 terrain', 'communaut\u00e9s rurales']
    };
  }

  return {
    path: normalizedPath,
    title: 'Page introuvable | CIAPAFED',
    description: "La page demand\u00e9e est introuvable. Retrouvez les informations officielles de CIAPAFED depuis la page d'accueil.",
    keywords: ['CIAPAFED', 'ONG RDC']
  };
}

function SEO() {
  const location = useLocation();
  const seo = useMemo(() => resolveSeo(location.pathname), [location.pathname]);
  const canonicalUrl = `${SITE_URL}${seo.path === '/' ? '' : seo.path}`;

  useEffect(() => {
    document.documentElement.lang = 'fr';
    document.title = seo.title;

    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'keywords', seo.keywords.join(', '));
    upsertMeta('name', 'author', SITE_NAME);
    upsertMeta('name', 'robots', seo.path.startsWith('/admin') ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('name', 'theme-color', '#1f4f37');
    upsertMeta('property', 'og:locale', 'fr_FR');
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', DEFAULT_IMAGE);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', DEFAULT_IMAGE);
    upsertLink('canonical', canonicalUrl);

    upsertJsonLd('ciapafed-organization-schema', {
      '@context': 'https://schema.org',
      '@type': 'NGO',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      email: 'ongdciapafed@gmail.com',
      telephone: '+243813393919',
      description:
        "ONG congolaise d'appui participatif \u00e0 l'agriculture familiale, \u00e0 la conservation des ressources naturelles et \u00e0 l'environnement durable.",
      areaServed: ['R\u00e9publique d\u00e9mocratique du Congo', 'Ma\u00ef-Ndombe', 'Kwilu'],
      foundingDate: '2014'
    });

    upsertJsonLd('ciapafed-page-schema', {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo.title,
      url: canonicalUrl,
      description: seo.description,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL
      }
    });
  }, [canonicalUrl, seo]);

  return null;
}

export default SEO;
