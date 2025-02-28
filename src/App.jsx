import { initializeAnecdotes, } from './reducers/anecdoteReducer'
import { useDispatch, } from 'react-redux'
import { useEffect, } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Navbar from 'react-bootstrap/Navbar'
import Notification from './components/Notification'
import Stack from 'react-bootstrap/Stack'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAnecdotes(),)
    }, [dispatch,],)
    return (
        <Stack gap={3} style={{ marginTop: 30, marginBottom: 30, }}>
            <Navbar>
                <Navbar.Brand>Mini Anecdotes App</Navbar.Brand>
            </Navbar>
            <AnecdoteForm />
            <Notification />
            <Filter />
            <AnecdoteList />
        </Stack>
    )
}

export default App