import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const AddComment = ({ episodeId, mutate }) => {
  
  const { register, handleSubmit, errors, reset } = useForm();
  const [commenting, setCommenting] = useState(false);
  
  const commentFunc = (data) => {
    setCommenting(true);
    axios.post(`/api/user/episode/${episodeId}`, data)
      .then(res => {
        setCommenting(false);
        reset();
        mutate(res.data.comments);
      })
  }
  
  return (
    <Form onSubmit={handleSubmit(commentFunc)}>
      <Form.Row>
      
        <Form.Group as={Col} xs={12} sm={9} className="mb-sm-0">
          <Form.Control 
            placeholder="Add comment..." 
            name="content"
            disabled={commenting}
            isInvalid={errors.content}
            ref={register({
              required: 'Please enter a comment'
            })}
          />
          <Form.Control.Feedback type="invalid">{errors?.content?.message}</Form.Control.Feedback>
        </Form.Group>
        
        <Col xs={12} sm={3} className="d-flex align-items-stretch">
          <Button 
            type="submit" 
            block
            disabled={commenting}
          >
            {commenting ? 'Commenting...' : 'Comment'}
          </Button>
        </Col>
        
      </Form.Row>
    </Form>
  )
}

export default AddComment;