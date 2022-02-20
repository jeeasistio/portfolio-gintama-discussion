import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HFLayout from '../../components/HFLayout'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'

export default function Login() {
  const router = useRouter()
  const { register, handleSubmit, errors, watch } = useForm()
  const [status, setStatus] = useState({})

  const loginFunc = async (data) => {
    setStatus({ status: 'loading', message: 'Logging In...' })

    try {      
      const res = await axios.post('/api/auth/login', data)
      router.push('/episodes-discussion')
    } catch (err) {      
      setStatus({ status: 'error', message: err.response.data.msg })
    }
      
  }

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>

      <HFLayout>
        <div
          style={{ minHeight: '75vh', maxWidth: '500px' }}
          className="d-flex flex-column justify-content-center m-auto p-4"
        >
          <h2>Login</h2>

          {status.status === 'loading' && (
            <Alert
              className="my-2"
              variant="warning"
              onClose={() => setStatus({})}
              dismissible
            >
              {status.message}
            </Alert>
          )}

          {status.status === 'error' && (
            <Alert
              className="my-2"
              variant="danger"
              onClose={() => setStatus({})}
              dismissible
            >
              {status.message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit(loginFunc)}>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                isInvalid={errors.email}
                disabled={status.status === 'loading'}
                ref={register({
                  required: 'Please enter your email'
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                disabled={status.status === 'loading'}
                isInvalid={errors.password}
                ref={register({
                  required: 'Please enter your password'
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              as="input"
              block
              type="submit"
              value="Login"
              disabled={status.status === 'loading'}
            />

            <p>
              Don't have an account yet?
              <Link href="/auth/register">
                <a className="d-inline-block mt-2 ml-1">Register</a>
              </Link>
            </p>
          </Form>
        </div>
      </HFLayout>
    </div>
  )
}
