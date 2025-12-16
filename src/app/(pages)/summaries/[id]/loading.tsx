export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen p-6 md:px-12 px-6 max-w-7xl mx-auto animate-pulse">
      <div className="w-full">
        {/* Back button skeleton */}
        <div className="h-6 w-16 bg-gray-800 rounded mb-6"></div>

        {/* Summary detail skeleton */}
        <div className="w-full space-y-6">
          {/* Summary section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="h-6 w-24 bg-gray-700 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-700 rounded"></div>
              <div className="h-4 w-full bg-gray-700 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-700 rounded"></div>
              <div className="h-4 w-full bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Action Items section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="h-6 w-32 bg-gray-700 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-700 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Risks section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="h-6 w-36 bg-gray-700 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-700 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Next Steps section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="h-6 w-28 bg-gray-700 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-700 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Date section */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="h-4 w-40 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
