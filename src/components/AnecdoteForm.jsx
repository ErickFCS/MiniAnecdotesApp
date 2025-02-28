import { useDispatch, } from 'react-redux'
import { createNewAnecdote, } from '../reducers/anecdoteReducer'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createHandler = (event,) => {
        event.preventDefault()
        dispatch(createNewAnecdote(event.target.content.value,),)
    }
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <h3>Create</h3>
                </Card.Title>
                <Form onSubmit={createHandler}>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control name='content' />
                            <Button variant='success' type='submit'>Create</Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AnecdoteForm