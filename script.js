
let storedToken = localStorage.getItem('token')
if (storedToken === null) {
  let token = window.location.href.indexOf('user_token=')
  token = window.location.href.slice(token + 11, window.location.href.length)
  localStorage.setItem('token', token)
  console.log('stored token')
}
// if (!storedToken) {
//   window.location.href = 'http://localhost:3000/loginregister.html'
// }

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
      },
      currentMapLocation:'https://www.google.com/maps/embed/v1/place?key=AIzaSyComtCTHcgK-Hn-t4e_idADPWJgWpI4G4E&q=United+States'
    },
    methods: {
      showTab: (event) => {
        let allTabs = document.querySelectorAll('.tab-view')
        let allTabButtons = document.querySelectorAll('.single-tab')
        console.log('TAB BUTTONS', allTabButtons)
        for (let i = 0; i < allTabs.length; i++) {
          allTabs[i].style.display = 'none'
          allTabButtons[i].classList.remove('tab-active')
        }
        event.target.classList.add('tab-active')
        console.log(event.target.classList.value)
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

        fetch(`http://localhost:8000/contacts?user_token=${localStorage.getItem('token')}`, {
          method: 'post',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(app.newContact)
        })
          .then((response) => {
            console.log(response)
          })

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

        fetch(`http://localhost:8000/documents?user_token=${localStorage.getItem('token')}`, {
          method: 'post',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(app.newDocument)
        })
          .then((response) => {
            console.log(response)
          })

        app.newDocument = {
          title:'',
          content:''
        }
      },
      deleteContact: (event) => {
        let contactID = Number(event.target.firstElementChild.innerHTML)
        console.log(contactID)

        app.loadedContacts = app.loadedContacts.filter((item) => {
          return item.id !== contactID
        })

        fetch(`http://localhost:8000/delete_contact/${contactID}`, {
          method: 'post',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            console.log(response)
          })
      },
      deleteDocument: (event) => {
        let documentID = Number(event.target.firstElementChild.innerHTML)

        app.loadedDocuments = app.loadedDocuments.filter((item) => {
          return item.id !== documentID
        })

        fetch(`http://localhost:8000/delete_document/${documentID}`, {
          method: 'post',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            console.log(response)
          })
      },
      contactClicked: (event) => {
        alert(event.target.class)
      },
      documentClicked: (event) => {
        alert(event.target.class)
      },
      setMapLocation: (event) => {
        app.currentMapLocation = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyComtCTHcgK-Hn-t4e_idADPWJgWpI4G4E&q=' + event.target.innerHTML
      },
      toggleContactModal: (event) => {
        let modal = document.getElementById('contactModal');
        // Get the <span> element that closes the modal
        let span = document.getElementsByClassName("close")[0];
        // When the user clicks on the button, open the modal
        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
      },
      toggleDocumentModal: (event) => {
        let modal = document.getElementById('documentModal');
        // Get the <span> element that closes the modal
        let span = document.getElementsByClassName("close")[0];
        // When the user clicks on the button, open the modal
        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
      },
    }
  })
  app.loadAllContacts()
  app.loadAllDocuments()