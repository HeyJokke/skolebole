import HighlightMaterials from "@/lib/components/highlightMaterials"

export default async function Home() {
  return (
    <main className="h-full min-h-screen flex m-5">
      <div className="w-full">
      
        <div className="md:flex sm:block text-slate-700">
          <div className="bg-white/90 rounded-lg shadow-xl mr-0 lg:mr-10 md:mr-8 p-8 mb-5 lg:mb-0">
            <h1 className="text-4xl font-bold text-center mb-5">Velkommen til SkoleBole</h1>
            <p className="lg:mr-5 mb-10 text-lg/7">
              Tak fordi du kigger forbi hos Forlaget Kluddermors nye lillebror SkoleBole, som er en enkel og overskuelig materialeplatform med printklare kopisider til de yngste elever. Her finder du små opgaver, der kan bruges enkeltvis og tages i brug med det samme – særligt på de dage, hvor dagens program ændrer sig, der er færre voksne, eller en vikar har brug for en klar og enkel opgave her og nu.
              <br/>
              Materialerne hos SkoleBole er skabt som et supplement til undervisningen. Opgaverne står alene, kræver ingen forberedelse og egner sig godt som morgenopgaver, ekstraopgaver og til repetition, hvor eleverne genøver kendte færdigheder i deres eget tempo.
              SkoleBole er samtidig et uforpligtende og legende udviklingsrum. Her eksperimenteres med opgavetyper, udtryk og formater, og der er plads til oldschool kopisider, hvor ikke alt behøver indgå i et større system. Nogle af materialerne er ligeledes forenklede udpluk inspireret af Kluddermors mest anvendte opgavetyper.
            </p>
            <h2 className="text-2xl mb-2 font-bold">Det får du hos SkoleBole:</h2>
              <ul className="list-disc list-inside text-lg/7">
                <li>Små, selvstændige kopisider i PDF-format</li>
                <li>Opgaver, der kan bruges her og nu</li>
                <li>Velegnet til morgenstart, ekstra tid, vikarer og repetition</li>
                <li>Et kreativt rum med lav kompleksitet og høj tilgængelighed</li>
              </ul>
            <br/>
            <h2 className="text-2xl mb-2 font-bold">Det får du <span className="italic">ikke</span> hos SkoleBole:</h2>
              <ul className="list-disc list-inside text-lg/7">
                <li>Et samlet læseprogram</li>
                <li>Materialer med fast progression og trin-for-trin-opbygning</li>
                <li>Forløb med differentiering og lærervejledninger</li>
                <li>Lamineringsmaterialer, større kopimapper eller spil</li>
              </ul>
              <div className="flex items-center mt-5 mb-5">
                <a href="https://www.forlagetkluddermor.com" target="_blank" className=" m-auto bg-orange-600 w-fit p-4 rounded-full font-extrabold text-white hover:bg-orange-500 hover:scale-105 transform-size duration-200">Besøg Forlaget Kluddermor</a>
              </div>
            <p className="lg:mr-5 mb-10 text-lg/7">
              Har dine elever brug for et gennemarbejdet læseprogram med tydelig progression, struktur og differentiering, finder du det stadig hos Forlaget Kluddermor, der samler det hele i ét sammenhængende system. SkoleBole er stedet for de små opgaver, der skal ligge klar, når noget opstår – og til de idéer, der gerne må prøves af uden store krav eller bindinger.
              <br/><br/>
              De bedste hilsner<br/>
              Liselotte Ring Kryger<br/>
              Forlægger & forfatter på<br/>
              SkoleBole og Forlaget Kluddermor
            </p>
            <br/><br/>
            <span className="italic">Al kopiering, analogt og digitalt, af SkoleBoles materialer eller dele deraf er tilladt i henhold til undervisningsinstitutionens aftale med <span className="font-bold">Tekst & Node</span>.
            <br/>
            Kopiering, der går ud over begrænsningsreglerne i aftalen med <span className="font-bold">Tekst & Node</span>, kan alene finde sted efter forudgående aftale med SkoleBole / Forlaget Kluddermor.</span>
          </div>
          <HighlightMaterials title={"Tilføjet for nyligt"} vertical={true} amount={4}/>
        </div>
      </div>
    </main>
  )
}
