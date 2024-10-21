
import { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Alert, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, addUsers, deleteUser, updateUser } from '../store/users/usersSlice';
import axios from 'axios';

export const UsersComponent = () => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users.users)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' }) 
    const [loading, setLoading] = useState(true)
    const [idToUpdate, setIdToUpdate] = useState(null)

    function clearFields () {
        setName('')
        setEmail('')
        setUsername('')
        setPassword('')
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/v1/user');
            dispatch(addUsers(response.data));
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [dispatch]);
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(idToUpdate) {
            try {
                await axios.put(`http://localhost:5000/api/v1/user/${idToUpdate}`, { name, email, username, password });
                dispatch(updateUser({ id: idToUpdate, name, email, username, password }))
                setAlert({ show: true, variant: 'success', message: 'User updated!' });
                setIdToUpdate(null)
            } catch (error) {
                console.error('There was an error!', error);
                setAlert({ show: true, variant: 'danger', message: 'error posting!' });
            }
            
        } else {
            const newUser = {
                name, 
                email,
                username,
                password
            }
            try {
                await axios.post('http://localhost:5000/api/v1/user', newUser);
                dispatch(addUser(newUser))
                setAlert({ show: true, variant: 'success', message: 'User added!' });
            } catch (error) {
                console.error('There was an error!', error);
                setAlert({ show: true, variant: 'danger', message: 'error posting!' });
            }
            
        }
        clearFields()
    }

    const handleEdit = (user) => {
        setName(user.name)
        setEmail(user.email)
        setUsername(user.username)
        setIdToUpdate(user._id)

    }
    const handleDelete = async (id) => {
        console.log(id)
        try {
            await axios.delete(`http://localhost:5000/api/v1/user/${id}`);
            dispatch(deleteUser(id));
            setAlert({ show: true, variant: 'success', message: 'User deleted!' });
        } catch (error) {
            console.error('There was an error!', error);
            setAlert({ show: true, variant: 'danger', message: 'error posting!' });
        }
    }

    return (
        <div>
            <>  
                <Row>
                    <Col md={8}><h1>Users</h1> </Col>     
                    {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}         
                    {loading && <p> loading</p>}    
                </Row>
                <Row>
                    <Col md={5}>
                        <Form>
                            <Form.Group >
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                        </Form>
                        <Form>
                            <Form.Group className="mb-8" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                            </Form.Group>
                        </Form>
                        <Form>
                            <Form.Group className="mb-8" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    />
                            </Form.Group>
                        </Form>
                        <Form>
                            <Form.Group className="mb-8" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                            </Form.Group>
                        </Form>
                        <Form>
                            <Button  variant="primary" onClick={handleSubmit}>
                                 {idToUpdate ? 'Actualizar Usuario' : 'Agregar Usuario'}
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
                                <th>username</th>
                                <th>email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>  
                                        <td>{user.username}</td>  
                                        <td>{user.email}</td> 
                                        <td><Button variant="link" onClick={() => handleEdit(user)}>Editar</Button></td>
                                        <td><Button variant="link" onClick={() => handleDelete(user._id)}>Eliminar</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </>
        </div>
    )
}