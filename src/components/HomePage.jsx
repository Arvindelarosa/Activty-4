import { useEffect } from 'react'
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap'

export default function HomePage() {
  useEffect(() => {
    document.title = 'Home'
  }, [])

  return (
    <div className="page-container">
      <h2 className="mb-4">Welcome to Price Checker App</h2>
      
      <Container className="concepts-section">
        <h3 className="mb-4">Concepts Covered</h3>
        
        <Row className="g-4">
          <Col md={6}>
            <Card className="h-100 shadow-sm border-0 concept-card">
              <Card.Header className="bg-primary text-white">
                <Card.Title className="mb-0">Conditional Rendering</Card.Title>
              </Card.Header>
              <Card.Body>
                <p>
                  Conditional rendering allows us to show or hide components based on certain conditions.
                  In React, we use ternary operators, logical AND operators, or if-else statements to control
                  what gets displayed. For example, showing the BillingDetails component only after the Calculate
                  button is clicked is a form of conditional rendering.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 shadow-sm border-0 concept-card">
              <Card.Header className="bg-success text-white">
                <Card.Title className="mb-0">UseEffects</Card.Title>
              </Card.Header>
              <Card.Body>
                <p>
                  The useEffect hook is used to handle side effects in functional components. Side effects include
                  data fetching, subscriptions, and manual DOM manipulation. It runs after the component renders and
                  can run on component mount, on dependency changes, or on cleanup. We use useEffect to update the
                  document title and fetch data from APIs in this application.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 shadow-sm border-0 concept-card">
              <Card.Header className="bg-info text-white">
                <Card.Title className="mb-0">Routing Components</Card.Title>
              </Card.Header>
              <Card.Body>
                <p>
                  React Router provides components for client-side navigation such as:
                </p>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>BrowserRouter:</strong> Wraps the entire app to enable routing</ListGroup.Item>
                  <ListGroup.Item><strong>Routes:</strong> Container for multiple Route components</ListGroup.Item>
                  <ListGroup.Item><strong>Route:</strong> Maps a path to a component</ListGroup.Item>
                  <ListGroup.Item><strong>Link:</strong> Navigation component that acts like an anchor tag</ListGroup.Item>
                  <ListGroup.Item><strong>Outlet:</strong> Placeholder for nested route components</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 shadow-sm border-0 concept-card">
              <Card.Header className="bg-warning text-white">
                <Card.Title className="mb-0">HTTP Requests with Axios</Card.Title>
              </Card.Header>
              <Card.Body>
                <p>
                  Axios is a popular HTTP client library for making requests to APIs. It supports all HTTP methods:
                  <strong> GET</strong> (fetch data), 
                  <strong> POST</strong> (create data), 
                  <strong> PUT</strong> (update data), and 
                  <strong> DELETE</strong> (remove data).
                  We use Axios in the ApiPractice component to demonstrate all CRUD operations with proper error handling.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="navigation-guide mt-5">
        <Card className="border-success shadow-sm">
          <Card.Header className="bg-success text-white">
            <Card.Title className="mb-0">Navigate to:</Card.Title>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Price Checker:</strong> Calculate product prices with total billing details
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>API Practice:</strong> Perform CRUD operations (Create, Read, Update, Delete) on data using HTTP requests
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
    </div>
  )
}
