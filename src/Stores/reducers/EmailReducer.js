const initialState = {
  mail: '',
};

const EmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EMAIL': {
      return {
        ...state,
        mail: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default EmailReducer;
