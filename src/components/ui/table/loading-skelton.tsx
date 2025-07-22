export const LoadingSkelton = () => {
  const skeletonRows = Array(4).fill(0);

  return (
    <tbody>
      {skeletonRows.map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              <div className="h-6 bg-gray-300 rounded-full w-12"></div>
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="h-6 bg-gray-300 rounded w-8"></div>
            </div>
          </td>

          <td className="px-6 py-4">
            <div className="h-6 bg-gray-300 rounded w-16 mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-12"></div>
          </td>

          <td className="px-6 py-4">
            <div className="h-6 bg-gray-300 rounded-full w-16"></div>
          </td>

          <td className="px-6 py-4 text-center">
            <div className="h-9 bg-gray-300 rounded-lg w-20 mx-auto"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
