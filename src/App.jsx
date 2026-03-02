import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { useTheme } from './utils/theme'
import './App.css'
import HomePage from './components/HomePage'
import PriceChecker from './components/PriceChecker'
import ApiPractice from './components/ApiPractice'

// Main Layout Component
export function MainLayout() {
  const { dark, toggle } = useTheme()

  return (
    <div className="layout-container">
      <Navbar bg={dark ? "dark" : "primary"} variant={dark ? "dark" : "dark"} expand="lg" sticky="top" className="navbar-custom shadow">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-light">
            Price Checker App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-3 align-items-center">
              <Nav.Link as={Link} to="/" className="nav-link-custom">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/price-checker" className="nav-link-custom">
                Price Checker
              </Nav.Link>
              <Nav.Link as={Link} to="/api-practice" className="nav-link-custom">
                API Practice
              </Nav.Link>
              <Button variant={dark ? "secondary" : "light"} size="sm" onClick={toggle} className="ms-3">
                {dark ? "Light Mode" : "Dark Mode"}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="main-content">
        <Container>
          <Outlet />
        </Container>
      </main>

      <footer className="footer bg-dark text-white text-center py-4 mt-5">
        <p className="mb-0">© 2026 Price Checker Application | Built with React & Bootstrap</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/price-checker" element={<PriceChecker />} />
          <Route path="/api-practice" element={<ApiPractice />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
