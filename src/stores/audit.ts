import { defineStore } from 'pinia'

export interface AuditDetailBox {
    uid?: string,
    name? : string,
    desc? : string,
    applicantor?: string,
    state?: string,
    date?: string,
    serviceType?: string
}

export const useDataStore = defineStore('data', {
  state: () => ({
    items: [] as AuditDetailBox[]
  }),
  actions: {
    setItems(data: AuditDetailBox[]) {
      this.items = data
    }
  }
})