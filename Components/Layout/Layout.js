import Header from "./Header"
export default function Layout({children}) {

    return(
        <div className="h-full">
            <div className="h-full">
                <header className="h-[60px] sticky top-0 z-30 bg-red-600 shadow-md shadow-red-300/500">
                    <Header />
                </header>
                <div className="w-full h-[calc(100%-60px)]">
                    {children}
                </div>
            </div>
        </div>
    )
}