
const SIGN_STR = 'Wellcome!'

/** Sign */
export function loginWalletSign(chainAccount) {
  return new Promise((resolve, reject) => {
    const web3 = window.web3
    if (!web3) {
      reject('web3 is not ready')
    }
    const text = web3.utils.utf8ToHex(SIGN_STR)
    web3.eth.personal
      .sign(text, chainAccount, '')
      .then((signed) => {
        resolve(signed)
      })
      .catch((error) => {
        console.log('sign error', error)
        reject(error)
      })
  })
}

/** eth balance */
export function balanceOfBnb(account) {
  return new Promise((resolve, reject) => {
    const web3 = window.web3
    if (!web3) {
      reject('web3 is not ready')
    }
    web3.eth.getBalance(account).then((balance) =>
      resolve(web3.utils.fromWei(balance, 'ether')))
  })
}
