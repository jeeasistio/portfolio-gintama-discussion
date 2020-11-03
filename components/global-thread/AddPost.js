import { useState } from 'react'
import { Form, Button, Card, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const AddPost = ({ mutate, posts }) => {
  
  const { register, handleSubmit, errors, reset } = useForm();
  const [posting, setPosting] = useState(false);
  
  const addPostFunc = (data) => {
    setPosting(true);
    axios.post('/api/user/posts', data)
      .then(res => {
        setPosting(false);
        reset();
        mutate([ res.data.post, ...posts ]);
      })
  }
  
  return (
    <Card
      as="form" 
      variant="light" 
      bg="light" 
      className="p-4 mb-4" 
      onSubmit={handleSubmit(addPostFunc)}
    >
      <Form.Row>
        
        <Form.Group as={Col} xs={12}>
          <Form.Control 
            placeholder="Add a subject" 
            name="subject"
            disabled={posting}
            isInvalid={errors.subject}
            ref={register({
              required: 'Please add a subject'
            })}
          />
          <Form.Control.Feedback type="invalid">{errors?.subject?.message}</Form.Control.Feedback>
        </Form.Group>
      
        <Form.Group as={Col} xs={12} sm={10} className="mb-sm-0">
          <Form.Control 
            style={{ resize: 'none' }}
            as="textarea" 
            row={3} 
            placeholder="Start a discussion" 
            name="content"
            disabled={posting}
            isInvalid={errors.content}
            ref={register({
              required: 'Please add a content'
            })}
          />
          <Form.Control.Feedback type="invalid">{errors?.content?.message}</Form.Control.Feedback>
        </Form.Group>
        
        <Col xs={12} sm={2} className="d-flex align-items-stretch">
          <Button 
            type="submit" 
            block
            disabled={posting}
          >
            {posting ? 'Posting...' : 'Add Post'}
          </Button>
        </Col>
        
      </Form.Row>
    </Card>
  )
}

export default AddPost;