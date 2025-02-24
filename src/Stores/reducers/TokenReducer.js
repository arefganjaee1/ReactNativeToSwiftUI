const initialState = {
  token: '',
};

const TokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN': {
      return {
        ...state,
        token: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default TokenReducer;
