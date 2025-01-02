

export const Foot = () => {
  return (
    
    <footer className=" text-white py-8" id="footer">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row justify-betweens items-center">
        {/* About Us Section */}
        <div className="mb-6 lg:mb-0  ml-5 lg:w-1/2">
          <h3 className="text-2xl font-bold text-red-500 mb-4">About Us</h3>
          <p className="text-gray-400">
          This website aims to gather all useful resources and information making it an always available service for the graduating business batch. 
 Make things easier, accessible and aesthetic.
          </p>
        </div>

        {/* Contact Info */}
        <div className="lg:w-1/2 text-center lg:text-righ mr-10">
          <h4 className="text-xl font-semibold text-red-500 mb-2">Contact Us</h4>
          <p className="text-gray-400">Email: ahmedshbika90@gmail.com</p>
          <p className="text-gray-400">whatsapp: +249118381607</p>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500  ">
      <span  className=" can " > &copy;<span className="you text-[#05050A]">an</span></span> {new Date().getFullYear()} Bu-students. All rights reserved.
      </div>
    </div>
  </footer>
  )
}
// components/Footer.js
