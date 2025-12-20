
import HomePage from "./Pages/HomePage" 
import Packages from "./Pages/Packages"

export default function App(){
  return (
      <>

      {/* //whatsapp icon */}
      <a
  href="https://wa.me/919876543210"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-5 right-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg hover:bg-green-600"
  aria-label="Chat on WhatsApp"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="h-7 w-7 fill-white"
  >
    <path d="M16 .5C7.5.5.7 7.3.7 15.7c0 2.8.7 5.5 2.1 7.9L.5 31.5l8.1-2.1c2.3 1.2 4.9 1.9 7.4 1.9 8.4 0 15.2-6.8 15.2-15.2C31.2 7.3 24.4.5 16 .5zm0 27.8c-2.3 0-4.5-.6-6.4-1.7l-.5-.3-4.8 1.2 1.3-4.6-.3-.5c-1.3-2-2-4.3-2-6.7 0-7 5.7-12.7 12.7-12.7s12.7 5.7 12.7 12.7S23 28.3 16 28.3zm6.9-9.5c-.4-.2-2.3-1.1-2.7-1.2-.4-.2-.6-.2-.9.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.6.2-.2.3-.4.4-.6.1-.2 0-.5-.1-.7-.2-.2-.9-2.1-1.2-2.8-.3-.7-.6-.6-.9-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .8.8.3 1.6.3 2.2.2.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5z"/>
  </svg>
</a>


  <HomePage/>
      </>
      
   
    
  )
}