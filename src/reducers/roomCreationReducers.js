export const error = (state = '', action) => {
  switch (action.type) {
    case 'CREATE_ROOM':
    case 'CREATE_ROOM_SUCCESS':
      return ''
    case 'CREATE_ROOM_FAILURE':
      return action.payload.error
    default:
      return state
  }
}
