export default function DashboardLoadingPage() {
  return (
    <div role="status" className=" animate-pulse p-4 flex flex-col w-full">
      <div className="h-10 bg-gray-200 rounded-[4px] dark:bg-gray-500 mb-2.5"></div>
      <div className="h-10 bg-gray-200 rounded-[4px] dark:bg-gray-500 mb-2.5"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-48 bg-gray-200 rounded-[4px] dark:bg-gray-500 w-full mb-4"></div>
        <div className="h-48 bg-gray-200 rounded-[4px] dark:bg-gray-500 w-full mb-4"></div>
        <div className="h-48 bg-gray-200 rounded-[4px] dark:bg-gray-500 w-full mb-4"></div>
      </div>
      <div className="h-32 bg-gray-200 rounded-[4px] dark:bg-gray-500 mb-2.5"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
