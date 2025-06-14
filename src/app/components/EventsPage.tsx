'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { UserButton } from '@civic/auth-web3/react';
import StyledButton from './StyledButton';
import StyledEventCard from './StyledEventCard';
import { Web3Zone } from './web3Zone';

// ✅ Navbar Component
const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-950 border-b border-gray-800 py-4 px-6 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-3 px-4 py-2 rounded-md bg-gray-900 hover:bg-gray-800 transition-all duration-200">
        <Image src="/Pox Logo.jpg" alt="PoxWallet Logo" width={36} height={36} className="rounded-full" />
        <span className="text-xl md:text-2xl font-semibold text-white">
          PoxWallet
        </span>
      </div>

      <div className="px-3 py-1.5 rounded-full border border-gray-700 bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md transition-all duration-150">
        <UserButton />
      </div>
    </nav>
  );
};

// ✅ Events Page
const EventsPage = () => {
  const [showMinter, setShowMinter] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string>('');

  const events = [
    {
      id: 1,
      month: "JUN",
      day: "12",
      weekday: "Thu",
      title: "Cowork with ETHGlobal in Oxford with Oxford Blockchain Society",
      location: "Oxford, United Kingdom",
      type: "Co-Working",
      temperature: "22°C",
      daysAhead: "Rating days ahead",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      month: "JUL",
      day: "25",
      weekday: "Fri",
      title: "AI & Blockchain Summit 2024",
      location: "New York, USA",
      type: "Summit",
      temperature: "28°C",
      daysAhead: "43 days ahead",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      month: "AUG",
      day: "01",
      weekday: "Thu",
      title: "Global Hackathon for Sustainable Tech",
      location: "Berlin, Germany",
      type: "Hackathon",
      temperature: "24°C",
      daysAhead: "50 days ahead",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      month: "SEP",
      day: "15",
      weekday: "Sun",
      title: "Local Developers Meetup: Web3 Focus",
      location: "San Francisco, USA",
      type: "Meetup",
      temperature: "20°C",
      daysAhead: "95 days ahead",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 5,
      month: "OCT",
      day: "05",
      weekday: "Sat",
      title: "Startup Pitch Competition: Fall 2024",
      location: "Austin, USA",
      type: "Competition",
      temperature: "26°C",
      daysAhead: "115 days ahead",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 6,
      month: "NOV",
      day: "10",
      weekday: "Sun",
      title: "Advanced React Workshop",
      location: "Online",
      type: "Workshop",
      temperature: "-",
      daysAhead: "151 days ahead",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2070&q=80"
    }
  ];

  const handleRegister = (eventTitle: string) => {
    setSelectedEvent(eventTitle);
    setShowMinter(true);
  };

  const handleBackToEvents = () => {
    setShowMinter(false);
    setSelectedEvent('');
  };

  // ✅ NFT Minter View
  if (showMinter) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-8">
          <StyledButton
            onClick={handleBackToEvents}
            className="mb-6"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Events
            </div>
          </StyledButton>

          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4">Register for Event</h1>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                {selectedEvent}
              </h2>
              <p className="text-blue-600">
                Complete your registration by minting an NFT ticket below
              </p>
            </div>
          </div>

          <Web3Zone prefilledEventTitle={selectedEvent} />
        </div>
      </>
    );
  }

  // ✅ Events List View
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold mb-8 text-white">Explore the Events</h1>

        <h2 className="text-3xl font-bold mb-6 text-white">
          Upcoming{" "}
          <span className="bg-gray-800 text-white rounded-full px-4 py-2 text-base">
            {events.length}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <StyledEventCard
              key={event.id}
              event={event}
              onRegister={handleRegister}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsPage;
