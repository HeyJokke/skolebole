import ForlagetLink from "@/lib/components/forlagetLink"
import Link from "next/link"

export default async function Home() {
  const linkClass = "bg-cover overflow-hidden h-[230px] w-[230px] m-auto flex justify-center items-center border-2 border-red-500 rounded-full text-center font-bold hover:border-red-400 hover:bg-gray-100 transition duration-250 hover:scale-102"
  return (
    <main className="h-full min-h-screen flex m-5">
      <div className="w-full text-slate-700">
            <h1 className="text-5xl font-bold text-center mb-5 mt-5 lg:mt-0 font-bubblegum-sans">Velkommen til SkoleBole</h1>
            <p className="lg:mr-5 mb-5 text-lg/7">
              Tak fordi du kigger forbi hos <span className="font-bold">Forlaget Kluddermors</span> nye lillebror <span className="font-bold">SkoleBole</span>, som er en enkel og overskuelig materialeplatform med printklare kopisider til de yngste elever. Materialerne kan anvendes fleksibelt i undervisningen og egner sig godt som morgenopgaver, ekstraopgaver, til repetition og andre tidspunkter, hvor eleverne arbejder selvstændigt og i deres eget tempo.
            </p>
            <div className="m-auto grid lg:grid-cols-4 md:grid-cols-3 gap-5">
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
              <span className="font-bold">SkoleBole</span> rummer både materialer, der er udviklet specifikt til siden, og udvalgte opgaver fra <span className="font-bold">Forlaget Kluddermor</span>. Materialerne er kendetegnet ved en intuitiv opbygning, som gør dem lette for eleverne at gå til og velegnede til selvstændigt arbejde uden lange forklaringer. Du vil møde genkendelige opgavetyper og faglige greb fra <span className="font-bold">Kluddermors</span> univers, men ønsker du et samlet og sammenhængende læseprogram med tydelig progression og en rød tråd i læseudviklingen, finder du det fortsat hos <span className="font-bold">Forlaget Kluddermor</span>.
            </p>
            <h2 className="text-2xl mb-2 font-bold">Det får du hos SkoleBole:</h2>
              <ul className="list-disc list-inside text-lg/7">
                <li>Printklare kopisider til direkte download</li>
                <li>Små, overskuelige opgaver til morgenstart, ekstratid og repetition</li>
                <li>Et lavpraktisk og kreativt opgaverum med fokus på tilgængelighed</li>
                <li>Udvalgte smagsprøver og demomaterialer fra <span className="font-bold">Kluddermors</span> univers</li>
              </ul>
            <br/>
            <h2 className="text-2xl mb-2 font-bold">Det får du <span className="italic">ikke</span> hos SkoleBole:</h2>
              <ul className="list-disc list-inside text-lg/7 mb-10">
                <li>Et samlet og sammenhængende læseprogram</li>
                <li>Materialer bygget op i faste læsetrin og tydelig progression</li>
                <li>Systematiske forløb med differentiering og lærervejledninger</li>
                <li>Lamineringsmaterialer, spil, stationer eller større materialepakker</li>
                <li>Adgang til de resterende 95% af <span className="font-bold">Kluddermors</span> materialer</li>
              </ul>
              <ForlagetLink />
            <p className="lg:mr-5 mb-10 text-lg/7 mt-10">
              Har dine elever brug for et gennemarbejdet læseprogram med tydelig progression, struktur og differentiering, finder du det stadig hos <span className="font-bold">Forlaget Kluddermor</span>, der samler det hele i ét sammenhængende system. SkoleBole er stedet for de små opgaver, der skal ligge klar, når noget opstår – og til de idéer, der gerne må prøves af uden store krav eller bindinger.
              <br/><br/>
              De bedste hilsner<br/>
              Liselotte Ring Kryger<br/>
              Forlægger & forfatter på<br/>
              Forlaget Kluddermor & SkoleBole
            </p>
            <br/>
            <p><span className="italic">Al kopiering, analogt og digitalt, af <span className="font-bold">SkoleBoles</span> materialer eller dele deraf er tilladt i henhold til undervisningsinstitutionens aftale med <span className="font-bold">Tekst & Node</span>.
            Kopiering, der går ud over begrænsningsreglerne i aftalen med <span className="font-bold">Tekst & Node</span>, kan alene finde sted efter forudgående aftale med <span className="font-bold">SkoleBole / Forlaget Kluddermor</span>.</span></p>
      </div>
    </main>
  )
}
