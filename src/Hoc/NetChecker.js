import React, { useEffect, useState } from 'react';
import { AppState, PermissionsAndroid, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CONSTANTS from '../Values/Constants';
import { useNavigation } from '@react-navigation/native';
import NetCheckerModal from '../Components/NetCheckerModal/NetCheckerModal';
import NetInfo from '@react-native-community/netinfo';

const NetChecker = (WrappedComponent) => {
  function NetChecker(props) {
    // console.log('props in NetChecker', props?.route?.name);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      NetInfo.fetch().then((state) => {
        if (state.type === 'none') {
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
    }, []);
    const handleReject = () => {
      setVisible(false);
    };

    return (
      <>
        <WrappedComponent {...props} />
        <NetCheckerModal isVisible={visible} onPressReject={handleReject} />
      </>
    );
  }
  return NetChecker;
};
export default NetChecker;
