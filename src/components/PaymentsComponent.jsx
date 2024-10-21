import { useEffect, useState} from 'react';
import { Row, Col, Form, Button, Alert, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addPayment, addPayments, deletePayment, updatePayment } from '../store/payments/paymentsSlice';
import axiosInstance from '../axiosConfig';

export const PaymentsComponent = () => {
    const dispatch = useDispatch()
    const payments = useSelector((state) => state.payments.payments)
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [token_secret, setTokenSecret] = useState('')
    const [enabled, setEnabled] = useState(true)
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' }) 
    const [loading, setLoading] = useState(true)
    const [idToUpdate, setIdToUpdate] = useState(null)
    
    const clearFields = () => {
        setName('')
        setUrl('')
        setTokenSecret('')
        setEnabled(true)
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get(`/payment`);
            dispatch(addPayments(response.data));
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, [dispatch]);   

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(idToUpdate) {
            try {
                await axiosInstance.put(`/payment/${idToUpdate}`, {name, url, token_secret, enabled});
                dispatch(updatePayment({id: idToUpdate, name, url, token_secret, enabled}))
                setAlert({ show: true, variant: 'success', message: 'Payment added!' });
            } catch (error) {
                console.error('There was an error!', error);
                setAlert({ show: true, variant: 'danger', message: 'error posting!' });
            }
        }
        else {
            const newPayment = {
                name, 
                url,
                token_secret,
                enabled
            }
            try {
                await axiosInstance.post(`/payment`, newPayment);
                dispatch(addPayment(newPayment))
                setAlert({ show: true, variant: 'success', message: 'Payment added!' });
            } catch (error) {
                console.error('There was an error!', error);
                setAlert({ show: true, variant: 'danger', message: 'error posting!' });
            }
        }
        clearFields()
    }   

    const handleEdit = (payment) => {
        setIdToUpdate(payment._id)
        setName(payment.name)
        setUrl(payment.url)
        setTokenSecret(payment.token_secret)
        setEnabled(payment.enabled)
    }
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/payment/${id}`);
            dispatch(deletePayment(id));
            setAlert({ show: true, variant: 'success', message: 'payment deleted!' });
        } catch (error) {
            console.error('There was an error!', error);
            setAlert({ show: true, variant: 'danger', message: 'error posting!' });
        }
    }

    return (
        <>
           <Row>
                <Col md={8}><h1>Payments</h1> </Col>  
                {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}         
                {loading && <p> loading</p>}         
            </Row>
            <Row>
                <Col md={4}>
                <Form>
                    <Form.Group >
                        <Form.Label>name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>url</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter url" 
                            value={url}
                            onChange={(e) => setUrl(e.target.value)} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>token secret</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter token secret" 
                            value={token_secret}
                            onChange={(e) => setTokenSecret(e.target.value)} />
                    </Form.Group>
                    </Form>
                    <Form>
                        <Button className="mb-4" variant="success" onClick={handleSubmit}>
                            {idToUpdate ? 'update' : 'add'}
                        </Button>
                        <Button  className="mb-4" variant="secondary" onClick={clearFields}>
                            cancel
                        </Button>
                    </Form>
                </Col>
                <Col md={7}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>name</th>
                        <th>url</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id}>
                                <td>{payment.name}</td>  
                                <td>{payment.url}</td>  
                                <td><Button variant="link" onClick={() => handleEdit(payment)}>Editar</Button></td>
                                <td><Button variant="link" onClick={() => handleDelete(payment._id)}>Eliminar</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </Col>
            </Row>
        </>
    )
}