'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md py-4 flex justify-center">
      <div className="flex items-center px-6 py-2 rounded-2xl shadow-lg">
        <Image src="/ethglobal-logo.svg" alt="Civic-hack Logo" width={50} height={50} />
        <span className="ml-4 text-2xl font-bold text-gray-800">PoxWallet</span>
      </div>
    </nav>
  );
};

// Import the Web3Zone component
import { Web3Zone } from './web3Zone'; // Corrected import path

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

  // If user clicked register, show the NFT minter
  if (showMinter) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-8">
          {/* Back button */}
          <button 
            onClick={handleBackToEvents}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Events
          </button>
          
          {/* Event registration header */}
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

          {/* Web3Zone component with NFT Minter */}
          <Web3Zone prefilledEventTitle={selectedEvent} />
        </div>
      </>
    );
  }

  // Default events listing view
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold mb-8">Events</h1>
        <div className="flex space-x-6 mb-8 text-xl">
          <span className="font-bold border-b-2 border-blue-600 pb-1">Meetup</span>
        </div>
        <h2 className="text-3xl font-bold mb-6">
          Upcoming{" "}
          <span className="bg-gray-800 text-white rounded-full px-3 py-1 text-base">
            {events.length}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between">
              <div className="relative w-full h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-4">
                  <p className="text-sm">{event.month}</p>
                  <p className="text-4xl font-bold">{event.day}</p>
                  <p className="text-sm">{event.weekday}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl text-white font-bold mb-2">{event.title}</h3>
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <span className="mr-4">📍 {event.location}</span>
                  <span>&bull; {event.type}</span>
                </div>
                <div className="text-gray-400 text-sm mb-4">
                  <p>{event.daysAhead}</p>
                  <p>{event.temperature}</p>
                </div>
                <button 
                  onClick={() => handleRegister(event.title)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full transition-colors"
                >
                  Register 
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsPage;