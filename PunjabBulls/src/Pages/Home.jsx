import CTA from '../components/Home/CTA'
import Hero from '../components/Home/Hero'
import Service from '../components/Home/Service'
import Spotlight from '../components/Home/Spotlight'
import Timeline from '../components/Home/Timeline'
import SEO from "../components/SEO";
import { staticRouteMeta } from "../seo/routes";
import { SITE_URL } from "../seo/site";

const Home = () => {
  const meta = staticRouteMeta["/"];

  return (
    <>
    <SEO
      title={meta.title}
      description={meta.description}
      keywords={meta.keywords}
      canonical={meta.canonical}
      prerenderHint={meta.prerender}
      schema={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "PunjabBulls Technology Pvt. Ltd.",
        url: SITE_URL,
        logo: `${SITE_URL}/og-image.jpg`,
        sameAs: [
          "https://www.linkedin.com/company/punjabbullstechnologypvtltd-relax-erp/posts/?feedView=all",
        ],
      }}
    />
    <Hero/>
    <Service/>
    <Spotlight/>
    <Timeline/>
    {/* <Testimonial/> */}
    <CTA/>
    </>
  )
}

export default Home
