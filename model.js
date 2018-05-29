let storedToken = localStorage.getItem('token')
if (storedToken === null) {
  let token = window.location.href.indexOf('user_token=')
  token = window.location.href.slice(token + 11, window.location.href.length)
  localStorage.setItem('token', token)
  console.log('stored token')
}

document.getElementById('tab1').style.display = 'block'
  var app = new Vue({
    el: '#app',
    data: {
      loadedContacts: [],
      loadedDocuments: [],
      newContact: {
        contactName: '',
        streetAddress: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
      },
      newDocument: {
        title:'',
        content:''
      },
      selectedContacts: ['all selected contacts populated here, multiple objects'],
      selectedDocument: {
        id:'',
        title:'',
        content:'',
      }
    },
    methods: {
      showTab: (event) => {
        let allTabs = document.querySelectorAll('.tab-view')
        for (let i = 0; i < allTabs.length; i++) {
          allTabs[i].style.display = 'none'
        }
        document.getElementById(`tab${event.target.id}`).style.display = 'block'
      },
      loadAllContacts: () => {
        fetch(`http://localhost:8000/contacts?user_token=${localStorage.getItem('token')}`)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            console.log('DATA', data)
            app.loadedContacts = data
          })
          .catch((err) => {
            console.log(err)
          })
      },
      loadAllDocuments: () => {
        fetch(`http://localhost:8000/documents?user_token=${localStorage.getItem('token')}`)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            console.log('DOCUMENT DATA', data)
            app.loadedDocuments = data
          })
          .catch((err) => {
            console.log(err)
          })
      },
      addNewContact: (event) => {
        event.preventDefault()
        app.loadedContacts.unshift(app.newContact)
        app.newContact = {
          contactName: '',
          streetAddress: '',
          street2: '',
          city: '',
          state: '',
          zip: ''
        }

      },
      addNewDocument: (event) => {
        event.preventDefault()
        app.loadedDocuments.unshift(app.newDocument)
        app.newDocument = {
          title:'',
          content:''
        }
      },
      contactClicked: (event) => {
        alert(event.target.class)
      }
    }
  })
  app.loadAllContacts()
  app.loadAllDocuments()
