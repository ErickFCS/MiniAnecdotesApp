import { setNotification, clearNotification, } from './contexts/notifications'
import { useContext, } from 'react'
import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import anecdotesServices from './services/anecdotes'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar'
import Notification from './components/Notification'
import notificationContext from './contexts/notifications'
import Stack from 'react-bootstrap/Stack'


const App = () => {

    const [notification, notificationDispatch,] = useContext(notificationContext,)

    const result = useQuery({
        queryKey: ['anecdotes',],
        queryFn: anecdotesServices.fetchAll,
        retry: 0,
        refetchOnWindowFocus: false,
    },)

    const anecdotes = result.data

    const queryClient = useQueryClient()
    const anecdotesMutation = useMutation({
        mutationFn: anecdotesServices.updateAnecdote,
        onSuccess: (res,) => {
            queryClient.setQueryData(['anecdotes',], anecdotes.map((e,) => (e.id === res.id ? { ...e, votes: e.votes + 1, } : e),),)
            notificationDispatch(setNotification(`${res.content} was voted`,),)
            setTimeout(() => {
                notificationDispatch(clearNotification(),)
            }, 5000,)
        },
        onError: (err,) => {
            notificationDispatch(setNotification(`${err.content} wasn't voted`,),)
            setTimeout(() => {
                notificationDispatch(clearNotification(),)
            }, 5000,)
        },
    },)

    const handleVote = (anecdote,) => {
        anecdotesMutation.mutate({ ...anecdote, votes: anecdote.votes + 1, },)
    }

    if (result.isLoading) {
        return (
            <div>loading data ...</div>
        )
    } else if (result.error) {
        return (
            <div>anecdote service not available due to problems in the server</div>
        )
    }

    return (
        <Stack gap={3} style={{ marginTop: 30, marginBottom: 30, }}>
            <Navbar>
                <Navbar.Brand>Mini Anecdotes App</Navbar.Brand>
            </Navbar>
            <Notification message={notification} />
            <AnecdoteForm />
            {anecdotes.map(anecdote =>
                <Card key={anecdote.id}>
                    <Card.Body>
                        <Stack direction='horizontal' style={{ justifyContent: 'space-between', }}>
                            {anecdote.content}
                            <Stack gap={2} direction='horizontal' style={{ justifyContent: 'end', minWidth: 'max-content', }}>
                                Votes: {anecdote.votes}
                                <Button variant='primary' onClick={() => handleVote(anecdote,)}>vote</Button>
                            </Stack>
                        </Stack>
                    </Card.Body>
                </Card>,
            )}
        </Stack>
    )
}

export default App
