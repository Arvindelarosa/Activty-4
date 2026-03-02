import { Card, ListGroup } from 'react-bootstrap'
import { FaReceipt, FaMoneyBillWave, FaGem } from 'react-icons/fa'

export default function BillingDetails({ billingData }) {
  // Conditional rendering - only show if billingData exists
  if (!billingData) {
    return null
  }

  return (
    <div className="billing-details-card">
      <Card className="shadow-lg border-primary">
        <Card.Header className="bg-gradient-header text-white d-flex align-items-center justify-content-center">
          <FaReceipt className="me-2 neon-icon" />
          <Card.Title className="mb-0">
            Billing Details
          </Card.Title>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div className="billing-row">
              <span className="label">Product Name:</span>
              <span className="value fw-bold">{billingData.productName}</span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="billing-row">
              <span className="label">Quantity:</span>
              <span className="value fw-bold">{billingData.quantity}</span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="billing-row">
              <span className="label">Unit Price:</span>
              <span className="value fw-bold">₱{billingData.unitPrice.toFixed(2)}</span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="bg-success text-white billing-total-item">
            <div className="billing-row billing-total">
              <span className="label fw-bold">Total Price:</span>
              <span className="value fw-bold fs-5">
                ₱{billingData.totalPrice.toFixed(2)} <FaMoneyBillWave className="ms-1 neon-icon" />
              </span>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  )
}
