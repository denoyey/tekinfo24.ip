import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../components/layout/MainLayout";
import ScrollToTop from "../components/common/ScrollToTop";
import { Loader2 } from "lucide-react";

const Home = lazy(() => import("../pages/Home"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Gallery = lazy(() => import("../pages/Gallery"));
const NotFoundPage = lazy(() => import("../components/errors/NotFoundPage"));

const PageLoader = () => (
    <div className="flex items-center justify-center w-full h-screen bg-white">
        <Loader2 className="animate-spin text-zinc-500" size={32} />
    </div>
);

const AppRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="about-us" element={<AboutUs />} />
                        <Route path="gallery" element={<Gallery />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default AppRoutes;