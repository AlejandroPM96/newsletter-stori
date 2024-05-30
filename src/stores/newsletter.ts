// store.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUploadStore = defineStore('upload', {
  state: () => ({
    errorMessage: ''
  }),
  actions: {
    async submitForm(
      fileName: string,
      recipientList: string[],
      newsletterName: string,
      emailText: string,
      emailSubject: string
    ) {
      try {
        // Prepare form data
        const formData = new FormData()
        formData.append('name', newsletterName)
        formData.append('subject', emailSubject)
        formData.append('text', emailText)
        formData.append('attachmentPath', fileName)
        formData.append('recipientList', JSON.stringify(recipientList))

        // Make API request
        const response = await axios.post('http://localhost:3000/register-newsletter', formData, {
          headers: {
            'Content-Type': 'application/json'
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
