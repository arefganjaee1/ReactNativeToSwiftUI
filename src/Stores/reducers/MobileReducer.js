const initialState = {
  mobile: ''
}

const MobileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MOBILE': {
      return {
        ...state,
        mobile: action.payload
      }
    }
    default: {
      return state
    }
  }
}
export default MobileReducer
