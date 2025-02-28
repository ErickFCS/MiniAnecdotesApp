import { useSelector, useDispatch, } from 'react-redux'
import { voteForAnecdote, } from '../reducers/anecdoteReducer'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'


const Anecdote = ({ anecdote, },) => {
    const dispatch = useDispatch()
    const vote = () => {
        dispatch(voteForAnecdote(anecdote,),)
    }
    return (
        <Card>
            <Card.Body>
                <Stack direction='horizontal' style={{ justifyContent: 'space-between', }}>
                    {anecdote.content}
                    <Stack gap={2} direction='horizontal' style={{ justifyContent: 'end', minWidth: 'max-content', }}>
                        Votes: {anecdote.votes}
                        <Button variant='primary' onClick={() => vote()}>vote</Button>
                    </Stack>
                </Stack>
            </Card.Body>
        </Card>
    )
}

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter,)
    const regExp = new RegExp(filter, 'i',)
    const anecdotes = useSelector(state => state.anecdotes,)
        .filter((e,) => (regExp.test(e.content,)),)
        .sort((a, b,) => (b.votes - a.votes),)

    return (
        <>
            {anecdotes.map(anecdote =>
                <Anecdote anecdote={anecdote} key={anecdote.id} />,
            )}
        </>
    )
}

export default AnecdoteList