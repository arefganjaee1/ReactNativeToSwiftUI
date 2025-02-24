const initialState = {
  accToken: '',
};

const AccTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACC_TOKEN': {
      return {
        ...state,
        accToken: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default AccTokenReducer;
