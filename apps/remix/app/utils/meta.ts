import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';

export const appMetaTags = (title?: string) => {
  const description =
    'Securely review and sign your document with Naseh — compliance, simplified.';

  const ogImage = `${NEXT_PUBLIC_WEBAPP_URL()}/og-image.png`;

  return [
    {
      title: title ? `${title} | Naseh Sign` : 'Naseh Sign',
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content:
        'Naseh, legal, compliance, contracts, policies, regulatory guidance, e-signature, document signing, Qatar',
    },
    {
      name: 'author',
      content: 'Naseh',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:title',
      content: 'Naseh Sign — Review & sign your document',
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: ogImage,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'Naseh Sign — Review & sign your document',
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: ogImage,
    },
  ];
};
