import RollingMaterials from "@/lib/components/rollingMaterials"
export default async function Home() {

  return (
    <main className="h-screen flex overflow-hidden">
      <div className="w-full">
        <h1 className="text-5xl font-bold text-center">Velkommen til SkoleBole</h1>
          <RollingMaterials title={"Tilføjet for nyligt"} vertical={true} />
      </div>
    </main>
  )
}
