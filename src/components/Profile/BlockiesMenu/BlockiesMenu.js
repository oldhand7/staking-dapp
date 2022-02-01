import React from 'react';
import {
  Menu, Divider, ListItem, List,
} from '@material-ui/core';
import Blockies from 'react-blockies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PropTypes } from 'prop-types';

import ShortAddressCopyButton from '../../ShortAddressCopyButton';
import extProps from './propTypes';
import lrc from '../../../assets/images/loopring/loopring-small-black.png';

/*
 *
 * Visual representation of your wallet and tools to copy your address
 * can be open to have access to externals links and logout
 *
 */

const BlockiesMenu = React.memo(({
  classes, messages, walletAddress, onEditAddress, onLogout,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const BlockiesRound = ({ walletAddressBlockies }) => (
    <div className="d-block p-0 avatar-icon-wrapper rounded-circle m-0 border-3 border-primary">
      <div className="rounded-circle border-3 border-white overflow-hidden">
        <Blockies
          seed={walletAddressBlockies.toLowerCase()}
          size={8}
          scale={10}
          className="identicon"
        />
      </div>
    </div>
  );
  BlockiesRound.propTypes = { walletAddressBlockies: PropTypes.string.isRequired };

  return (
    <div>
      <div
        tabIndex="0"
        role="button"
        className={`avatar-icon-wrapper rounded-circle mx-auto ${classes.btnBlockies}`}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !!walletAddress) setAnchorEl(e.currentTarget); }}
      >
        <BlockiesRound walletAddressBlockies={walletAddress} />
        <span className={classes.angleDownBlockies}>
          <FontAwesomeIcon icon={['fas', 'angle-down']} className="opacity-5" />
        </span>
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        onClose={() => setAnchorEl(null)}
        className="ml-2"
      >
        <div className="dropdown-menu-right dropdown-menu-lg overflow-hidden p-0">
          <List className="text-left bg-transparent d-flex align-items-center flex-column pt-0">
            <div className="avatar-icon-wrapper rounded-circle mx-auto">
              <BlockiesRound walletAddressBlockies={walletAddress} />
            </div>
            <ShortAddressCopyButton messages={messages} walletAddress={walletAddress} />
            <Divider className="w-100 mt-2" />
            <ListItem button onClick={() => window.open(`https://etherscan.io/address/${walletAddress}`, '_blank')}>
              <span className="font-size-sm font-weight-bold">
                <span className={classes.iconLeft}><FontAwesomeIcon icon={['fab', 'ethereum']} /></span>
                Etherscan
              </span>
            </ListItem>
            <ListItem button onClick={onEditAddress}>
              <span className="font-size-sm font-weight-bold">
                <span className={classes.iconLeft}><FontAwesomeIcon icon={['fas', 'search']} /></span>
                {messages['Watch address']}
              </span>
            </ListItem>
            <ListItem button onClick={onLogout}>
              <span className="font-size-sm font-weight-bold">
                <span className={classes.iconLeft}><FontAwesomeIcon icon={['fas', 'unlink']} /></span>
                {messages.Logout}
              </span>
            </ListItem>
            <Divider className="w-100" />
            <ListItem button onClick={() => window.open('https://etherscan.io/address/lrctoken.eth', '_blank')}>
              <span className="font-size-sm font-weight-bold">
                <span className={classes.iconLeft}><img src={lrc} alt="Loopring logo" width={14} /></span>
                {messages['LRC token']}
              </span>
            </ListItem>
            <ListItem button onClick={() => window.open('https://etherscan.io/address/stakingpool.lrctoken.eth', '_blank')}>
              <span className="font-size-sm font-weight-bold">
                <span className={classes.iconLeft}><FontAwesomeIcon icon={['fab', 'fort-awesome']} /></span>
                {messages['Staking pool']}
              </span>
            </ListItem>
            <ListItem button onClick={() => window.open('https://etherscan.io/address/feevault.lrctoken.eth', '_blank')}>
              <span className="font-size-sm font-weight-bold">
                <span className={classes.iconLeft}><FontAwesomeIcon icon={['fas', 'donate']} /></span>
                {messages['Fee vault']}
              </span>
            </ListItem>
            <Divider className="w-100" />
            <ListItem button onClick={() => window.open('https://loopring.org', '_blank')}>
              <span className="font-size-sm font-weight-bold">
                <span className={classes.iconLeft}><FontAwesomeIcon icon={['fas', 'globe']} /></span>
                Loopring
              </span>
            </ListItem>
            <ListItem button onClick={() => window.open('https://loopring.io', '_blank')}>
              <span className="font-size-sm font-weight-bold">
                <span className={classes.iconLeft}><FontAwesomeIcon icon={['fas', 'exchange-alt']} /></span>
                {messages.Exchange}
              </span>
            </ListItem>
            <ListItem button onClick={() => window.open('https://duneanalytics.com/loopring', '_blank')}>
              <span className="font-size-sm font-weight-bold">
                <span className={classes.iconLeft}><FontAwesomeIcon icon={['fas', 'chart-pie']} /></span>
                {messages.Analytics}
              </span>
            </ListItem>
            <ListItem button onClick={() => window.open('https://discord.gg/KkYccYp', '_blank')}>
              <span className="font-size-sm font-weight-bold">
                <span className={classes.iconLeft}><FontAwesomeIcon icon={['fab', 'discord']} /></span>
                Discord
              </span>
            </ListItem>
            <ListItem button onClick={() => window.open('https://twitter.com/loopringorg', '_blank')}>
              <span className="font-size-sm font-weight-bold">
                <span className={classes.iconLeft}><FontAwesomeIcon icon={['fab', 'twitter']} /></span>
                Twitter
              </span>
            </ListItem>
          </List>
        </div>
      </Menu>
    </div>
  );
});

BlockiesMenu.propTypes = extProps;

export default BlockiesMenu;
