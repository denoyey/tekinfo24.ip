import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#1a1a1a] text-white py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center gap-6">

                <div className="flex flex-col items-center gap-2">
                    <a href='/' className="flex items-center gap-3">
                        <img
                            src="/assets/favicon/logo_ti.png"
                            alt="Logo Teknik Informatika"
                            className="w-10 h-auto grayscale hover:grayscale-0 transition-all duration-500"
                        />
                        <span className="text-xl font-bold tracking-tight">Tekinfo24</span>
                    </a>
                    <p className="text-zinc-500 text-sm font-medium">Satu Kelas, Sejuta Cerita.</p>
                </div>

                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-bold tracking-widest text-zinc-400">
                    <Link to="/" className="hover:text-white transition-colors uppercase">Home</Link>
                    <Link to="/about-us" className="hover:text-white transition-colors uppercase">About Us</Link>
                    <Link to="/gallery" className="hover:text-white transition-colors uppercase">Gallery</Link>
                </nav>

                <div>
                    <a
                        href="https://instagram.com/tekinfo24.ip"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-white hover:bg-white/5 transition-all duration-300"
                    >
                        <Instagram size={18} />
                    </a>
                </div>

                <div className="border-t border-zinc-800 w-full pt-6">
                    <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-widest leading-relaxed">
                        © 2024 - {currentYear} Tekinfo24 - <span className="md:hidden">UNIPI</span><span className="hidden md:inline">Universitas Insan Pembangunan Indonesia</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;