import {initializeApp} from 'firebase/app'
import {
    getFirestore,collection,getDoc,
    addDoc,deleteDoc,doc, onSnapshot,
    query,where,
    orderBy,serverTimestamp,
    updateDoc
}from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,signInWithEmailAndPassword,
    onAuthStateChanged
}from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC14xWDKACeM6cf03y4bxtS6_cC-MTKTsI",
    authDomain: "fir-9-dojo-47511.firebaseapp.com",
    projectId: "fir-9-dojo-47511",
    storageBucket: "fir-9-dojo-47511.appspot.com",
    messagingSenderId: "248234985093",
    appId: "1:248234985093:web:b488e07e23b90cebce8bec"
  }

  //init firebase app
  firebase.initializeApp(firebaseConfig)
  const auth =getAuth()

  //init services
  const db = getFirestore()
  
  //collection reff
  const colRef = collection(db, 'books')

  //quaries
  const q = query(colRef,orderBy('createdAt'))
  
  //real time collection data
  const unsubCol = onSnapshot(q,(snapshot)=>{
    let books = []
    snapshot.docs.forEach((doc)=>{
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)

})

//adding documents
const addBookFrom = document.querySelector('.add')
deleteBookFrom.addEventListener('submit',(e) =>{
    e.preventDefault()

addDoc(colRef,{
    title: addBookFrom.title.value,
    author: addBookFrom.title.value,
    createdAt: serverTimestamp
})
.then(()=>{
    addBookFrom.requestFullscreen()
})
})

//deleting documents
const deleteBookFrom = document.querySelector('.delete')
deleteBookFrom.addEventListener('submit',(e) =>{
    e.preventDefault()

    const decRef = doc(db,'books',deleteBookFrom.id.value)
    deleteDoc(docRef)
    .then(() => {
deleteBookFrom.reset()
    })
})

//get a single document
const docRef = doc(db,'books','LHhPBudwn4k6THw8uypb')

const unsubDoc = onSnapshot(docRef,(doc) =>{
    console.log(doc.data(),doc.id)
})
getDoc(docRef)
.then((doc) =>{
    console.log(doc.data(),doc.id)
})

onSnapshot(docRef, () => {
    console.log(doc.data(), doc.id)
})

//updating a document
const updateFrom = document.querySelector('.update')
updateFrom.addEventListener('submit',(e) => {
    e.preventDefault()

    const decRef = doc(db,'books',deleteBookFrom.id.value)

    updateDoc(docRef,{
        title: 'updated title'
    })
    .then(() => {

    })
})

//signing users up
const signupForm = document.querySelector('.signup')
signupFormFrom.addEventListener('submit',(e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth,email,password)
    .then((cred) => {
        console.log('user created:',cred.user)
        signupForm.reset()
    })
    .catch.log(err.message)
})

//logging in and out
const logoutpForm = document.querySelector('.logout')
lohoutFormFrom.addEventListener('click',() => {
    signOut(auth)
    .then(() => {
        console.log('the user signed out')
    })
    .catch((err) =>{
        console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
signupFormFrom.addEventListener('submit',(e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth,email,password)
    .then((cred) =>{
        console.log('user logged in:',cred.user)
    })
    .catch((err) =>{
        console.log(err.message)
    })
})
    
//subcribing to auth changes
const unsubAuth=onAuthStateChanged(auth,(user) => {
    console.log('user status changes:',user)
})

//unsubcribing from changes (auth & db)
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click',() => {
    console.log('unsubcribing')
    unsubCol()
    unsubDoc()
    unsubAuth()

})
