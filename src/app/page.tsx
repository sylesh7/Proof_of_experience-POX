import EventsPage from "./components/EventsPage"; // Update the path as needed

const Page = async () => {
  return (
    <div className="z-10 flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center justify-center gap-8 p-4">
      </div>

      {/* Events Section */}
      <div className="bg-white dark:bg-gray-900 px-4 py-8">
        <EventsPage />
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-slate-600 dark:text-slate-400 mt-auto py-4">
        <p>©2025 Civic Technologies, Inc. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Page;
