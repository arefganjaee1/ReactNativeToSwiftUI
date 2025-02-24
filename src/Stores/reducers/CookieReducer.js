const initialState = {
  cookie: '',
};

const CookieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COOKIE': {
      return {
        ...state,
        cookie: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default CookieReducer;
