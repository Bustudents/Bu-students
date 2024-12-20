import { storage } from './firebase.config';
import { ref, getDownloadURL } from 'firebase/storage';

export default async function Get({ imgurl,style }) { // Destructure imgurl from props
  try {
    // Create a reference to the file using .child() method
    const fileRef = ref(storage, imgurl); // imgurl should be the path to the file, like 'images/myImage.png'
    
    // Get the download URL
    const url = await getDownloadURL(fileRef);
    
    return <div className={`${style}`}><img src={url} alt="Image" /></div>;
  } catch (error) {
    console.error('Error getting download URL:', error);
  
  }
}
