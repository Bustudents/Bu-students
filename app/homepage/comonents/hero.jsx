import Nav from "./nav"

export const Hero = ({stat}) => {
  return (
   <div>
   <div     className=" 2xl:flex xs:hidden  z-5  text-white text-[64px] pt-40 font-sans font-extrabold flex-col items-center justify-start ">
  <div key={stat.id}   className="flex flex-col justify-start">  <div className=" flex row  "><h2 className="mr-4">Faculty of</h2> <h2 className="text-[#FA0000]">Business</h2> </div>   <h2>administration</h2></div>

    </div>
<div className="2xl:pt-44 flex flex-col xs:pt-[150px]  justify-center">

<div className="2xl:hidden xs:visible flex flex-col  pt-20 text-[40px] font-extrabold"><div>faculty of</div> <div className=" Buss  ">
  Business 
</div>
 <div>administration</div></div>
<div className="flex  z-5 flex-row justify-center items-center  xs:scale-75 2xl:scale-100 2xl:pt-0 xs:pt-10  ">
 <div  className="flex items-center justify-center flex-col 2xl:mr-5 xs:mr-0">
 <div  className=" flex flex-row m-5 justify-center items-center mb-1 flex-shrink">
 <h1 className=" stat mr-2 font-extrabold text-[20px] 2xl:text-[20px] xs:text-[15px]"> {stat.Batches }</h1>
  <img src="/assests/mingcute_certificate-line.png" alt="" />
  
  </div>
 <h1 className=" font-black  2xl:text-[20px] xs:text-[12px]">Batches</h1>
  </div>
  <hr className="vertical-line "/>

 <div className="flex items-center z-5 justify-center flex-col 2xl:mr-5 xs:mr-0 ">
  <div className=" flex flex-row m-5 justify-center items-center  mb-1"> 
  <h1 className="stat mr-2 2xl:text-[20px] xs:text-[15px] font-extrabold "> {stat.bachler}</h1>
   <img className="max-h-7 " src="/assests/game-icons_graduate-cap (1).png " />
   </div>
   <h1 className=" font-black  2xl:text-[20px] xs:text-[12px] xs:w-[140px] 2xl:w-full ">Bachelor graduates</h1>
   </div>
   <hr className="vertical-line "/>
   <div className="flex items-center z-5 justify-center flex-col ">
   <div className=" flex flex-row m-5 justify-center items-center mb-1">
   <h1 className=" stat mr-2 text-[20px] font-extrabold 2xl:text-[20px] xs:text-[15px]"> {stat.master}</h1>
   
   
   <img src=" /assests/tabler_certificate.png" />
   </div>
   <h1 className=" font-black  2xl:text-[20px] xs:text-[12px]  xs:w-[120px] 2xl:w-full" >masters graduates</h1>
   </div>
    </div>
    </div></div>
  )
}


export default Hero