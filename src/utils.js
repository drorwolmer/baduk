export const makeReducer = (actionHandlers, initialState) => {
  return (state = initialState, action) => {
    if (actionHandlers[action.type]) {
      return actionHandlers[action.type](state, action)
    }
    return state
  }
}

export const getFromLocalStorage = (key, defaultValue) => {
  let value = window.localStorage.getItem(key)
  return !value || value === 'null' ? defaultValue : value
}
