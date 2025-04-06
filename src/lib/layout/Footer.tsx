'use client';

const Footer = () => {
    return (
        <footer className="flex w-full justify-center self-end">
            <div className="text-center">
                <p className="text-sm sm:text-base">
                    &copy; {new Date().getFullYear()}
                    {' | '}
                    <a
                        href="https://github.com/batd92"
                        className="text-blue-400 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Made by APT92
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
