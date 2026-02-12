import React from 'react'
import ProductHero from '../components/Products/ProductHero'
import ProductNav from '../components/Products/ProductNav'
import Dynamics from '../components/Products/Dynamics'
import StockSales from '../components/Products/StockSales'
import GST from '../components/Products/GST'
import TCS from '../components/Products/TCS'
import RiceERP from '../components/Products/RiceERP'
import ProductCTA from '../components/Products/ProductCTA'

const Products = () => {
  return (
    <>
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