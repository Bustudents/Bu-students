export const Card = (props) => {
  return (
    <div className="card ml-6 2xl:mr-48 xs:mr-0 xs:scale-75 2xl:scale-100 flex flex-col items-center w-full h-full p-6 rounded-3xl bg-gradient-to-br from-gray-950 via-gray-900 to-black shadow-lg mb-10 relative group">
      
      {/* Avatar and Name */}
      <div className="header flex flex-col items-center text-white relative">
        <div className="avatar-container w-24 h-24 2xl:w-28 2xl:h-28 rounded-full overflow-hidden border-4 border-red-700 shadow-md">
          <img src={`/assests/${props.img}`} className=" mb-0 2x:mb-2 rounded-full w-[125px] h-[125px]" alt="" /> 
        </div>
        <h1 className="mt-4 font-semibold xs:text-lg 2xl:text-xl tracking-wide text-center lg:text-left">
          {props.text1}
        </h1>
      </div>

      {/* Divider */}
      <hr className=" mt-6 w-full border-1 border-red-500 opacity-50 " />

      {/* Card Content */}
      <div className="text-white font-bold 2xl:text-[17px] xs:text-[15px] w-72 text-center lg:text-left lg:ml-6 mt-4">
        <p>{props.text2}</p>
      </div>

      {/* Overlay */}
      <div className="overlay absolute rounded-3xl inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Coming Soon
      </div>
    </div>
  );
};
