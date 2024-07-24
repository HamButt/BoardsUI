import * as React from 'react';


 const Backdrop = () => {
    
    return (
      <div className=" absolute inset-0 z-50 h-screen w-full flex items-center justify-center bg-white bg-opacity-75">
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-[#FF9669]"></span>
          <span className="mt-2 text-[#FF9669]">Loading background...</span>
        </div>
      </div>
    );
  };

export default Backdrop