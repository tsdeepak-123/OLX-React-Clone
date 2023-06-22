import React,{useEffect,useContext, useState} from 'react';
import { firestore } from '../../firebase/config';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs } from 'firebase/firestore/lite';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router';

function Posts() {
  const navigate=useNavigate()
const {firebaseApp}=useContext(FirebaseContext)
const [products,setProducts]=useState([])
const {setPostDetails}=useContext(PostContext)

useEffect(()=>{
  const fetchData =async()=>{
    const querySnapshot=await getDocs(collection(firestore,"products"))
    const allPost=querySnapshot.docs.map((product)=>{
      return {
        ...product.data(),
        id:product.id
      }
    })
      setProducts(allPost)  
  }
  fetchData();
},[])

return (
  <div className="postParentDiv">
    <div className="moreView">
      <div className="heading">
        <span>Quick Menu</span>
        <span>View more</span>
      </div>
      <div className="cards">
{   products.map(product=>{
 console.log(product,'dffffffffffffffffffffffffffffffffffffffffffffffffffffffff')


return <div
      className="card" key={product.id}
      onClick={()=>{
        setPostDetails(product)
        navigate('/view')
      }}
      >
          <div className="favorite">
            <Heart></Heart>
          </div>
          <div className="image">
            <img src={product.imageUrl} alt="product_image" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; {product.price}</p>
            <span className="kilometer">{product.category}</span>
            <p className="name"> {product.name}</p>
          </div>
          <div className="date">
            <span>{product.createdAt}</span>
          </div>
        </div>
        }
         )
      }
      </div>
    </div>
    
  </div>
  );
}

export default Posts;
