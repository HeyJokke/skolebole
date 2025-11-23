
export default async function ProductPage({ params }:
    {params: Promise<{id: string}>}
) {
    console.log(await params)

    return (
        <h1>Dette er produktside</h1>
    )
}