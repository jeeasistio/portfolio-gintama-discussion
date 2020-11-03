import Head from 'next/head'
import Link from 'next/link'
import HFLayout from '../../components/HFLayout'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'

export default function Register() {
  
  const { register, handleSubmit, errors, watch } = useForm();
  const [status, setStatus] = useState({});
  
  const watchedPass = watch('password');
  
  const registerFunc = (data) => {
    setStatus({ status: 'loading', message: 'Processing...' })
    axios.post('/api/auth/register', data)
      .then(res => setStatus({ status: 'success', message: res.data.msg }))
      .catch(err => setStatus({ status: 'error', message: err.response.data.msg }))
  }
  
  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      
      <HFLayout>
        <Container 
          style={{ minHeight: '75vh' }} 
          className="d-flex flex-column justify-content-center my-4" 
          fluid="md"
        >
          <h2>Register</h2>
        
          {status.status === 'loading' && 
            <Alert className="my-2" variant="warning" onClose={() => setStatus({})} dismissible>
              {status.message}
            </Alert>
          }
          
          {status.status === 'success' && 
            <Alert className="my-2" variant="success" onClose={() => setStatus({})} dismissible>
              {status.message} <Alert.Link href="/auth/login">Login now.</Alert.Link>
            </Alert>
          }
          
          {status.status === 'error' && 
            <Alert className="my-2" variant="danger" onClose={() => setStatus({})} dismissible>
              {status.message}
            </Alert>
          }
          
          <Form onSubmit={handleSubmit(registerFunc)}>
            <Form.Group>
              <Form.Control
                placeholder="Username"
                name="username"
                disabled={status.status === 'loading'}
                isInvalid={errors.username}
                ref={register({
                  required: 'Please enter a username',
                  minLength: {
                    value: 6,
                    message: 'Username too short'
                  },
                  maxLength: {
                    value: 15,
                    message: 'Username too long'
                  }
                })}
              />
              <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                disabled={status.status === 'loading'}
                isInvalid={errors.email}
                ref={register({
                  required: 'Please enter an email'
                })} 
              />
              <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                disabled={status.status === 'loading'}
                isInvalid={errors.password}
                ref={register({
                  required: 'Please enter a password',
                  minLength: {
                    value: 8,
                    message: 'Password too short'
                  },
                  maxLength: {
                    value: 20,
                    message: 'Password too long'
                  }
                })}
              />
              <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group>
              <Form.Control
                type="password" 
                placeholder="Confirm Password"
                name="confirm_password"
                disabled={status.status === 'loading'}
                isInvalid={errors.confirm_password}
                ref={register({
                  validate: value => value === watchedPass || 'Passwords do not match'
                })} 
              />
              <Form.Control.Feedback type="invalid">{errors.confirm_password?.message}</Form.Control.Feedback>
            </Form.Group>
            
            <Button 
              as="input" 
              block 
              type="submit" 
              value="Register" 
              disabled={status.status === 'loading'}
            />
            
            <p>Have an account already?
              <Link href="/auth/login">
                <a className="d-inline-block mt-2 ml-1">Login</a>
              </Link>
            </p>
          </Form>
        </Container>
      </HFLayout>
    </div>
  )
}
