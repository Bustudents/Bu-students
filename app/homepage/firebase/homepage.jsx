
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { db } from "./firebase.config";
import Hero from "../comonents/hero";
import Nav from "../comonents/nav";
import Page from "./fetch";
import stGraduationCertifications from "../comonents/cert"
import Mohmed from "../comonents/mohmed";
import { Card } from "../comonents/card";
import { Foot } from "../comonents/foot";
import Sc from "../comonents/test"
import PostGraduationCertifications from "../comonents/cert";
import Features from '../comonents/featchers';
export async function Homepage() {
  // Mock data for demonstration
  const list = [
    { img: "farj.jpg", text1: "DR. Mohamed Farag", text2: "Dean of the Faculty of Business Administration" },
    { img: "rbo.jpg", text1: "DR.Arbab Faris", text2: "associated professor,economic social and enviromental studies" }
  ];

  

  // Fetch data from Firebase
  const dataCollection = collection(db, "homepage");
  const snapshot = await getDocs(dataCollection);
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <div className="flex flex-col  items-center justify-center ">
<Link href={"/si"}/>

      {/* Main Hero Section */}
      <div className="HN flex flex-col relative w-[calc(100vw+40px)]   xs:top-16 2xl:top-0 xs:mt-5 2xl:mt-0  2xl:ml-0 2xl:mr-0 xs:bg-center 2xl:bg-top xs:h-[calc(100vw-100px)] 2xl:w-screen 2xl:h-screen">
         <Page />

        {/* Section Component */}
        
      
<div className=" component-scrollbar  flex items-center justify-center flex-col relative lg:mt-60 xs:mt-72 mb-[-300px]">  <Sc/></div>
        {/* Mohmed Component */}

    <div className="flex justify-center items-center lg:scale-90  xs:scale-90 xs:ml-10 lg:ml-0  relative  xs:bottom-64 lg:bottom-0"> <Features/> </div>

      
       
       <div>
          <div className="relative mb-[-300px] xs:top-[-250px] 2xl:top-10 2xl:ml-20  h-full xs:ml-10 ">
            <Foot />
          </div>
        </div>
      </div>
    </div>
  );
}
