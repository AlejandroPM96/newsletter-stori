<template>
  <div class="upload-form">
    <input type="file" accept=".pdf,.png" @change="handleFileChange" class="file-input" />
    <div v-if="file" class="file-info">
      <h3>Selected File:</h3>
      <p>{{ file.name }}</p>
    </div>
    <div class="recipient-section">
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
      <br />
      <br />
      <h3>Recipient List</h3>
      <div v-for="(email, index) in recipientList" :key="index" class="recipient-item">
        {{ email }} <button @click="removeRecipient(index)" class="remove-button">Remove</button>
      </div>
    </div>
    <button @click="submitForm" class="submit-button">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      recipientList: [],
      newRecipient: '',
      emailList: ''
    }
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0]
    },
    addRecipient() {
      if (this.newRecipient) {
        this.recipientList.push(this.newRecipient)
        this.newRecipient = ''
      }
    },
    addEmailList() {
      const emails = this.emailList.split(',').map((email) => email.trim())
      this.recipientList = [...this.recipientList, ...emails.filter((email) => email)]
      this.emailList = ''
    },
    removeRecipient(index) {
      this.recipientList.splice(index, 1)
    },
    submitForm() {
      // Implement submission logic here
      console.log('File:', this.file)
      console.log('Recipient List:', this.recipientList)
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
</style>
