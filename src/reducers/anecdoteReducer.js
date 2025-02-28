import { createSlice, } from '@reduxjs/toolkit'
import { setNotification, } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        voteFor(state, action,) {
            return state.map((e,) => (e.id === action.payload.id ? { ...e, votes: e.votes + 1, } : e),)
        },
        appendAnecdote(state, action,) {
            return state.concat(action.payload,)
        },
        appendAnecdotes(state, action,) {
            state.push(...action.payload,)
        },
    },
},)

export const { voteFor, appendAnecdote, appendAnecdotes, } = anecdoteSlice.actions

export const initializeAnecdotes = () => (
    async (dispatch,) => {
        return anecdotesService
            .fetchAll()
            .then((res,) => {
                dispatch(appendAnecdotes(res,),)
            },)
            .catch((err,) => {
                console.error(err,)
            },)
    }
)

export const createNewAnecdote = (content,) => (
    async (dispatch,) => {
        return anecdotesService
            .createNew(content,)
            .then((res,) => {
                dispatch(appendAnecdote(res,),)
                dispatch(setNotification(`'${res.content}' was created`, 5,),)
            },)
            .catch(() => {
                dispatch(setNotification(`'${content}' wasn't created`, 5,),)
            },)
    }
)

export const voteForAnecdote = (anecdote,) => (
    async (dispatch,) => {
        const { id, content, } = anecdote
        return anecdotesService
            .updateAnecdote({ ...anecdote, votes: anecdote.votes + 1, },)
            .then(() => {
                dispatch(voteFor({ id, },),)
                dispatch(setNotification(`you voted '${content}'`, 5,),)
            },)
            .catch(() => {
                dispatch(setNotification(`'${content}' wasn't voted`, 5,),)
            },)
    }
)

export default anecdoteSlice.reducer