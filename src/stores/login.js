import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {
  
  function login(userInfo) {
    console.log(userInfo)
  }

  return { login }
})
