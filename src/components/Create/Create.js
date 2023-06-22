import React, { Fragment ,useState,useContext} from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext,FirebaseContext } from '../../store/Context';
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { addDoc, getFirestore ,collection} from 'firebase/firestore/lite';
import { useNavigate } from 'react-router';

const Create = () => {
const navigate=useNavigate()
const [name,setName]=useState("")
const [category,setCategory]=useState("")
const [price,setPrice]=useState("")
const [image,setImage]=useState("")

const{user}=useContext(AuthContext)
const{firebaseApp}=useContext(FirebaseContext)


const handleSubmit=async(e)=>{
  e.preventDefault()

 const storage=getStorage(firebaseApp)
 const imageRef=ref(storage,`/images/${image.name}`)
 await uploadBytes(imageRef,image)

 // Get the download URL of the uploaded image
 const imageUrl = await getDownloadURL(imageRef);
 console.log(imageUrl);

 const firestore=getFirestore(firebaseApp)
 await addDoc(collection(firestore,'products'),{
  name:name,
  category:category,
  price:price,
  imageUrl:imageUrl,
  userId:user.uid,
  createdAt:new Date().toDateString()
 })
 navigate('/')
}

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>{
                setName(e.target.value)
              }}
              id="fname"
              name="Name"
              
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={price}
              onChange={(e)=>{
                setPrice(e.target.value)
              }} id="fname" name="Price" />
            <br />
         
          <br />
          <img  alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : "" }></img>
      
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file"/>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
