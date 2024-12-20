

export const Card = (props) => {
  return (
    <div className=" card  2xl:mr-48 xs:mr-0 xs:scale-75 2xl:scale-100  flex mb-10  flex-shrink flex-nowrap  w-full h-full rounded-3xl    p-10 py-5 flex-col bg-[#06060B]">
        <div className="flex  text-white  justify-center  items-center"> <img src={`/assests/${props.img}`} className=" 2xl:scale-95 xs:scale-75 " alt="" /> <h1 className="ml-8 
        font-bold 2xl:text-[25px]  xs:text-[20px]
        ">{props.text1}
        </h1>  </div>
   <hr className=" mt-5 bg-red-600 mb-5" />
   
   <div className="text-white font-bold 2xl:text-[25px] xs:text-[20px] w-72"><p> 
   {props.text2} </p></div>
    </div>
  )
}
