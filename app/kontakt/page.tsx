import Image from 'next/image'

export default async function ContactPage() {
  return (
    <main className="h-full min-h-screen flex m-5">
      <div className="w-full bg-white/90 rounded-lg shadow-xl mr-0 lg:mr-10 p-8">
        <h1 className="text-4xl font-bold text-center mb-5">Kontakt Forlaget Kluddermor</h1>
      
        <div className="justify-center text-center">
            <p>
              Hannevej 16 <br/>
              3060 Espergærde <br/>
              forlagetkluddermor@gmail.com<br/>
              Tlf. 20 91 56 27<br/>
              CVR 42724505<br/>
            </p>
            <p className="flex flex-col mt-5 font-extrabold">
              Send gerne feedback, ønsker af nye materialer eller bare et spørgsmål!
              <a className="m-auto mt-5 bg-sky-600 w-fit p-3 rounded-full font-extrabold text-white text-lg hover:scale-105 hover:bg-sky-500 transform-size duration-200" href="mailto:forlagetkluddermor@gmail.com?subject=Ang. SkoleBole: &body=%0D%0A%0D%0AMail sendt fra SkoleBoles hjemmeside">Send en mail</a>
            </p>
            <br/>
        </div>

        <h2 className="font-bold text-2xl">Hvem står bag SkoleBole?</h2>
        <div className="md:flex block gap-5 mt-5">
            <div className="md:w-3/5 md:mb-0 w-full mb-5">
              <p className="text-base/7">
                SkoleBole er skabt af speciallærer Liselotte Ring Kryger, der i mere end 25 år har arbejdet med børns tidlige læse- og skriveudvikling – særligt med fokus på de børn, for hvem læsning ikke kommer helt af sig selv. Gennem sit arbejde har hun udviklet læseprogrammet Læseslangen og et omfattende materialeunivers målrettet børnehaveklassen, indskolingen og specialundervisningen.  
                <br/>
                SkoleBole er ejet af Forlaget Kluddermor. Hvor forlagets materialer rummer de længere, strukturerede forløb og den tydelige progression, tilbyder SkoleBole små, overskuelige opgaver, der hurtigt kan tages i brug i hverdagen – som morgenopgaver, repetition, stillearbejde eller ekstra træning. Her er fokus på genkendelige opgavetyper, ro og gentagelse, så børnene kan arbejde selvstændigt og opbygge faglig tryghed. SkoleBole er udviklet med udgangspunkt i klasseværelsets virkelighed og er skabt til lærere, pædagoger og andre fagprofessionelle, der har brug for materialer, der er nemme at bruge – også når tiden er knap. 
                <br/>
                Fælles for både SkoleBole og Forlaget Kluddermor er ønsket om at gøre læsning tilgængelig for alle børn og give dem de bedst mulige forudsætninger for at få en god start på skolelivet.
              </p>
              
            </div>
            <div className="md:w-2/5 w-full">
            <Image alt="Billede af Forlaget Kluddermor forfatter" src="/images/forlaget_forfatter.JPG" width={1462} height={1793} className="h-fit m-auto" />
            <div className="flex items-center mt-5 mb-5">
                <a href="https://www.forlagetkluddermor.com" target="_blank" className=" m-auto bg-orange-600 w-fit p-4 rounded-full font-extrabold text-white hover:bg-orange-500 hover:scale-105 transform-size duration-200">Besøg Forlaget Kluddermor</a>
              </div>
            </div>
        </div>
      </div>
    </main>
  )
}