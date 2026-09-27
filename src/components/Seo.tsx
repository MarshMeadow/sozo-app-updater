import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title: string
  description: string
  image?: string
}

export default function Seo({ title, description, image = '/og-image.svg' }: SeoProps) {
  const site = 'Sozo Updater'
  return (
    <Helmet>
      <title>{`${title} | ${site}`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | ${site}`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={site} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | ${site}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
