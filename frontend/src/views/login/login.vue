<template>
  <div class="login-container">
    <h2>登录</h2>
    <div class="login-method">
      <button @click="switchMethod('account')">账号密码登录</button>
      <button @click="switchMethod('phone')">手机号码登录</button>
      <button @click="switchMethod('qr')">扫描二维码登录</button>
    </div>
    <div v-if="method === 'account'">
      <LoginForm type="account" @submit="handleLogin" />
    </div>
    <div v-else-if="method === 'phone'">
      <LoginForm type="phone" @submit="handleLogin" />
    </div>
    <div v-else-if="method === 'qr'">
      <QRCodeLogin />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue'
import LoginForm from './components/LoginForm.vue'
import QRCodeLogin from './components/QRCodeLogin.vue'
import { apiKey } from '@utils/api';

const $api = inject(apiKey)
if (!$api) {
  throw new Error('API not provided');
}
const method = ref<'account' | 'phone' | 'qr'>('account')

const switchMethod = (newMethod: 'account' | 'phone' | 'qr') => {
  method.value = newMethod
}

const handleLogin = async (loginData: any) => {
  try {
    const response = await $api.users.post<{ data: { success: boolean } }>('/login', loginData)
    if (response.data.success) {
      // 登录成功的处理逻辑
      console.log('Login successful')
      // 这里可以使用vue-router跳转到dashboard
    } else {
      // 登录失败的处理逻辑
      alert('登录失败')
    }
  } catch (error) {
    console.error('Login error:', error)
    alert('登录错误')
  }
}

</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-method {
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
}
</style>
