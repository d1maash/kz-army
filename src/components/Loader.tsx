"use client"

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="loader">
                {/* You can customize this loader with CSS or use an animated spinner */}
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-custom-yellow"></div>
                <p className="mt-4 text-lg">Загрузка...</p>
            </div>
        </div>
    );
};

export default Loader;