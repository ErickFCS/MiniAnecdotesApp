import { createContext, useReducer, } from 'react'

const notificationReducerFunction = (state, action,) => {
    switch (action.type) {
    case 'SET':
        return action.payload
    case 'CLEAR':
        return ''
    default:
        return state
    }
}

export const setNotification = (message,) => (
    {
        type: 'SET',
        payload: message,
    }
)

export const clearNotification = () => (
    {
        type: 'CLEAR',
    }
)

const notificationContext = createContext()

export const NotificationContextProvider = (props,) => {
    const [notification, notificationDispatch,] = useReducer(notificationReducerFunction, '',)
    return (
        <notificationContext.Provider value={[notification, notificationDispatch,]}>
            {props.children}
        </notificationContext.Provider>
    )
}

export default notificationContext