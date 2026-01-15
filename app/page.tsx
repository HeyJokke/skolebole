import ForlagetLink from "@/lib/components/forlagetLink"
import Link from "next/link"

export default async function Home() {
  const linkClass = "bg-cover overflow-hidden h-[230px] w-[230px] m-auto flex justify-center items-center border-2 border-red-500 rounded-full text-center font-bold hover:border-red-400 hover:bg-gray-100 transition duration-250 hover:scale-102"
  return (
    <main className="h-full min-h-screen flex m-5">
      <div className="w-full text-slate-700">
            <h1 className="text-5xl font-bold text-center mb-5 mt-5 lg:mt-0 font-bubblegum-sans">Velkommen til SkoleBole</h1>
            <p className="lg:mr-5 mb-5 text-lg/7">
              Tak fordi du kigger forbi hos Forlaget Kluddermors nye lillebror SkoleBole, som er en enkel og overskuelig materialeplatform med printklare kopisider til de yngste elever. Her finder du små opgaver, der kan bruges enkeltvis og tages i brug med det samme, særligt på de dage, hvor dagens program ændrer sig eller en vikar har brug for en klar og enkel opgave her og nu.
            </p>
            <div className="m-auto grid lg:grid-cols-4 md:grid-cols-3 gap-5 md:w-full w-100">
              <Link className={`bg-[url(/images/dansk_boble.png)] ${linkClass}`} href="materialer/dansk" />
              
              <Link className={`bg-[url(/images/matematik_boble.png)] ${linkClass}`} href="materialer/matematik" />

              <Link className={`bg-[url(/images/morgenopgaver_boble.png)] ${linkClass}`} href="materialer/morgenopgaver" />

              <Link className={`bg-[url(/images/demo_boble.png)] ${linkClass}`} href="materialer/demoopgaver" />

              <Link className={`bg-[url(/images/bhkl_boble.png)] ${linkClass}`} href="materialer/boernehaveklassen" />

              <Link className={`bg-[url(/images/1klasse_boble.png)] ${linkClass}`} href="materialer/1.klasse" />
              
              <Link className={`bg-[url(/images/DSA_boble.png)] ${linkClass}`} href="materialer/dsa" />

              <Link className={`bg-[url(/images/specunderv_boble.png)] ${linkClass}`} href="materialer/specialundervisning" />

            </div>
            <p className="lg:mr-5 mb-10 mt-5 text-lg/7">
              Materialerne hos SkoleBole er skabt som et supplement til undervisningen. Opgaverne står alene, kræver ingen forberedelse og egner sig godt som morgenopgaver, ekstraopgaver og til repetition, hvor eleverne genøver kendte færdigheder i deres eget tempo.
              SkoleBole er samtidig et uforpligtende og legende udviklingsrum. Her eksperimenteres med opgavetyper, udtryk og formater, og der er plads til oldschool kopisider, hvor ikke alt behøver indgå i et større system. Nogle af materialerne er ligeledes forenklede udpluk inspireret af Kluddermors mest anvendte opgavetyper.
            </p>
            <h2 className="text-2xl mb-2 font-bold">Det får du hos SkoleBole:</h2>
              <ul className="list-disc list-inside text-lg/7">
                <li>Printklare kopisider i PDF-format</li>
                <li>Opgaver, der kan bruges her og nu</li>
                <li>Velegnet til morgenstart, ekstra tid, vikarer og repetition</li>
                <li>Et kreativt rum med lav kompleksitet og høj tilgængelighed</li>
                <li>Smagsprøver og demoversioner af udvalgte materialer fra Kluddermor</li>
              </ul>
            <br/>
            <h2 className="text-2xl mb-2 font-bold">Det får du <span className="italic">ikke</span> hos SkoleBole:</h2>
              <ul className="list-disc list-inside text-lg/7 mb-10">
                <li>Et samlet læseprogram</li>
                <li>Materialer med fast progression og trin-for-trin-opbygning</li>
                <li>Forløb med differentiering og lærervejledninger</li>
                <li>Lamineringsmaterialer, større kopimapper eller spil</li>
                <li>De resterende 98% af Forlaget Kluddermors materialer</li>
              </ul>
              <ForlagetLink />
            <p className="lg:mr-5 mb-10 text-lg/7 mt-10">
              Har dine elever brug for et gennemarbejdet læseprogram med tydelig progression, struktur og differentiering, finder du det stadig hos Forlaget Kluddermor, der samler det hele i ét sammenhængende system. SkoleBole er stedet for de små opgaver, der skal ligge klar, når noget opstår – og til de idéer, der gerne må prøves af uden store krav eller bindinger.
              <br/><br/>
              De bedste hilsner<br/>
              Liselotte Ring Kryger<br/>
              Forlægger & forfatter på<br/>
              SkoleBole og Forlaget Kluddermor
            </p>
            <br/>
            <p><span className="italic">Al kopiering, analogt og digitalt, af SkoleBoles materialer eller dele deraf er tilladt i henhold til undervisningsinstitutionens aftale med <span className="font-bold">Tekst & Node</span>.
            Kopiering, der går ud over begrænsningsreglerne i aftalen med <span className="font-bold">Tekst & Node</span>, kan alene finde sted efter forudgående aftale med SkoleBole / Forlaget Kluddermor.</span></p>
      </div>
    </main>
  )
}
