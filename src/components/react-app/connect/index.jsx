import store from '@/store';
import { isEVMProvider } from '@particle-network/connect';
import { ConnectButton, useAccount, useConnectKit, useParticleTheme } from '@particle-network/connect-react-ui';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
console.log(React.version)

function WalletButton() {

  /** Event listening */
  const connectKit = useConnectKit();
  useEffect(() => {
    if(connectKit) {
      connectKit.on('connect', (provider) => {
        if (provider && isEVMProvider(provider)) {
          window.web3 = new Web3(provider);
        }
      });
      connectKit.on('disconnect', () => {
        store.dispatch('Logout')
      });
      connectKit.on('chainChanged', (chain) => {
        console.log('chainChanged:', chain)
      });
      connectKit.on('accountsChanged', (accounts) => {
        store.commit('setChainAccount', accounts[0])
        store.dispatch('Login', {address: accounts[0]}).then(() => {
          setLoginProcess(false)
        })
      });
    }
    
  }, []);

  const [loginProcess, setLoginProcess] = useState(false);

  /** address changed */
  const account = useAccount();
  useEffect(() => {
    if(account && loginProcess) {
      store.dispatch('Login', {address: account}).then(() => {
        setLoginProcess(false)
      })
    }
  }, [account]);
  
  /** on theme changed */
  const theme = store.state.common.theme;
  const { setTheme } = useParticleTheme();
  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  /** on user logout */
  const isLogout = store.state.user.logout;
  useEffect(() => {
    if(isLogout) {
      store.commit('setLogout', false)
      connectKit.disconnect({ hideLoading: true });
    }
  }, [isLogout])

  return (
    <div>
      <ConnectButton.Custom>
            {({ openAccountModal, openConnectModal, openChainModal, closeAccountModal }) => {

                const handleOpenConnectModal = () => {
                  openConnectModal();
                  setLoginProcess(true);
                }

                return (
                    <div>
                        <button onClick={handleOpenConnectModal} disabled={!!account}>
                            Open Connect
                        </button>
                        <br />
                        <br />
                        <button onClick={openAccountModal} disabled={!account}>
                            Open Account
                        </button>
                        <button onClick={closeAccountModal} disabled={!account}>
                            Close Account
                        </button>
                        <br />
                        <br />
                        <button onClick={openChainModal} disabled={!account}>
                            Open Switch Network
                        </button>
                    </div>
                );
            }}
        </ConnectButton.Custom>
    </div>
    )
  
}

export default WalletButton
