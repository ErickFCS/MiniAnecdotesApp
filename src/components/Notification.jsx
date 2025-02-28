import Alert from 'react-bootstrap/Alert'


const Notification = ({ message, },) => {
    if (!message) return null
    return (
        <Alert>{message}</Alert>
    )
}

export default Notification
