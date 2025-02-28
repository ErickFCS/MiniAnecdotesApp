import { setNotification, clearNotification, } from '../contexts/notifications'
import { useContext, } from 'react'
import { useMutation, useQueryClient, } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import notificationContext from '../contexts/notifications'


const AnecdoteForm = () => {

    const [, notificationDispatch,] = useContext(notificationContext,)

    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation({
        mutationFn: anecdoteService.createNew,
        onSuccess: (res,) => {
            const anecdotes = queryClient.getQueryData(['anecdotes',],)
            queryClient.setQueryData(['anecdotes',], anecdotes.concat(res,),)
            notificationDispatch(setNotification(`${res.content} was created`,),)
            setTimeout(() => {
                notificationDispatch(clearNotification(),)
            }, 5000,)
        },
        onError: () => {
            notificationDispatch(setNotification('to short anecdote, must have lenght 5 or more',),)
            setTimeout(() => {
                notificationDispatch(clearNotification(),)
            }, 5000,)
        },
    },)

    const onCreate = (event,) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newAnecdoteMutation.mutate(content,)
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <h3>Create</h3>
                </Card.Title>
                <Form onSubmit={onCreate}>
                    <Form.Group>
                        <InputGroup>
                            <Form.Control name='anecdote' />
                            <Button variant='success' type='submit'>Create</Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AnecdoteForm
