import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Redirect } from 'react-router-dom';

import extProps from './propTypes';
import languageProvider from '../../../translations';
import { Web3SignInGrid } from '../../../components';
import { settingsLogout, settingsSetWalletAddress, settingsSetWalletID } from '../../../redux/features/settings/action';
import { saveAddressWalletOrENS, tryToOpenWalletIfNotActive } from './logic';

/*
 *
 * Sign in with web3 wallet or read only with RPC
 * Save in localStorage the wallet used
 *
 */

const Web3SignIn = () => {
  const {
    library, account, activate, active, error, deactivate,
  } = useWeb3React();
  const language = useSelector((state) => state.settings.language);
  const walletID = useSelector((state) => state.settings.walletID);
  const walletAddress = useSelector((state) => state.settings.walletAddress);
  const dispatch = useDispatch();
  const setWalletID = useCallback((_walletID) => dispatch(
    settingsSetWalletID(_walletID),
  ), [dispatch]);
  const setWalletAddress = useCallback((_walletAddress) => dispatch(
    settingsSetWalletAddress(library, _walletAddress),
  ), [dispatch, library]);
  const secureSwitchWallet = useCallback((_walletID) => dispatch(
    settingsLogout(deactivate, _walletID),
  ), [dispatch, deactivate]);

  useEffect(() => {
    tryToOpenWalletIfNotActive(active, walletID, activate, setWalletID);
  }, [active, walletID, activate, setWalletID]);

  useEffect(() => {
    if (error) setWalletID(0);
  }, [error, setWalletID]);

  useEffect(() => {
    saveAddressWalletOrENS(library, walletAddress, account, setWalletAddress);
  }, [library, walletAddress, account, setWalletAddress]);

  const messages = languageProvider[language];

  if (!!walletAddress.value && !!library) return (<Redirect exact from="/login" to="/" />);

  return (
    <Web3SignInGrid
      messages={messages}
      onSelectWallet={secureSwitchWallet}
      walletLoading={walletID}
      onUpdateWalletAddress={setWalletAddress}
      isLoading={walletAddress.isLoading}
    />
  );
};

Web3SignIn.propTypes = extProps;

export default Web3SignIn;
