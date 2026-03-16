import React from 'react'
import ProductHero from '../components/Products/ProductHero'
import ProductNav from '../components/Products/ProductNav'
import Dynamics from '../components/Products/Dynamics'
import StockSales from '../components/Products/StockSales'
import GST from '../components/Products/GST'
import TCS from '../components/Products/TCS'
import RiceERP from '../components/Products/RiceERP'
import ProductCTA from '../components/Products/ProductCTA'
import SEO from "../components/SEO";
import { staticRouteMeta } from "../seo/routes";

const Products = () => {
  const meta = staticRouteMeta["/products"];

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        canonical={meta.canonical}
        prerenderHint={meta.prerender}
      />
      <ProductHero />
      <ProductNav />
      <Dynamics />
      <StockSales />
      <RiceERP />
      <GST />
      {/* <TCS /> */}
      <ProductCTA />
    </>
  )
}

export default Products
