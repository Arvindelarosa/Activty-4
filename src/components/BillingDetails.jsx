import { Card, ListGroup } from 'react-bootstrap'

export default function BillingDetails({ billingData }) {
  // Conditional rendering - only show if billingData exists
  if (!billingData) {
    return null
  }

  return (
    <div className="billing-details-card">
      <Card className="shadow-lg border-primary">
        <Card.Header className="bg-primary text-white">
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
          <ListGroup.Item className="bg-success text-white">
            <div className="billing-row billing-total">
              <span className="label fw-bold">Total Price:</span>
              <span className="value fw-bold fs-5">₱{billingData.totalPrice.toFixed(2)}</span>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  )
}
