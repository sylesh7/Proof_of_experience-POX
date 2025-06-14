'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserButton } from '@civic/auth-web3/react';
import StyledButton from './StyledButton';
import StyledEventCard from './StyledEventCard';
import { Web3Zone, TICKET_PRICE } from './web3Zone';

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
  const [imagesLoaded, setImagesLoaded] = useState(false);

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
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80",
      description: "Join us for an exciting co-working session with ETHGlobal and Oxford Blockchain Society. Network with blockchain enthusiasts, developers, and researchers while working on your projects in a collaborative environment. Perfect for those looking to connect with the Web3 community in Oxford."
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
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2070&q=80",
      description: "The premier conference exploring the intersection of AI and blockchain technology. Featuring keynote speakers, panel discussions, and workshops on the latest developments in decentralized AI, smart contracts, and Web3 infrastructure. Don't miss this opportunity to learn from industry leaders."
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
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2070&q=80",
      description: "A 48-hour hackathon focused on building sustainable technology solutions using blockchain. Teams will work on projects addressing climate change, renewable energy, and sustainable supply chains. Prizes include funding opportunities and mentorship from leading sustainability experts."
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
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2070&q=80",
      description: "A casual meetup for Web3 developers to share knowledge, discuss best practices, and network. Topics include smart contract development, dApp architecture, and the latest trends in decentralized technology. Perfect for both beginners and experienced developers."
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
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2070&q=80",
      description: "Showcase your Web3 startup to a panel of investors and industry experts. Pitch your innovative blockchain solution and compete for funding, mentorship, and networking opportunities. Open to early-stage startups in the blockchain and Web3 space."
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
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2070&q=80",
      description: "An intensive workshop covering advanced React concepts for Web3 development. Learn about state management, performance optimization, and building responsive dApp interfaces. Hands-on exercises and real-world examples included. Suitable for intermediate to advanced React developers."
    }
  ];

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = events.map((event) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = event.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

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
    const selectedEventData = events.find(event => event.title === selectedEvent);
    
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
            <h1 className="text-5xl font-bold mb-4 text-white">Register for Event</h1>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                {selectedEvent}
              </h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>{selectedEventData?.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p>Maximum Participants: 100</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Duration: 3 hours</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>Location: {selectedEventData?.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Ticket Price: {TICKET_PRICE} ETH</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p>NFT Benefits: Proof of Attendance, Access to Event Resources, Networking Opportunities</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
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