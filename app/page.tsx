import HighlightMaterials from "@/lib/components/highlightMaterials"

export default async function Home() {
  return (
    <main className="h-full min-h-screen flex m-5">
      <div className="w-full">
      
        <div className="lg:flex md:block">
          <div className="bg-white/90 rounded-lg shadow-xl mr-0 lg:mr-10 p-8">
            <h1 className="text-5xl font-bold text-center mb-5">Velkommen til <br/> SkoleBole</h1>
            <p className="lg:mr-5 mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor nibh ipsum, ac tempus risus pharetra in. Morbi venenatis tincidunt quam et viverra. Sed ut magna vel arcu interdum ultrices vel ac nunc. Donec id turpis metus. Praesent suscipit placerat mollis. Vivamus ut bibendum elit. Nunc ut commodo urna. Pellentesque nec sodales velit. Mauris ac ornare mi, non vestibulum arcu. Vestibulum accumsan, libero id pellentesque tincidunt, tellus eros pretium dui, convallis sagittis nisl urna quis nisl.
              Sed sagittis vitae velit pellentesque commodo. Cras lacus leo, commodo nec ex nec, auctor mattis enim. Donec at sem at ante finibus convallis quis a tellus. Phasellus commodo posuere magna, sit amet commodo ipsum sodales quis. Etiam et nisi neque. Pellentesque vitae nulla a odio congue egestas. Proin eu felis vitae sem pellentesque dignissim vitae vel lacus. Donec ut eros at metus hendrerit posuere. Etiam ut nisi id urna vestibulum fermentum. Aenean metus sem, aliquam eu turpis id, hendrerit aliquet ex. Vestibulum blandit erat justo, eget tristique libero condimentum et. Pellentesque viverra eros elit, nec tempor nisl euismod eget. Morbi odio felis, venenatis a quam in, dapibus imperdiet mi.
            </p>
          </div>
          <HighlightMaterials title={"Tilføjet for nyligt"} vertical={true} amount={4}/>
        </div>
      </div>
    </main>
  )
}
