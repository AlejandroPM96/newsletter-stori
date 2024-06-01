// store.js
import { defineStore } from 'pinia'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_BASE_URL
const apiToken = import.meta.env.VITE_API_TOKEN

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
        // Make API request
        const url = apiUrl + '/register-newsletter'
        const data = {
          name: newsletterName,
          subject: emailSubject,
          text: emailText,
          attachmentPath: fileName,
          recipientList: recipientList
        }
        const response = await axios.post(apiUrl + '/register-newsletter', data, {
          headers: { Authorization: 'Bearer ' + apiToken }
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
        const response = await axios.get<Newsletter[]>(apiUrl + '/newsletters', {
          headers: { Authorization: 'Bearer ' + apiToken }
        })
        this.newsletters = response.data
        console.log(request_url)
      } catch (error) {
        console.error('Error fetching newsletters:', error)
      }
    }
  }
})
