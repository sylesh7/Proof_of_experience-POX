'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserButton } from '@civic/auth-web3/react';
import StyledButton from './StyledButton';
import StyledEventCard from './StyledEventCard';
import { Web3Zone, TICKET_PRICE } from './web3Zone';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';


const StyledLogoButton = styled.div`
  .brutalist-button {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 169px;
    height: 60px;
    background-color: #000;
    color: #fff;
    text-decoration: none;
    font-family: Arial, sans-serif;
    font-weight: bold;
    border: 3px solid #fff;
    outline: 3px solid #000;
    box-shadow: 6px 6px 0 #00a4ef;
    transition: all 0.1s ease-out;
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .brutalist-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.8),
      transparent
    );
    z-index: 1;
    transition: none;
    opacity: 0;
  }

  @keyframes slide {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  .brutalist-button:hover::before {
    opacity: 1;
    animation: slide 2s infinite;
  }

  .brutalist-button:hover {
    transform: translate(-4px, -4px);
    box-shadow: 10px 10px 0 #000;
    background-color: #000;
    color: #fff;
  }

  .brutalist-button:active {
    transform: translate(4px, 4px);
    box-shadow: 0px 0px 0 #00a4ef;
    background-color: #fff;
    color: #000;
    border-color: #000;
  }

  .logo-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .logo-image {
    width: 26px;
    height: 26px;
    border-radius: 4px;
    overflow: hidden;
    transition: transform 0.2s ease-out;
  }

  .brutalist-button:hover .logo-image {
    transform: rotate(-10deg) scale(1.1);
  }

  .brutalist-button:active .logo-image {
    transform: rotate(10deg) scale(0.9);
  }

  .button-text {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    transition: transform 0.2s ease-out;
  }

  .brutalist-button:hover .button-text {
    transform: skew(-5deg);
  }

  .brutalist-button:active .button-text {
    transform: skew(5deg);
  }

  .button-text span:first-child {
    font-size: 11px;
    text-transform: uppercase;
  }

  .button-text span:last-child {
    font-size: 16px;
    text-transform: uppercase;
  }
`;

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-2xl border-b border-gray-100">
      <div className="container mx-auto px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo with brutalist button style */}
          <StyledLogoButton>
            <button 
              className="brutalist-button"
              onClick={() => router.push('/')}
            >
              <div className="logo-container">
                <div className="logo-image">
                  <Image 
                    src="/Pox Logo.jpg" 
                    alt="PoxWallet Logo" 
                    width={26}
                    height={26}
                    className="object-cover"
                  />
                </div>
                <div className="button-text">
                  <span>Powered by</span>
                  <span>PoxWallet</span>
                </div>
              </div>
            </button>
          </StyledLogoButton>

          {/* User section with floating effect */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200 cursor-pointer border-2 border-black">
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

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
      title: "Cowork with ETHGlobal - Blockchain Society",
      location: "Oxford, United Kingdom",
      type: "Co-Working",
      temperature: "22°C",
      daysAhead: "Rating days ahead",
      image: "/Cover1.png",
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
      image: "/Cover2.png",
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
      image: "/Cover3.png",
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
      image: "/Cover1.png",
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
      image: "/Cover2.png",
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
      image: "/Cover3.png",
      description: "An intensive workshop covering advanced React concepts for Web3 development. Learn about state management, performance optimization, and building responsive dApp interfaces. Hands-on exercises and real-world examples included. Suitable for intermediate to advanced React developers."
    }
  ];

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

             
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Event Schedule</h3>
                <div className="space-y-3">
                  {selectedEventData?.title === "Cowork with ETHGlobal - Blockchain Society" && (
                    <>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">10:00 AM</div>
                        <div className="text-gray-300">Registration & Welcome - Check-in and networking with fellow participants</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">10:30 AM</div>
                        <div className="text-gray-300">Project Introductions - Share your blockchain project ideas</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">11:00 AM</div>
                        <div className="text-gray-300">Collaborative Work - Work on projects with other developers</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">12:30 PM</div>
                        <div className="text-gray-300">Lunch Break - Network over lunch</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">1:30 PM</div>
                        <div className="text-gray-300">Group Discussions - Share progress and challenges</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">3:00 PM</div>
                        <div className="text-gray-300">Closing Remarks - Wrap up and next steps</div>
                      </div>
                    </>
                  )}
                  {selectedEventData?.title === "AI & Blockchain Summit 2024" && (
                    <>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">9:00 AM</div>
                        <div className="text-gray-300">Registration - Check-in and welcome materials</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">10:00 AM</div>
                        <div className="text-gray-300">Keynote Speeches - Industry leaders share insights</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">11:30 AM</div>
                        <div className="text-gray-300">Panel Discussions - Expert panels on AI and blockchain integration</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">1:00 PM</div>
                        <div className="text-gray-300">Lunch Break - Networking lunch with speakers</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">2:30 PM</div>
                        <div className="text-gray-300">Workshops - Hands-on sessions with experts</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">4:00 PM</div>
                        <div className="text-gray-300">Networking Session - Connect with industry professionals</div>
                      </div>
                    </>
                  )}
                  {selectedEventData?.title === "Global Hackathon for Sustainable Tech" && (
                    <>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">9:00 AM</div>
                        <div className="text-gray-300">Registration - Team check-in and setup</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">10:00 AM</div>
                        <div className="text-gray-300">Opening Ceremony - Welcome and challenge introduction</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">11:00 AM</div>
                        <div className="text-gray-300">Team Formation - Find your perfect team members</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">12:00 PM</div>
                        <div className="text-gray-300">Hacking Begins - Start building your solution</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">6:00 PM</div>
                        <div className="text-gray-300">Dinner Break - Refuel and network</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">7:00 PM</div>
                        <div className="text-gray-300">Mentorship Sessions - Get guidance from experts</div>
                      </div>
                    </>
                  )}
                  {selectedEventData?.title === "Local Developers Meetup: Web3 Focus" && (
                    <>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">6:00 PM</div>
                        <div className="text-gray-300">Networking - Meet fellow developers</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">6:30 PM</div>
                        <div className="text-gray-300">Community Updates - Latest in Web3 development</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">7:00 PM</div>
                        <div className="text-gray-300">Lightning Talks - Quick presentations on hot topics</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">7:45 PM</div>
                        <div className="text-gray-300">Main Talks - In-depth technical discussions</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">8:30 PM</div>
                        <div className="text-gray-300">Q&A Session - Ask questions to speakers</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">9:00 PM</div>
                        <div className="text-gray-300">Networking - Continue discussions and connections</div>
                      </div>
                    </>
                  )}
                  {selectedEventData?.title === "Startup Pitch Competition: Fall 2024" && (
                    <>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">9:00 AM</div>
                        <div className="text-gray-300">Registration - Check-in and setup</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">10:00 AM</div>
                        <div className="text-gray-300">Opening Remarks - Welcome and competition overview</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">10:30 AM</div>
                        <div className="text-gray-300">Startup Pitches - Present your innovative solutions</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">12:30 PM</div>
                        <div className="text-gray-300">Lunch Break - Network with investors</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">2:00 PM</div>
                        <div className="text-gray-300">Investor Panel - Get feedback from industry experts</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">4:00 PM</div>
                        <div className="text-gray-300">Awards Ceremony - Winners announced</div>
                      </div>
                    </>
                  )}
                  {selectedEventData?.title === "Advanced React Workshop" && (
                    <>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">10:00 AM</div>
                        <div className="text-gray-300">Workshop Introduction - Overview and setup</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">10:30 AM</div>
                        <div className="text-gray-300">Advanced Topics - Deep dive into React concepts</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">12:00 PM</div>
                        <div className="text-gray-300">Lunch Break - Q&A with instructor</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">1:00 PM</div>
                        <div className="text-gray-300">Hands-on Projects - Build real-world applications</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">3:00 PM</div>
                        <div className="text-gray-300">Q&A Session - Get your questions answered</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">4:00 PM</div>
                        <div className="text-gray-300">Closing Remarks - Next steps and resources</div>
                      </div>
                    </>
                  )}
                  {!selectedEventData?.title && (
                    <>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">10:00 AM</div>
                        <div className="text-gray-300">Registration & Welcome</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">10:30 AM</div>
                        <div className="text-gray-300">Event Activities Begin</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">12:30 PM</div>
                        <div className="text-gray-300">Lunch Break</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">1:30 PM</div>
                        <div className="text-gray-300">Main Event Activities</div>
                      </div>
                      <div className="flex items-start gap-4 bg-gray-700/50 p-3 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-blue-400 font-medium">3:00 PM</div>
                        <div className="text-gray-300">Closing Remarks</div>
                      </div>
                    </>
                  )}
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