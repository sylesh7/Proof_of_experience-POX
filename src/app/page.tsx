import { AuthHeader } from "./components/AuthHeader";
import EventsPage from "./components/EventsPage"; // Update the path as needed
import Image from 'next/image'; // Import Image component

const Page = async () => {
  return (
    <div className="z-10 flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">

      {/* Events Section */}
      <div className="bg-white dark:bg-gray-900 px-2 py-2 mt-2">
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
