import Image from "next/image"

export default function NaturTeknikPage():React.ReactElement {
    return (
        <main className="h-screen">
            <Image alt="Natur Teknik Banner" src="/images/naturteknik-banner.jpeg" width={1000} height={1000}/>
            <h1 className="text-blue-800">Natur Teknik page</h1>
        </main>
    )
}