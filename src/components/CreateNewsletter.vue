<template>
  <div class="upload-form">
    <input
      type="text"
      v-model="newsletterName"
      placeholder="Insert Newsletter Name"
      class="recipient-input"
    />
    <br />
    <input type="file" accept=".pdf,.png" @change="handleFileChange" class="file-input" />
    <div v-if="file" class="file-info">
      <h3>Selected File:</h3>
      <p>{{ file.name }}</p>
    </div>
    <div class="recipient-section">
      <textarea
        v-model="emailText"
        placeholder="Please insert the text you want to be read on newsletter email"
        class="email-list-input"
      ></textarea>
      <input type="text" v-model="subject" placeholder="Add Subject" class="recipient-input" />
    </div>
    <div class="recipient-section">
      <h3>Recipients</h3>
      <textarea
        v-model="emailList"
        placeholder="Paste or type a list of emails separated by commas"
        class="email-list-input"
      ></textarea>
      <button @click="addEmailList" class="add-button">Add Emails</button>
      <br />
      <br />
      <input type="text" v-model="newRecipient" placeholder="Add Email" class="recipient-input" />
      <button @click="addRecipient" class="add-button">Add</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
    <h3>Recipient List</h3>
    <div v-for="(email, index) in recipientList" :key="index" class="recipient-item">
      {{ email }} <button @click="removeRecipient(index)" class="remove-button">Remove</button>
    </div>
    <br />
    <button @click="submitForm" class="submit-button">Submit</button>
  </div>
</template>

<script>
import { storage } from '../firebase/config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useUploadStore } from '../stores/newsletter'
export default {
  data() {
    return {
      file: null,
      recipientList: [],
      newRecipient: '',
      emailList: '',
      errorMessage: '',
      emailText: '',
      subject: '',
      newsletterName: ''
    }
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0]
    },
    isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailPattern.test(email)
    },
    addRecipient() {
      if (this.isValidEmail(this.newRecipient)) {
        this.recipientList.push(this.newRecipient)
        this.newRecipient = ''
        this.errorMessage = ''
      } else {
        this.errorMessage = 'Invalid email address.'
      }
    },
    addEmailList() {
      const emails = this.emailList.split(',').map((email) => email.trim())
      const invalidEmails = emails.filter((email) => !this.isValidEmail(email))
      if (invalidEmails.length > 0) {
        this.errorMessage = 'One or more email addresses are invalid: ' + invalidEmails.join(', ')
      } else {
        this.recipientList = [...this.recipientList, ...emails]
        this.emailList = ''
        this.errorMessage = ''
      }
    },
    removeRecipient(index) {
      this.recipientList.splice(index, 1)
    },
    uploadFile(file) {
      // getting name & type properties from File object
      const { name, type } = file
      // create a reference to file in firebase
      const storageRef = ref(storage, name)
      // upload file (this.file) to firebase and append metadata
      const uploadTask = uploadBytesResumable(storageRef, this.file, {
        contentType: type
      })

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        },
        (error) => {
          console.log(error)
        },
        () => {
          console.log('successful upload.')
          const uploadStore = useUploadStore()
          try {
            uploadStore.submitForm(
              this.file.name,
              this.recipientList,
              this.newsletterName,
              this.emailText,
              this.subject
            )
          } catch (error) {
            console.error('Error submitting form:', error)
            // Handle error as needed
          }
        }
      )
    },
    submitForm() {
      if (this.recipientList.length === 0) {
        this.errorMessage = 'Recipient list cannot be empty.'
        return
      }
      if (!this.file) {
        this.errorMessage = 'No file selected.'
        return
      }
      // submission logic here
      try {
        this.uploadFile(this.file)
        // Use snapshot.ref.name as the filename
      } catch (error) {
        console.error('Error uploading file:', error)
        // Handle error as needed
      }
      console.log('File:', this.file)
      console.log('Recipient List:', this.recipientList)
      this.errorMessage = ''
    }
  }
}
</script>

<style scoped>
.upload-form {
  padding: 20px;
  border: 2px solid #007bff;
  border-radius: 10px;
  background-color: #f0f8ff;
}

.file-input {
  margin-bottom: 20px;
}

.file-info {
  margin-bottom: 20px;
}

.recipient-section {
  margin-bottom: 20px;
}

.email-list-input {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 5px;
  border: 2px solid #007bff;
  border-radius: 5px;
  resize: vertical;
}

.recipient-input {
  margin-right: 10px;
  padding: 5px 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
}

.add-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.remove-button {
  padding: 3px 5px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.recipient-item {
  margin-bottom: 5px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
