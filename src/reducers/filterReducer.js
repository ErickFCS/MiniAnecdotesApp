import { createSlice, } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    initialState: '',
    name: 'filter',
    reducers: {
         
        changeFilter(state, action,) {
            return action.payload
        },
        // eslint-disable-next-line no-unused-vars
        clearFilter(state, action,) {
            return ''
        },
    },
},)

export const { changeFilter, clearFilter, } = filterSlice.actions
export default filterSlice.reducer