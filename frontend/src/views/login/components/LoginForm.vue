<template>
  <form @submit.prevent="submitForm">
    <div v-if="type === 'account'">
      <input v-model="form.username" type="text" placeholder="用户名" required />
      <input v-model="form.password" type="password" placeholder="密码" required />
    </div>
    <div v-else-if="type === 'phone'">
      <input v-model="form.phone" type="tel" placeholder="手机号码" required />
      <input v-model="form.verificationCode" type="text" placeholder="验证码" required />
      <button type="button" @click="sendVerificationCode">发送验证码</button>
    </div>
    <button type="submit">登录</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'


export default defineComponent({
  name: 'LoginForm',
  props: {
    type: {
      type: String as () => 'account' | 'phone',
      required: true,
    },
  },
  setup(props, { emit }) {
    const form = reactive({
      username: '',
      password: '',
      phone: '',
      verificationCode: '',
    })

    const submitForm = () => {
      if (props.type === 'account') {
        emit('submit', {
          username: form.username,
          password: form.password,
        })
      } else if (props.type === 'phone') {
        emit('submit', {
          phone: form.phone,
          verificationCode: form.verificationCode,
        })
      }
    }

    const sendVerificationCode = async () => {
      // try {
      //   const response = await axios.post('/api/send-verification-code', { phone: form.phone })
      //   if (response.data.success) {
      //     alert('验证码已发送')
      //   } else {
      //     alert('发送验证码失败')
      //   }
      // } catch (error) {
      //   console.error('Send verification code error:', error)
      //   alert('发送验证码错误')
      // }
    }

    return {
      form,
      submitForm,
      sendVerificationCode,
    }
  },
})
</script>

<style scoped>
input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 5px;
}

button {
  margin-top: 10px;
}
</style>
