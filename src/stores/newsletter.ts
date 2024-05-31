// store.js
import { defineStore } from 'pinia'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_BASE_URL

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
        const response = await axios.post(apiUrl + '/register-newsletter', formData, {
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
interface Newsletter {
  name: string
  recipients: number
}
interface NewsletterState {
  newsletters: Newsletter[]
}

export const useNewsletterStore = defineStore('newsletter', {
  state: (): NewsletterState => ({
    newsletters: []
  }),
  actions: {
    async fetchNewsletters() {
      try {
        const request_url = apiUrl + '/newsletters'
        const response = await axios.get<Newsletter[]>(apiUrl + '/newsletters')
        this.newsletters = response.data
        console.log(request_url)
      } catch (error) {
        console.error('Error fetching newsletters:', error)
      }
    }
  }
})
