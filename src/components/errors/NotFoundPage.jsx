import { Link } from "react-router-dom";
import { ArrowLeft, WifiOff } from "lucide-react";

const NotFoundPage = () => {
    return (
        <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 relative overflow-hidden bg-white">
            <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50"></div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-100 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6 rotate-12 shadow-inner">
                    <WifiOff size={32} className="text-zinc-400 md:w-10 md:h-10" />
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 mb-2">
                    404
                </h1>

                <h2 className="text-xl md:text-2xl font-bold text-zinc-800 mb-3 md:mb-4">
                    Halaman Tidak Ditemukan
                </h2>

                <p className="text-zinc-500 text-sm md:text-base mb-6 md:mb-8 leading-relaxed max-w-xs md:max-w-md mx-auto">
                    Maaf, halaman yang kamu tuju tidak ditemukan. Mungkin URL-nya salah ketik atau halamannya sudah tidak tersedia.
                </p>

                <Link
                    to="/"
                    className="group inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-full font-medium text-sm md:text-base transition-all hover:bg-zinc-800 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                    <ArrowLeft size={16} className="md:w-[18px] md:h-[18px] group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Home
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;