import HighlightMaterials from "@/lib/components/highlightMaterials"
export default async function Home() {

  return (
    <main className="h-full min-h-screen flex">
      <div className="w-full">
        <h1 className="text-5xl font-bold text-center">Velkommen til SkoleBole</h1>
        <div>
          <HighlightMaterials title={"Tilføjet for nyligt"} vertical={false} amount={4}/>
        </div>
      </div>
    </main>
  )
}
