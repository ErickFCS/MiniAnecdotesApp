import axios from 'axios'

const baseUrl = '/anecdotes'

const fetchAll = () => {
    return axios
        .get(baseUrl,)
        .then(response => response.data,)
        .catch(error => {
            console.error(error,)
            return Promise.reject('Unable to fetch all',)
        },)
}

const createNew = (content,) => {
    return axios
        .post(baseUrl, { content, votes: 0, },)
        .then(response => response.data,)
        .catch(error => {
            console.error(error,)
            return Promise.reject('Unable to create new',)
        },)
}

const updateAnecdote = (anecdote,) => {
    return axios
        .put(`${baseUrl}/${anecdote.id}`, { ...anecdote, },)
        .then(response => response.data,)
        .catch(error => {
            console.error(error,)
            return Promise.reject('Unable to create new',)
        },)
}

export default { fetchAll, createNew, updateAnecdote, }