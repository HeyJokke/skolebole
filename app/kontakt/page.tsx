export default async function OmOs() {
  return (
    <main className="h-full min-h-screen flex m-5">
      <div className="w-full bg-white/90 rounded-lg shadow-xl mr-0 lg:mr-10 p-8">
        <h1 className="text-5xl font-bold text-center mb-5 text-slate-700">Kontakt Forlaget Kluddermor</h1>
      
        <div className="justify-center text-center text-slate-700">
            <p>
              Hannevej 16 <br/>
              3060 Espergærde <br/>
              forlagetkluddermor@gmail.com<br/>
              Tlf. 20 91 56 27<br/>
              CVR 42724505<br/>
            </p>
            <p className="flex flex-col mt-5 font-extrabold">
              Send gerne feedback, ønsker af nye materialer eller bare et spørgsmål!
              <a className="bg-blue-300 p-4 rounded-full w-fit m-auto text-sky-900 mt-5" href="mailto:forlagetkluddermor@gmail.com?subject=Ang. SkoleBole: Indsæt tekst">Send en mail</a>
            </p>
        </div>
      </div>
    </main>
  )
}