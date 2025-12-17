import Image from 'next/image'

export default function SupportPage() {
    return (
        <main className="h-full min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-6">{"Gi'"} en kop kaffe</h1>
                    
                    <div className="mb-8">
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
                            Hvis du har lyst til at støtte mit arbejde, må du meget gerne købe mig en kop kaffe ☺️
                            Det kan være en helt almindelig sort filterkaffe - eller en stor, luksus grande macchiato med ekstra flødeskum.
                            <br/>
                            Jeg bliver glad uanset størrelsen.
                            Dit bidrag går direkte til det, jeg elsker allermest:
                            at udvikle praksisnære materialer, der gør læsning mere overskuelig, mere legende - og mere mulig for alle børn 💛
                        </p>
                        
                        <div className="flex justify-center mb-8">
                            <Image 
                                className="h-auto" 
                                src='/images/coffee_swipe.png' 
                                alt="Billede af en kaffe der bliver sendt afsted" 
                                height={500} 
                                width={500}
                            />
                        </div>
                        
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                            <p className="text-lg font-semibold text-red-800 mb-2">Støt via MobilePay</p>
                            <p className="text-gray-700">
                                Send til <span className="font-bold text-red-900">Liselotte Kryger</span>
                            </p>
                            <p className="text-2xl font-mono text-red-900 mt-2">20 91 56 27</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}