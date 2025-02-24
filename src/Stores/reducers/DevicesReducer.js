const initialState = {
  devices: []
}

const DevicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DEVICES': {
      return {
        ...state,
        devices: action.payload
      }
    }
    default: {
      return state
    }
  }
}
export default DevicesReducer
