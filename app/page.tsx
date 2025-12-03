import HighlightMaterials from "@/lib/components/highlightMaterials"
import Link from 'next/link'

export default async function Home() {

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
              <Link className="bg-gray-200 h-50 w-50 m-auto flex justify-center items-center border-2 border-red-500 rounded-full text-center text-red-700 font-bold hover:border-red-400 hover:text-red-500 hover:bg-gray-100 transition duration-250 hover:scale-102" href="materialer?kategori=dansk">Dansk</Link>
              <Link className="bg-gray-200 h-50 w-50 m-auto flex justify-center items-center border-2 border-red-500 rounded-full p-5 text-center text-red-700 font-bold hover:border-red-400 hover:text-red-500 hover:bg-gray-100 transition duration-250 hover:scale-102" href="materialer?kategori=matematik">Matematik</Link>
              <Link className="bg-gray-200 h-50 w-50 m-auto flex justify-center items-center border-2 border-red-500 rounded-full p-5 text-center text-red-700 font-bold hover:border-red-400 hover:text-red-500 hover:bg-gray-100 transition duration-250 hover:scale-102" href="materialer?kategori=engelsk">Engelsk</Link>
              <Link className="bg-gray-200 h-50 w-50 m-auto flex justify-center items-center border-2 border-red-500 rounded-full p-5 text-center text-red-700 font-bold hover:border-red-400 hover:text-red-500 hover:bg-gray-100 transition duration-250 hover:scale-102" href="materialer?kategori=naturteknik">Natur & Teknik</Link>
              <Link className="bg-gray-200 h-50 w-50 m-auto flex justify-center items-center border-2 border-red-500 rounded-full p-5 text-center text-red-700 font-bold hover:border-red-400 hover:text-red-500 hover:bg-gray-100 transition duration-250 hover:scale-102" href="materialer?kategori=historie">Historie</Link>
            </div>
          </div>
          <HighlightMaterials title={"Tilføjet for nyligt"} vertical={true} amount={4}/>
        </div>
      </div>
    </main>
  )
}
