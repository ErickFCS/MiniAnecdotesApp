import { createSlice, } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
         
        setNotificationAction(state, action,) {
            return action.payload
        },
        // eslint-disable-next-line no-unused-vars
        clearNotification(state, action,) {
            return ''
        },
    },
},)

export const { setNotificationAction, clearNotification, } = notificationSlice.actions

export const setNotification = (notification, delay,) => (
    async (dispatch,) => {
        dispatch(setNotificationAction(notification,),)
        setTimeout(() => {
            dispatch(clearNotification(),)
        }, delay * 1000,)
    }
)

export default notificationSlice.reducer