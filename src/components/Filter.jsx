import { useDispatch, } from 'react-redux'
import { changeFilter, } from '../reducers/filterReducer'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'


const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event,) => {
        dispatch(changeFilter(event.target.value,),)
    }
    return (
        <InputGroup>
            <InputGroup.Text>Filter:</InputGroup.Text>
            <Form.Control name='anecdote' onChange={handleChange} />
            <Button variant='primary' type='button'>Search</Button>
        </InputGroup>
    )
}

export default Filter