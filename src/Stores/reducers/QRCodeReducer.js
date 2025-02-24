const initialState = {
  QRCode: '',
};

const QRCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QR_CODE': {
      return {
        ...state,
        QRCode: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default QRCodeReducer;
