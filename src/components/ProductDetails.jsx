import { useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import confetti from 'canvas-confetti'
import { useAlert } from './AlertProvider'
import { alertSuccess, alertError } from '../utils/sweetAlert'

export default function ProductDetails({ onCalculate, onReset }) {
  const [productName, setProductName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const { showAlert, AlertComponent } = useAlert()

  const handleCalculate = () => {
    if (productName.trim() && quantity && unitPrice) {
      const totalPrice = parseFloat(quantity) * parseFloat(unitPrice)
      onCalculate({
        productName,
        quantity: parseFloat(quantity),
        unitPrice: parseFloat(unitPrice),
        totalPrice
      })
      showAlert('Price calculated successfully!', 'success', 3000)
      alertSuccess('Price calculated successfully!')
      // explosive confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } else {
      showAlert('Please fill in all fields', 'warning', 4000)
      alertError('Please fill in all fields')
    }
  }

  const handleReset = () => {
    setProductName('')
    setQuantity('')
    setUnitPrice('')
    onReset()
    showAlert('Reset complete', 'info', 2000)
    alertSuccess('Reset complete')
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.4 }
    })
  }

  return (
    <div className="product-details-card">
      <AlertComponent />
      <h3>Product Details</h3>
      
      <Form className="product-form">
        <Form.Group className="mb-3">
          <Form.Label htmlFor="productName">Product Name:</Form.Label>
          <Form.Control
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="quantity">Quantity:</Form.Label>
          <Form.Control
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            min="1"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="unitPrice">Unit Price:</Form.Label>
          <Form.Control
            type="number"
            id="unitPrice"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            placeholder="Enter unit price"
            min="0"
            step="0.01"
          />
        </Form.Group>

        <div className="button-group">
          <Button variant="primary" onClick={handleCalculate} size="lg">
            Calculate
          </Button>
          <Button variant="secondary" onClick={handleReset} size="lg">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  )
}
