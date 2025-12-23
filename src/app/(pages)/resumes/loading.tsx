export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen p-6 md:px-12 px-6 max-w-7xl mx-auto animate-pulse">
      <div className="w-full">
        <div className="h-9 w-48 bg-gray-800 rounded mb-6"></div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="h-5 w-32 bg-gray-700 rounded"></div>
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
              </div>
              <div className="flex gap-4">
                <div className="h-3 w-20 bg-gray-700 rounded"></div>
                <div className="h-3 w-16 bg-gray-700 rounded"></div>
                <div className="h-3 w-20 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
