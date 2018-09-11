import io from 'socket.io-client'

let socket = null

export const openRoom = (id) => (dispatch) => {
  socket = io('/' + id)

  dispatch({
    type: 'OPEN_ROOM',
    payload: {
      id
    }
  })
}

export const setGameText = (text) => ({
  type: 'SET_GAME_TEXT',
  payload: {
    text
  }
})

export const setAllPlayers = (playersById) => ({
  type: 'SET_ALL_PLAYERS',
  payload: {
    playersById
  }
})

// we get the id from the server and send it in the object here
export const addPlayer = (player) => ({
  type: 'ADD_PLAYER',
  payload: {
    username: '',
    progress: 0,
    place: null,
    ...player
  }
})

export const setProgress = (id, progress) => ({
  type: 'SET_PROGRESS',
  payload: {
    id,
    progress
  }
})

export const setPlace = (id, place) => ({
  type: 'SET_PLACE',
  payload: {
    id,
    place
  }
})
