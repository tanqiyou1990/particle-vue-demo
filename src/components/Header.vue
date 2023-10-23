<template>
  <div class>
    <Particle :theme="$store.state.common.theme" :isLogout="$store.state.user.logout" />
    <el-button size="mini" @click="handleClickTheme()">Change Theme</el-button>
    <el-button size="mini" @click="personalSign()">Sign</el-button>
    <el-button size="mini" @click="logout()">Logout</el-button>
    <div>{{$store.state.chain.account}}</div>
    <el-button size="mini" type="info" @click="mint()">Mint</el-button>
    <div>token:{{$store.state.user.token}}</div>
    <div>account:{{$store.state.user.account}}</div>
    <div>userId:{{$store.state.user.userId}}</div>
    <div>eth balance:{{$store.state.chain.balanceBnb}}</div>
    <div>erc20 balance:{{$store.state.chain.balanceMbd}}</div>
  </div>
</template>

<script>
import Particle from '@/components/react-app/particle'
import { nftMint } from '@/utils/web3/nft'
import { Notification } from 'element-ui'
export default {
  name: 'header-component',
  components: {
    Particle,
  },

  methods: {
    /** Change the theme */
    handleClickTheme() {
      const theme = this.$store.state.common.theme
      this.$store.commit('SET_THEME', theme === 'dark' ? 'light' : 'dark')
    },

    /** Logout */
    logout() {
      this.$store.dispatch('Logout')
    },

    /** Test calls contract methods */
    mint() {
      const tokenURI = 'https://www.google.com'
      const initAmount = 100
      const priceTokenType = 0
      const priceAsset = '0x07d4436423146969249Ca428279fc991F74CA7e8'
      const priceTokenIdOrAmount = 10
      const maxSupply = 10000
      nftMint(
        tokenURI,
        initAmount,
        priceTokenType,
        priceAsset,
        priceTokenIdOrAmount,
        maxSupply
      )
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          Notification({
            title: this.$t('common.warning'),
            message: e,
            type: 'warning',
          })
        })
    },

    async personalSign() {
      const web3 = window.web3
      if (web3) {
        const text = web3.utils.utf8ToHex('Wellcome!')
        web3.eth.personal
          .sign(text, this.$store.state.user.account, '')
          .then((result) => {
            console.log('personalSign:', result)
          })
          .catch((error) => {
            console.log('personalSign error', error)
          })
      }
    },
  },
}
</script>

<style>
</style>
