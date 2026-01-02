const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
    const baseStyle = "inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer gap-2 relative overflow-hidden group";

    const sizes = {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 text-base rounded-xl",
        lg: "px-8 py-4 text-lg rounded-xl"
    };

    const variants = {
        primary: "bg-tekfo-secondary text-tekfo-primary shadow-lg shadow-tekfo-secondary/20 hover:shadow-tekfo-secondary/40 hover:-translate-y-1 hover:bg-tekfo-primary",
        outline: "bg-transparent border-2 border-tekfo-secondary text-tekfo-secondary hover:bg-tekfo-secondary hover:text-tekfo-primary",
        ghost: "bg-transparent text-tekfo-secondary hover:bg-zinc-100"
    };

    return (
        <button
            className={`${baseStyle} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;