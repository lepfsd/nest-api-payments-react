import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Route, Routes, Link} from 'react-router-dom';
import { UsersComponent } from './UsersComponent';
import { PaymentsComponent } from './PaymentsComponent';
import Dashboard from './Dashboard';
import LoginForm from './LoginFrom';
import { useNavigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

function NavbarComponent() {
  const isAuthenticated = sessionStorage.getItem('authToken');
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    navigate('/login');
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand><Link to="/">React-Bootstrap</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && <Nav.Link ><Link to="/">Home</Link></Nav.Link>}
            {isAuthenticated && <Nav.Link ><Link to="/users">Users</Link></Nav.Link>}
            {isAuthenticated && <Nav.Link><Link to="/payments">Payments</Link></Nav.Link>}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              {!isAuthenticated && <NavDropdown.Item><Link to="/login">login</Link></NavDropdown.Item>}
              {isAuthenticated && <NavDropdown.Item href="#" onClick={handleLogout}>
                logout
              </NavDropdown.Item>}
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route
        path='/' 
        element= {<Dashboard/>}
      />
      <Route 
        path='/users' 
        element= {<UsersComponent/>}
      />
      <Route 
        path='/payments' 
        element= {<PaymentsComponent/>}
      />
      <Route path='/login' element= {<LoginForm/>}/>

    </Routes>
    <ProtectedRoutes />
    </>
    
  );
}

export default NavbarComponent;