
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { db } from "./firebase.config";
import Hero from "../comonents/hero";
import Nav from "../comonents/nav";
import Page from "./fetch";


import Mohmed from "../comonents/mohmed";
import { Card } from "../comonents/card";
import { Foot } from "../comonents/foot";
import Sc from "../comonents/test"
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
    <div className="flex flex-col  component-scrollbar max-w-screen ">
<Link href={"/si"}/>

      {/* Main Hero Section */}
      <div className="HN flex flex-col relative    xs:top-16 2xl:top-0 xs:mt-5 2xl:mt-0 xs:ml-5 xs:mr-5 2xl:ml-0 2xl:mr-0 xs:bg-center 2xl:bg-top xs:h-[calc(100vw-100px)] 2xl:w-screen 2xl:h-screen">
         <Page />

        {/* Section Component */}
        
      
<div className=" component-scrollbar flex items-center justify-center flex-col relative ]">  <Sc/></div>
        {/* Mohmed Component */}
        <div className="scroll2   overflow-x-hidden mr-5 2xl:mt-[-25px] xs:mt-5 xs:pt-[50px] 2xl:pt-0 ">
          <Mohmed />
        </div>

        {/* Influencing Academia Section */}
        <div className="scroll3 2xl:mt-0 xs:mt-10  overflow-x-hidden  flex 2xl:ml-0 xs:ml-10 flex-col items-center justify-center">
          <div className="flex flex-col justify-start items-start 2xl:pt-[250px] xs:pt-[20px] h-fit w-fit 2xl:mt-7 2xl:ml-72 ">
            <h1 className="text-white relative  xs:right-0  2xl:right-[200px]   font-extrabold 2xl:text-[40px] mb-14 xs:text-[20px] 2xl:mb-20  xs:mb-52 xs:ml-8 2xl:ml-20  ">
              Influencing Academia
            </h1>
            <div className=" hav flex justify-center items-center flex-nowrap mb-20 h-[300px] w-[400px] relative right-10 2xl:flex-row xs:flex-col ">
              {list.map((item, index) => (
                <Card key={index} img={item.img} text1={item.text1} text2={item.text2} />
              ))}
            </div>
          </div>
          <div className="relative   overflow-x-hidden xs:top-52 2xl:top-10 2xl:ml-20 xs:ml-0  ">
            <Foot />
          </div>
        </div>
      </div>
    </div>
  );
}
