import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Gallery from "../pages/Gallery";
import NotFoundPage from "../components/errors/NotFoundPage";
import ScrollToTop from "../components/common/ScrollToTop";

const AppRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about-us" element={<AboutUs />} />
                    <Route path="gallery" element={<Gallery />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export default AppRoutes;