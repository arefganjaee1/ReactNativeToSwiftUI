const initialState = {
  position: null,
};

const PositionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSITION': {
      return {
        ...state,
        position: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default PositionReducer;
