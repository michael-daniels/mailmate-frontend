document.getElementById('tab1').style.display = 'block'
  var app = new Vue({
    el: '#app',
    data: {
      loadedContacts: [],
      newContact: {
        contactName: '',
        streetAddress: '',
        street2: '',
        city: '',
        state: '',
        zip: '',
      },
      selectedContacts: ['all selected contacts populated here, multiple objects'],
      selectedDocument: {
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
        fetch('https://jsonplaceholder.typicode.com/users')
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
      contactClicked: (event) => {
        alert(event.target.class)
      }
    }
  })
  app.loadAllContacts()
