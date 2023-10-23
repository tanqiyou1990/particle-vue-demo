import locale from 'element-ui/lib/locale'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

//将数据配置好
const messages = {
  en: require('@/i18n/langs/en.json'),
  zh_Hant: require('@/i18n/langs/zh_Hant.json'),
}
const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'en',
  messages,
  silentTranslationWarn: true
})
locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换

export default i18n
