import { basehub } from "basehub"

export default async function DebugPage() {
  let data
  let error = null

  try {
    // Pehle simple query try karte hain
    data = await basehub().query({
      site: {
        pages: {
          items: {
            _id: true,
            pathname: true,
            sections: {
              __typename: true,
              on_BlockDocument: { _id: true },
              // Pehle existing components check karte hain
              on_HeroComponent: {
                _id: true,
                title: true,
              },
              on_FeaturesCardsComponent: {
                _id: true,
                heading: {
                  title: true,
                },
              },
              // Ab custom components try karte hain
              on_CustomHeroComponent: {
                _id: true,
                title: true,
                subtitle: true,
              },
            },
          },
        },
      },
    })
  } catch (err) {
    error = err
    console.error("Debug query error:", err)

    // Fallback query without custom components
    try {
      data = await basehub().query({
        site: {
          pages: {
            items: {
              _id: true,
              pathname: true,
              sections: {
                __typename: true,
                on_BlockDocument: { _id: true },
              },
            },
          },
        },
      })
    } catch (fallbackErr) {
      console.error("Fallback query also failed:", fallbackErr)
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Debug Page - Custom Sections</h1>

      {/* {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <h2 className="font-bold">Error occurred:</h2>
          <pre className="text-sm mt-2 overflow-auto">{error.toString()}</pre>
        </div>
      )} */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Raw Data */}
        <div>
          <h2 className="text-xl font-bold mb-4">Raw Data:</h2>
          <div className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>

        {/* Processed Data */}
        <div>
          <h2 className="text-xl font-bold mb-4">Pages Analysis:</h2>
          <div className="space-y-4">
            {data?.site?.pages?.items?.map((page) => (
              <div key={page._id} className="bg-white p-4 border rounded shadow">
                <h3 className="font-bold text-lg">Page: {page.pathname}</h3>
                <p className="text-gray-600">Sections: {page.sections?.length || 0}</p>

                <div className="mt-3 space-y-2">
                  {page.sections?.map((section, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          section.__typename?.includes("Custom")
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {section.__typename}
                      </span>
                      {section.__typename?.includes("Custom") && (
                        <span className="text-green-600 text-sm">✓ Custom Component</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Setup Instructions:</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>BaseHub Dashboard mein Components section mein jaakar CustomHeroComponent banayein</li>
          <li>Component API name exactly "CustomHeroComponent" hona chahiye</li>
          <li>Required fields add karein: title, subtitle, description, etc.</li>
          <li>
            Terminal mein <code className="bg-gray-200 px-1 rounded">npm run basehub</code> run karein
          </li>
          <li>Page sections mein custom component add karein</li>
          <li>Page refresh karein</li>
        </ol>
      </div>
    </div>
  )
}
