import "./styles.css";
import { useState } from "react";
import { app, database } from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
  } from "firebase/firestore";

export default function App() {
  const [data, setData] = useState({});
  const handleInput = (event) => {
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  };

  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();

  const collectionRef = collection(database, "users");

  const signUp = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const google = () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSubmit = () => {
    addDoc(collectionRef, {
      email: data.email,
      password: data.password
    })
      .then(() => {
        alert("Data added");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const getData = () => {
    getDocs(collectionRef).then((response) => {
      console.log(
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  const updateData=()=>{
    const docToUpdate=doc(database,"users",'biIAUz6UojFjUOhfIJnv');
    updateDoc(docToUpdate,{
      email:"ABC",
      password:"123"
    })
    .then(()=>{
      alert("Data updated")
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  const deleteData=()=>{
    const docToUpdate=doc(database,"users",'biIAUz6UojFjUOhfIJnv');
    deleteDoc(docToUpdate)
    .then(()=>{
      alert("Data deleted")
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  return (
    <div className="App-header">
      <input
        placeholder="Email"
        name="email"
        onChange={(event) => handleInput(event)}
      />
      <input
        placeholder="Password"
        name="password"
        onChange={(event) => handleInput(event)}
      />
      <br />
      <br />
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
      <button onClick={google}>Google Sign In</button>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={getData}>Get Data</button>
      <button onClick={updateData}>Update Data</button>
      <button onClick={deleteData}>Delete Data</button>
    </div>
  );
}
