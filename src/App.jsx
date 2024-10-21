import NavbarComponent from './components/NavbarComponent';
import { Container} from 'react-bootstrap';
import { BrowserRouter as Router} from 'react-router-dom';

function App() {

  return (
    <Router>
        <Container fluid className="p-3">
          <NavbarComponent />
        </Container>
    </Router>
  )
}

export default App
