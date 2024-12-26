import { defineStore } from 'pinia'
import identity from '@/plugins/identity.js'

export const useLoginStore = defineStore('login', () => {
  
  function login(userInfo) {
    console.log(userInfo)
  }
  function register(userInfo) {
    console.log("identity:",identity)
  }

  return { login,register }
})
