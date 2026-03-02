import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProductDetails from './ProductDetails'
import BillingDetails from './BillingDetails'

export default function PriceChecker() {
  const [billingData, setBillingData] = useState(null)

  useEffect(() => {
    document.title = 'Price Checker'
  }, [])

  const handleCalculate = (data) => {
    setBillingData(data)
  }

  const handleReset = () => {
    setBillingData(null)
  }

  return (
    <div className="page-container">
      <h2>Price Checker</h2>
      
      <Container className="price-checker-container mt-4">
        <Row className="g-4">
          <Col md={6}>
            <ProductDetails onCalculate={handleCalculate} onReset={handleReset} />
          </Col>
          <Col md={6}>
            <BillingDetails billingData={billingData} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
