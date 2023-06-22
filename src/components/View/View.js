import React ,{useContext,useState,useEffect} from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, query, where, getDocs } from "firebase/firestore/lite";
// import { firestore } from '../../firebase/config';

function View() {
const[userDetails,setUserDetails]=useState("")
const {PostDetails}=useContext(PostContext)
const {firestore}=useContext(FirebaseContext)
console.log(userDetails)

useEffect(()=>{


  const fetchData=async()=>{
    if(PostDetails?.userId){
     const {userId}=PostDetails;
     console.log(userId,"iddddddddddddd");
     const queryDetails =query(collection(firestore,"user"), where("id", "==", userId))
     console.log(queryDetails);
     const querySnapshot=await getDocs(queryDetails)
     querySnapshot.forEach((doc)=>{
      console.log(doc.data(),"dataaaasssssssssssssssss");
      setUserDetails(doc.data())
     })
    }
  }
  fetchData();
},[])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={PostDetails ? PostDetails.imageUrl :""}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {PostDetails ? PostDetails.price :""} </p>
          <span>{PostDetails ?PostDetails.name :""}</span>
          <p>{PostDetails ? PostDetails.category :""}</p>
          <span>{PostDetails ? PostDetails.createdAt :""}</span>
        </div>
        {userDetails  && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
}
      </div>
    </div>
  );
}
export default View;
