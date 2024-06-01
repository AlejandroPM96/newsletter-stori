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
    <button :disabled="isLoading" @click="submitForm" class="submit-button">Submit</button>
    <div v-if="isLoading" class="loading-circle"></div>
    <p v-if="registerMessage != ''" :class="['launch-message', { 'error-message': isError }]">
      {{ registerMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { storage } from '../firebase/config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useUploadStore } from '../stores/newsletter'
export default {
  name: 'CreateNewsletter',
  data() {
    return {
      file: null,
      recipientList: [],
      newRecipient: '',
      emailList: '',
      errorMessage: '',
      emailText: '',
      subject: '',
      newsletterName: '',
      registerMessage: '',
      isError: false,
      isLoading: false
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
            this.registerMessage = 'Successfully Registered '
            this.isError = false
          } catch (error) {
            console.error('Error submitting form:', error)
            this.registerMessage = 'Failed to launch the newsletter. Please try again.'
            this.isError = true
            // Handle error as needed
          }
        }
      )
    },
    submitForm() {
      1
      this.isLoading = true
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
        this.isLoading = false
      } catch (error) {
        console.error('Error uploading file:', error)
        this.isLoading = false
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
  max-width: 800px;
  text-align: center;
  margin: 0 auto;
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
.loading-circle {
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #007bff; /* Blue (matches your theme) */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  margin: 20px auto;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
input[type='file'] {
  outline: none;
  padding: 4px;
  margin: 10px;
}

input[type='file']:focus-within::file-selector-button,
input[type='file']:focus::file-selector-button {
  outline: 2px solid #0964b0;
  outline-offset: 2px;
}

input[type='file']::before {
  top: 16px;
}

input[type='file']::after {
  top: 14px;
}

/* ------- From Step 2 ------- */

input[type='file'] {
  position: relative;
}

input[type='file']::file-selector-button {
  width: 136px;
  color: transparent;
}

/* Faked label styles and icon */
input[type='file']::before {
  position: absolute;
  pointer-events: none;
  /*   top: 11px; */
  left: 40px;
  color: #0964b0;
  content: 'Upload File';
}

input[type='file']::after {
  position: absolute;
  pointer-events: none;
  /*   top: 10px; */
  left: 16px;
  height: 20px;
  width: 20px;
  content: '';
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230964B0'%3E%3Cpath d='M18 15v3H6v-3H4v3c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-3h-2zM7 9l1.41 1.41L11 7.83V16h2V7.83l2.59 2.58L17 9l-5-5-5 5z'/%3E%3C/svg%3E");
}

/* ------- From Step 1 ------- */

/* file upload button */
input[type='file']::file-selector-button {
  border-radius: 4px;
  padding: 0 16px;
  height: 40px;
  cursor: pointer;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.16);
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
  margin-right: 16px;
  transition: background-color 200ms;
}

/* file upload button hover state */
input[type='file']::file-selector-button:hover {
  background-color: #f3f4f6;
}

/* file upload button active state */
input[type='file']::file-selector-button:active {
  background-color: #e5e7eb;
}
</style>
