import Link from "next/Link";

export default function Header() {

    return(
        <>
            <header className="h-full flex p-2">
                <Link href="/" className="text-white flex items-center font-bold text-xl p-6">
                    NOC Red Móvil
                </Link>
            </header>
        </>
    )
}