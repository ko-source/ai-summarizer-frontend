export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen p-6 md:px-12 px-6 max-w-7xl mx-auto animate-pulse">
      <div className="w-full flex flex-col items-start justify-start space-y-6">
        {/* Textarea skeleton */}
        <div className="w-full">
          <div className="h-5 w-48 bg-gray-700 rounded mb-2"></div>
          <div className="w-full h-[40vh] bg-gray-800 rounded-md border-2 border-gray-700"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-10 w-[300px] bg-gray-800 rounded-md"></div>

        {/* Summary cards skeleton */}
        <div className="w-full mt-8 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-40 bg-gray-800 rounded"></div>
            <div className="h-4 w-20 bg-gray-800 rounded"></div>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <div className="h-5 w-32 bg-gray-700 rounded"></div>
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-gray-700 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
                <div className="h-4 w-4/6 bg-gray-700 rounded"></div>
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
