const initialState = {
  fcmToken: '',
};

const FcmTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FCM_TOKEN': {
      return {
        ...state,
        fcmToken: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default FcmTokenReducer;
