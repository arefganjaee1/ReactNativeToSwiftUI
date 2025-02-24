const initialState = {
  device: null,
};

const DeviceReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'SET_DEVICE': {
      return {
        ...state,
        device: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default DeviceReducer;
