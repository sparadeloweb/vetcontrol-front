// Componentes de React Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Estilos del componente
import './styles.css';

// Componentes necesarios
import LoginForm from './LoginForm';

export default function LoginMain () {
    return (
        <Container fluid className='login__container'>
            <Row>
              <Col sm={12} lg={6} className='login__container_left'>
                <LoginForm />
              </Col>
              <Col sm={12} lg={6} className='login__container_right' />
            </Row>
        </Container>
    )
}