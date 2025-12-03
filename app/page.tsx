import HighlightMaterials from "@/lib/components/highlightMaterials"
import Link from 'next/link'

export default async function Home() {

  const linkClass = "bg-[url(/images/dansk_flag.jpg)] bg-cover overflow-hidden h-50 w-50 m-auto flex justify-center items-center border-2 border-red-500 rounded-full text-center font-bold hover:border-red-400 hover:bg-gray-100 transition duration-250 hover:scale-102"
  const pFlagClass = "backdrop-blur-xs transition duration-100 hover:backdrop-blur-none flex w-full h-full justify-center items-center text-3xl"

  return (
    <main className="h-full min-h-screen flex m-5">
      <div className="w-full">
        <h1 className="text-5xl font-bold text-center mb-5">Velkommen til <br/> SkoleBole</h1>
      
        <div className="lg:flex md:block">
          <div>
            <p className="lg:mr-5 mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor nibh ipsum, ac tempus risus pharetra in. Morbi venenatis tincidunt quam et viverra. Sed ut magna vel arcu interdum ultrices vel ac nunc. Donec id turpis metus. Praesent suscipit placerat mollis. Vivamus ut bibendum elit. Nunc ut commodo urna. Pellentesque nec sodales velit. Mauris ac ornare mi, non vestibulum arcu. Vestibulum accumsan, libero id pellentesque tincidunt, tellus eros pretium dui, convallis sagittis nisl urna quis nisl.
              Sed sagittis vitae velit pellentesque commodo. Cras lacus leo, commodo nec ex nec, auctor mattis enim. Donec at sem at ante finibus convallis quis a tellus. Phasellus commodo posuere magna, sit amet commodo ipsum sodales quis. Etiam et nisi neque. Pellentesque vitae nulla a odio congue egestas. Proin eu felis vitae sem pellentesque dignissim vitae vel lacus. Donec ut eros at metus hendrerit posuere. Etiam ut nisi id urna vestibulum fermentum. Aenean metus sem, aliquam eu turpis id, hendrerit aliquet ex. Vestibulum blandit erat justo, eget tristique libero condimentum et. Pellentesque viverra eros elit, nec tempor nisl euismod eget. Morbi odio felis, venenatis a quam in, dapibus imperdiet mi.
            </p>
            <div className="m-auto grid grid-cols-2 gap-6 lg:w-130 sm:w-100">
              <Link className={`bg-[url(/images/dansk_flag.jpg)] ${linkClass}`} href="materialer?kategori=dansk">
                <p className={pFlagClass}>Dansk</p>
              </Link>
              
              <Link className={`bg-[url(/images/matematik_flag.png)] ${linkClass}`} href="materialer?kategori=matematik">
                <p className={pFlagClass}>Matematik</p>
              </Link>

              <Link className={`bg-[url(/images/engelsk_flag.png)] ${linkClass}`} href="materialer?kategori=engelsk">
                <p className={pFlagClass}>Engelsk</p>
              </Link>

              <Link className={`bg-[url(/images/naturteknik_flag.png)] ${linkClass}`} href="materialer?kategori=naturteknik">
                <p className={pFlagClass}>Natur & Teknik</p>
              </Link>

              <Link className={`bg-[url(/images/historie_flag.png)] ${linkClass}`} href="materialer?kategori=historie">
                <p className={pFlagClass}>Historie</p>
              </Link>
            </div>
          </div>
          <HighlightMaterials title={"Tilføjet for nyligt"} vertical={true} amount={4}/>
        </div>
      </div>
    </main>
  )
}
