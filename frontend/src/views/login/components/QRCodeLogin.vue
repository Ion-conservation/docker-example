<template>
  <div>
    <qrcode-vue :value="qrValue" :size="200" level="H" />
    <p>请使用客户端扫描二维码登录</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import QrcodeVue from 'qrcode.vue'

export default defineComponent({
  name: 'QRCodeLogin',
  components: {
    QrcodeVue,
  },
  setup() {
    const qrValue = ref('https://your-login-api.com/qr-login') // 替换为你的二维码登录API

    return {
      qrValue,
    }
  },
})
</script>
