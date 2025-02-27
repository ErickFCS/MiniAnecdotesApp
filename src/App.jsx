import { useState, } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import StyledButton from 'react-bootstrap/Button'

const Button = ({ text, onClick, variant, style, },) => (
    <>
        <StyledButton variant={variant} style={style} onClick={onClick}>{text}</StyledButton>
    </>
)

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.',
    ]

    const [selected, setSelected,] = useState(0,)
    const [votes, setVotes,] = useState(Array(anecdotes.length,).fill(0,),)
    const [maxVoteIndex, setMaxVoteIndex,] = useState(0,)

    const handleNextAnecdote = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length,),)
    }

    const handleVote = () => {
        let newVotes = [...votes,]
        newVotes[selected] += 1
        if (newVotes[selected] > newVotes[maxVoteIndex]) setMaxVoteIndex(selected,)
        setVotes(newVotes,)
    }

    return (
        <Stack gap={3} style={{ marginTop: 30, marginBottom: 30, }}>
            <Card>
                <Card.Body>
                    <Card.Title >
                        <h2 style={{ textAlign: 'center', }}>Anecdote of the day</h2>
                    </Card.Title>
                    <Card.Text style={{ textAlign: 'center', }}>
                        {anecdotes[selected]}
                        <br />
                        has {votes[selected]} votes
                    </Card.Text>
                    <Stack direction='horizontal' style={{ justifyContent: 'center', }}>
                        <ButtonGroup size='lg' style={{ justifyContent: 'center', width: '90%', maxWidth: 500, }}>
                            <Button text='Vote' onClick={handleVote} variant='success' style={{ width: '50%', }} />
                            <Button text='Next anecdote' onClick={handleNextAnecdote} variant='secondary' style={{ width: '50%', }} />
                        </ButtonGroup>
                    </Stack>
                </Card.Body>
            </Card >
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h2 style={{ textAlign: 'center', }}>Anecdote with most votes</h2>
                    </Card.Title>
                    <Card.Text style={{ textAlign: 'center', }}>
                        {anecdotes[maxVoteIndex]}
                        <br />
                        has {votes[maxVoteIndex]} votes
                    </Card.Text>
                </Card.Body>
            </Card>
        </Stack>
    )
}

export default App