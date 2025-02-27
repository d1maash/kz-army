const Loader = () => {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="relative w-24 h-24">
          {/* Outer spinning circle */}
          <div className="absolute inset-0 border-4 border-custom-yellow border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  };
  
  export default Loader;