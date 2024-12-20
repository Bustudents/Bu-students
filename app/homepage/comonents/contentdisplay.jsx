// app/components/ContentDisplay.js

export default function ContentDisplay({ content }) {
    return (
   
   <div className="content-display  h-64  flex flex-col items-center text-[60px] justify-center pt-80 mb-40 ]">
      
       <h1 className=" text-white font-extrabold flex   "> <div className="mr-10 "></div> 
       Batch
       <div className="eight ml-5 px-5  bg-red-600 bg-opacity-70 "> 18</div><div className="ml-10">graduation cermony</div> </h1>
    <h2 className=" flex text-white font-bold"> <div className=" mr-5 th">30th of decdember</div> </h2>
     
    <div className="flex  flex-row justify-center items-center pt-20  ">
 <div  className="flex items-center justify-center flex-col mr-5">
 <div  className=" flex flex-row m-5 justify-center items-center mb-1">
 <h1 className=" stat mr-2 font-extrabold text-[20px] "> Zanzibar</h1>
  <img src="assests/mingcute_location-fill.png" alt="" />
  
  </div>

  </div>
  <hr className="vertical-line "/>

 <div className="flex items-center justify-center flex-col mr-5 ">
  <div className=" flex flex-row m-5 justify-center items-center mb-1"> 
  <h1 className="stat mr-2 text-[20px] font-extrabold">4:30pm</h1>
   <img className="max-h-7 " src="assests/ri_time-line.png " />
   </div>

   </div>
   <hr className="vertical-line "/>
   <div className="flex items-center justify-center flex-col mr-5">
   <div className=" flex flex-row m-5 justify-center items-center mb-1">
   <h1 className=" stat mr-2 text-[20px] font-extrabold">BU-2020</h1>
   
   
   <img src=" /assests/tabler_certificate.png" />
   </div>
   
   </div>
    </div>
    </div>
    );
  }
