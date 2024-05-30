// store.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUploadStore = defineStore('upload', {
  state: () => ({
    errorMessage: ''
  }),
  actions: {
    async submitForm(file: string, recipientList: string[]) {
      try {
        // Prepare form data
        const formData = new FormData()
        formData.append('file', file)
        formData.append('recipientList', JSON.stringify(recipientList))

        // Make API request
        const response = await axios.post('https://newsletterapi', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        console.log('API Response:', response.data)
        // Handle response as needed
      } catch (error) {
        console.error('API Error:', error)
        // Handle error as needed
      }
    }
  }
})
