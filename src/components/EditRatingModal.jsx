import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { rateItemAsync } from '../redux/items/thunks'
import { useDispatch } from 'react-redux'

import '../styles.css'

const RATINGS = [
  { id: '1', name: '1' },
  { id: '2', name: '2' },
  { id: '3', name: '3' },
  { id: '4', name: '4' },
  { id: '5', name: '5' }
]

export default function EditRatingModal (props) {
  const dispatch = useDispatch()

  const itemId = props.id

  const ratingDropdown = Object.values(RATINGS).map((type) => {
    return <option key={type.id}>{type.name}</option>
  })

  const [rating, setRating] = useState(props.rating)
  const [ratingComments, setRatingComments] = useState(props.ratingComments)

  const handleClose = () => {
    props.setShowRatingModal(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (rating === 'Select item rating...') {
      alert('Please select a valid rating')
      return
    }

    const item = {
      id: itemId,
      name: props.name,
      type: props.type,
      location: props.location,
      description: props.description,
      rating,
      ratingComments
    }

    dispatch(rateItemAsync(item))

    handleClose()
  }

  return (
    <>
      <Modal
        show={props.ratingOpen}
        onHide={() => props.setShowRatingModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Item Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Col} sm >
              <Form.Label>Rating</Form.Label>
              <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option>Select item rating...</option>
                {ratingDropdown}
              </Form.Select>
            </Form.Group>
            <Form.Group >
              <Form.Label>Comments</Form.Label>
              <Form.Control as="textarea" rows={3} value={ratingComments}
                onChange={(e) => setRatingComments(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="me-1"
              onClick={handleSubmit}>Submit Changes</Button>
            <Button variant="danger" type="reset">Reset</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
