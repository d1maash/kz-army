"use client"

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const LoadingLayout = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time or fetch data here
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the timeout as needed

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return <>{children}</>;
};

export default LoadingLayout; 