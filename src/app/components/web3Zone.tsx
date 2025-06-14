"use client";
import { useUser } from "@civic/auth-web3/react";
import { useAutoConnect } from "@civic/auth-web3/wagmi";
import { 
  useAccount, 
  useBalance, 
  useChainId,
  useWriteContract,
  useWaitForTransactionReceipt 
} from "wagmi";
import { formatEther, parseEther } from "viem";
import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import StyledButton from './StyledButton';

// Add type declaration for Google OAuth
declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token: string }) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}

// ==================== CONTRACT CONFIGURATION ====================
const EVENT_TICKET_CONTRACT = "0xd9145CCE52D386f254917e481eB44e9943F39138";
export const TICKET_PRICE = "0.00001"; // Fixed price in ETH

// Contract ABI for NFT minting
const EVENT_TICKET_ABI = [
  {
    name: "safeMint",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "to", type: "address" },
      { name: "uri", type: "string" }
    ],
    outputs: []
  },
  {
    name: "claim",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "receiver", type: "address" },
      { name: "quantity", type: "uint256" }
    ],
    outputs: []
  }
] as const;

const SEPOLIA_CONFIG = {
  chainId: 11155111,
  name: "Ethereum Sepolia",
  rpcUrl: "https://sepolia.infura.io/v3/",
  blockExplorer: "https://sepolia.etherscan.io/",
  faucet: "https://faucets.chain.link/ethereum-sepolia"
};

// ==================== UTILITY FUNCTIONS ====================
const generateTicketSVG = (eventTitle: string, userAddress: string): string => {
  const svg = `
    <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
        <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
          <circle cx="10" cy="10" r="1" fill="white" opacity="0.3"/>
        </pattern>
      </defs>
      
      <!-- Background -->
      <rect width="400" height="250" fill="url(#grad)" rx="15"/>
      <rect width="400" height="250" fill="url(#dots)" rx="15"/>
      
      <!-- Header -->
      <rect x="20" y="20" width="360" height="60" fill="white" opacity="0.2" rx="10"/>
      <text x="200" y="40" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" font-weight="bold">
        EVENT ATTENDANCE TICKET
      </text>
      <text x="200" y="60" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="bold">
        ${eventTitle.toUpperCase()}
      </text>
      
      <!-- Ticket Icon -->
      <rect x="30" y="30" width="16" height="12" fill="white" opacity="0.8" rx="2"/>
      <rect x="32" y="32" width="12" height="8" fill="none" stroke="#667eea" stroke-width="1"/>
      <circle cx="45" cy="36" r="1" fill="#667eea"/>
      
      <!-- Event Details -->
      <text x="40" y="110" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">
        ATTENDEE
      </text>
      <text x="40" y="130" fill="white" font-family="Monaco, monospace" font-size="10">
        ${userAddress.slice(0, 12)}...${userAddress.slice(-8)}
      </text>
      
      <text x="40" y="160" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">
        DATE ISSUED
      </text>
      <text x="40" y="180" fill="white" font-family="Arial, sans-serif" font-size="12">
        ${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </text>
      
      <!-- QR Code placeholder -->
      <rect x="280" y="100" width="80" height="80" fill="white" opacity="0.9" rx="5"/>
      <text x="320" y="125" text-anchor="middle" fill="#333" font-family="Arial, sans-serif" font-size="8">
        VERIFIED
      </text>
      <text x="320" y="140" text-anchor="middle" fill="#333" font-family="Arial, sans-serif" font-size="8">
        ON CHAIN
      </text>
      <text x="320" y="155" text-anchor="middle" fill="#333" font-family="Arial, sans-serif" font-size="7">
        Sepolia
      </text>
      
      <!-- Chain link icon -->
      <circle cx="315" cy="165" r="3" fill="none" stroke="#333" stroke-width="1"/>
      <circle cx="325" cy="165" r="3" fill="none" stroke="#333" stroke-width="1"/>
      <line x1="318" y1="165" x2="322" y2="165" stroke="#333" stroke-width="1"/>
      
      <!-- Footer -->
      <text x="200" y="220" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" opacity="0.8">
        Powered by Civic Auth • Secured on Ethereum
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const generateNFTMetadata = (eventTitle: string, userAddress: string): string => {
  const metadata = {
    name: `${eventTitle} - Attendance Ticket`,
    description: `Proof of attendance for "${eventTitle}" event. Verified on ${new Date().toLocaleDateString()}`,
    image: generateTicketSVG(eventTitle, userAddress),
    attributes: [
      { trait_type: "Event", value: eventTitle },
      { trait_type: "Attendee", value: userAddress },
      { trait_type: "Date", value: new Date().toISOString().split('T')[0] },
      { trait_type: "Type", value: "Attendance Proof" },
      { trait_type: "Chain", value: "Ethereum Sepolia" },
      { trait_type: "Price", value: `${TICKET_PRICE} ETH` }
    ],
    external_url: `https://sepolia.etherscan.io/address/${userAddress}`,
  };
  
  return `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;
};

// ==================== NFT DISPLAY COMPONENT ====================
function NFTDisplay({ eventTitle, userAddress, txHash }: { eventTitle: string; userAddress: string; txHash: string }) {
  const { user } = useUser();
  const [isCreatingCalendarEvent, setIsCreatingCalendarEvent] = useState(false);
  const [isCalendarEventCreated, setIsCalendarEventCreated] = useState(false);
  const [calendarEventLink, setCalendarEventLink] = useState<string | null>(null);
  const ticketSVG = generateTicketSVG(eventTitle, userAddress);

  // Function to handle Google OAuth
  const handleGoogleAuth = async () => {
    try {
      console.log('Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
      if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        console.error('Google Client ID is not configured');
        return;
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/calendar.events',
        callback: (response) => {
          if (response.access_token) {
            addToCalendar(response.access_token);
          }
        },
      });

      client.requestAccessToken();
    } catch (error) {
      console.error('Google OAuth failed:', error);
    }
  };

  // Function to create calendar event
  const addToCalendar = async (token: string) => {
    if (!user?.email) {
      console.error('No user email available');
      return;
    }

    setIsCreatingCalendarEvent(true);
    try {
      const response = await fetch('/api/google-calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventTitle,
          eventDate: new Date().toISOString(),
          userEmail: user.email,
          txHash,
          contractAddress: EVENT_TICKET_CONTRACT,
          accessToken: token
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsCalendarEventCreated(true);
        setCalendarEventLink(data.eventLink);
        setTimeout(() => {
          setIsCalendarEventCreated(false);
        }, 5000);
      } else {
        console.error('Failed to create calendar event:', data.error);
      }
    } catch (error) {
      console.error('Error creating calendar event:', error);
    } finally {
      setIsCreatingCalendarEvent(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-700">
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-center">
        🎫 Your Minted NFT Ticket
      </h4>
      
      {/* NFT Image Display */}
      <div className="flex justify-center mb-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <Image 
            src={ticketSVG} 
            alt={`${eventTitle} Attendance Ticket`}
            width={400}
            height={250}
            className="w-full max-w-md h-auto rounded-lg"
          />
        </div>
      </div>
      
      {/* NFT Details */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">Event:</span>
            <p className="text-gray-900 dark:text-white font-semibold">{eventTitle}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">Price Paid:</span>
            <p className="text-gray-900 dark:text-white font-mono">{TICKET_PRICE} ETH</p>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">Attendee:</span>
            <p className="text-gray-900 dark:text-white font-mono text-xs break-all">{userAddress}</p>
          </div>
          <div>
            <span className="font-medium text-gray-600 dark:text-gray-400">Date:</span>
            <p className="text-gray-900 dark:text-white">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Add to Calendar Button */}
        <StyledButton
          onClick={handleGoogleAuth}
          disabled={isCreatingCalendarEvent}
        >
          {isCreatingCalendarEvent ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Adding to Calendar...
            </div>
          ) : (
            '📅 Add to Calendar'
          )}
        </StyledButton>

        {/* Calendar Event Success Message */}
        {isCalendarEventCreated && (
          <div className="mt-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-blue-500 mr-2">✅</span>
              <div>
                <p className="text-blue-800 dark:text-blue-200">
                  Event added to your calendar!
                </p>
                {calendarEventLink && (
                  <a 
                    href={calendarEventLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1 block"
                  >
                    View in Google Calendar →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <StyledButton
          onClick={() => window.open(`${SEPOLIA_CONFIG.blockExplorer}/tx/${txHash}`, '_blank')}
        >
          🔍 View Transaction
        </StyledButton>
        <StyledButton
          onClick={() => window.open(`https://testnets.opensea.io/${userAddress}`, '_blank')}
        >
          🎫 View My NFTs
        </StyledButton>
        <StyledButton
          onClick={() => window.open(`https://testnets.opensea.io/assets/sepolia/${EVENT_TICKET_CONTRACT}`, '_blank')}
        >
          🌊 View on OpenSea
        </StyledButton>
      </div>
    </div>
  );
}

// ==================== NFT MINTING COMPONENT ====================
function NFTMinter({ prefilledEventTitle }: { prefilledEventTitle?: string }) {
  const { isConnected, address, chain } = useAccount();
  const { user } = useUser();
  const [isMinting, setIsMinting] = useState(false);
  const [mintTxHash, setMintTxHash] = useState<string | null>(null);
  const [eventTitle, setEventTitle] = useState(prefilledEventTitle || "");
  const [mintingMethod, setMintingMethod] = useState<"safeMint" | "claim">("safeMint");
  const [mintedNFTs, setMintedNFTs] = useState<Array<{eventTitle: string; txHash: string; userAddress: string}>>([]);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  
  const { writeContract, error: mintError, data: hash } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash });

  const balance = useBalance({ address });

  // Update mint hash when transaction is submitted
  useEffect(() => {
    if (hash) {
      setMintTxHash(hash);
    }
  }, [hash]);

  // Handle successful minting
  useEffect(() => {
    if (isConfirmed && mintTxHash && eventTitle && address && user?.email) {
      setIsMinting(false);
      
      // Add to minted NFTs list
      setMintedNFTs(prev => [...prev, {
        eventTitle,
        txHash: mintTxHash,
        userAddress: address
      }]);
      
      // Send email with transaction details
      const sendEmail = async () => {
        try {
          const response = await fetch('/api/civic-nft-fallback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: user.email,
              eventTitle,
              txHash: mintTxHash,
              contractAddress: EVENT_TICKET_CONTRACT,
              userAddress: address,
              openseaLink: `https://testnets.opensea.io/assets/sepolia/${EVENT_TICKET_CONTRACT}`,
              etherscanLink: `${SEPOLIA_CONFIG.blockExplorer}/tx/${mintTxHash}`
            }),
          });

          const data = await response.json();
          if (!data.success) {
            console.error('Failed to send email:', data.error);
          }
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };

      sendEmail();
      
      // Reset form
      setEventTitle("");
      setMintTxHash(null);
    }
  }, [isConfirmed, mintTxHash, eventTitle, address, user?.email]);

  // Modify the test function to be the get tickets function
  const getTickets = async () => {
    if (!user?.email || !mintTxHash) {
      console.error('No user email or transaction hash available');
      return;
    }

    setIsSendingEmail(true);
    try {
      const response = await fetch('/api/civic-nft-fallback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: user.email,
          eventTitle,
          txHash: mintTxHash,
          contractAddress: EVENT_TICKET_CONTRACT,
          userAddress: address,
          openseaLink: `https://testnets.opensea.io/assets/sepolia/${EVENT_TICKET_CONTRACT}`,
          etherscanLink: `${SEPOLIA_CONFIG.blockExplorer}/tx/${mintTxHash}`
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsEmailSent(true);
        setTimeout(() => {
          setIsEmailSent(false);
        }, 5000);
      } else {
        console.error('Failed to send email:', data.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const renderGetTicketsButton = () => {
    if (isConfirmed && mintTxHash) {
      return (
        <StyledButton
          onClick={getTickets}
          disabled={isSendingEmail}
        >
          {isSendingEmail ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sending Ticket...
            </div>
          ) : (
            '🎫 Get My Tickets'
          )}
        </StyledButton>
      );
    }
    return null;
  };

  // Main minting function
  const mintEventTicket = useCallback(async () => {
    if (!address || !eventTitle.trim()) return;
    
    setIsMinting(true);
    
    try {
      const tokenURI = generateNFTMetadata(eventTitle.trim(), address);
      const priceInWei = parseEther(TICKET_PRICE);
      
      if (mintingMethod === "safeMint") {
        writeContract({
          address: EVENT_TICKET_CONTRACT as `0x${string}`,
          abi: EVENT_TICKET_ABI,
          functionName: "safeMint",
          args: [address, tokenURI],
          value: priceInWei,
        });
      } else {
        writeContract({
          address: EVENT_TICKET_CONTRACT as `0x${string}`,
          abi: EVENT_TICKET_ABI,
          functionName: "claim",
          args: [address, BigInt(1)],
          value: priceInWei,
        });
      }
    } catch (error) {
      console.error("Minting failed:", error);
      setIsMinting(false);
    }
  }, [address, eventTitle, mintingMethod, writeContract]);

  if (!isConnected || !user) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="text-center text-gray-900 dark:text-white">
          <h3 className="text-lg font-semibold mb-2">🎫 Event Ticket Minting</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Please sign in using the button above to access your embedded wallet and mint event attendance NFTs.
          </p>
        </div>
      </div>
    );
  }

  const isOnSepolia = chain?.id === SEPOLIA_CONFIG.chainId;
  const isValidContract = EVENT_TICKET_CONTRACT.startsWith("0x") && EVENT_TICKET_CONTRACT.length === 42;
  const hasInsufficientBalance = balance.data && parseEther(TICKET_PRICE) > balance.data.value;

  return (
    <div className="space-y-6">
      {/* Minting Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-blue-100 dark:border-blue-800">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
          🎫 Mint Event Attendance NFT
          <span className="ml-auto text-sm font-normal bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
            {TICKET_PRICE} ETH
          </span>
        </h3>
        
        {/* Network Warning */}
        {!isOnSepolia && (
          <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <span className="text-yellow-600 dark:text-yellow-400 mr-2">⚠️</span>
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-200">Wrong Network</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Please switch to Ethereum Sepolia testnet to mint NFTs
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Balance Warning */}
        {hasInsufficientBalance && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <span className="text-red-600 dark:text-red-400 mr-2">💰</span>
              <div>
                <p className="font-medium text-red-800 dark:text-red-200">Insufficient Balance</p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  You need at least {TICKET_PRICE} ETH to mint. Current balance: {balance.data ? formatEther(balance.data.value) : '0'} ETH
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          {/* Event Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter event name (e.g., DevCon 2024, Web3 Summit)"
              maxLength={50}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              This will appear on your NFT ticket
            </p>
          </div>

          {/* Minting Method Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contract Function
            </label>
            <select
              value={mintingMethod}
              onChange={(e) => setMintingMethod(e.target.value as "safeMint" | "claim")}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="safeMint">safeMint (Custom Contract)</option>
              <option value="claim">claim (ThirdWeb Contract)</option>
            </select>
          </div>

          {/* Contract Address Display */}
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Contract Address:</p>
            <div className="flex items-center justify-between">
              <p className="font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
                {EVENT_TICKET_CONTRACT}
              </p>
              {isValidContract && (
                <span className="text-green-500 text-xs ml-2">✅ Ready</span>
              )}
            </div>
            {isValidContract && (
              <a
                href={`${SEPOLIA_CONFIG.blockExplorer}/address/${EVENT_TICKET_CONTRACT}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                View on Etherscan →
              </a>
            )}
          </div>
          
          {/* Mint Button */}
          <StyledButton
            onClick={mintEventTicket}
            disabled={
              !eventTitle.trim() || 
              isMinting || 
              isConfirming || 
              !isOnSepolia ||
              !isValidContract ||
              hasInsufficientBalance
            }
          >
            {isMinting || isConfirming ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isMinting ? 'Submitting Transaction...' : 'Confirming on Blockchain...'}
              </div>
            ) : (
              `🎫 Mint Attendance Ticket (${TICKET_PRICE} ETH)`
            )}
          </StyledButton>

          {/* Error Display */}
          {mintError && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <div className="flex items-start">
                <span className="text-red-500 mr-2">❌</span>
                <div>
                  <p className="font-medium text-red-800 dark:text-red-200">Minting Failed</p>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    {mintError.message.includes('User rejected') 
                      ? 'Transaction was cancelled by user'
                      : 'Contract call failed. Check contract address and network.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Success Display */}
          {mintTxHash && (
            <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <div className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <div className="flex-1">
                  <p className="font-medium text-green-800 dark:text-green-200">
                    {isConfirmed ? 'NFT Minted Successfully!' : 'Transaction Submitted'}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Transaction Hash:
                  </p>
                  <a
                    href={`${SEPOLIA_CONFIG.blockExplorer}/tx/${mintTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-green-600 dark:text-green-400 hover:underline break-all"
                  >
                    {mintTxHash}
                  </a>
                  
                  {isConfirmed && (
                    <div className="mt-2 pt-2 border-t border-green-200 dark:border-green-700">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        🎉 Your attendance NFT is now in your wallet! Check below to see it.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Replace the test button with the get tickets button */}
      {renderGetTicketsButton()}
      
      {/* Success messages */}
      {isEmailSent && (
        <div className="mt-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✅</span>
            <p className="text-green-800 dark:text-green-200">
              Ticket sent to your email successfully!
            </p>
          </div>
        </div>
      )}
      
      {/* Minted NFTs Display */}
      {mintedNFTs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            🎨 Your Minted NFTs ({mintedNFTs.length})
          </h3>
          {mintedNFTs.map((nft, index) => (
            <NFTDisplay 
              key={index}
              eventTitle={nft.eventTitle}
              userAddress={nft.userAddress}
              txHash={nft.txHash}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ==================== WALLET INFO COMPONENT ====================
function WalletInfo() {
  const { isConnected, address, chain } = useAccount();
  const balance = useBalance({ address });

  const formatBalanceEth = (balance: bigint | undefined) => {
    if (!balance) return "0.00000";
    return Number.parseFloat(formatEther(balance)).toFixed(5);
  };

  if (!isConnected) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        💰 Wallet Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Network:</span>
            <span className="ml-2 text-gray-900 dark:text-white">
              {chain?.name || "Unknown"}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Address:</span>
            <span className="ml-2 font-mono text-sm text-gray-900 dark:text-white break-all">
              {address}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Balance:</span>
            <span className="ml-2 text-gray-900 dark:text-white font-mono">
              {formatBalanceEth(balance?.data?.value)} ETH
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Ticket Price:</span>
            <span className="ml-2 text-gray-900 dark:text-white font-mono">
              {TICKET_PRICE} ETH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN WEB3 COMPONENT ====================
function Web3Dashboard({ walletCreationInProgress, prefilledEventTitle }: { walletCreationInProgress?: boolean; prefilledEventTitle?: string; }) {
  const { isConnected, chain } = useAccount();
  const chainId = useChainId();
  const user = useUser();
  const isLoading = user.isLoading || walletCreationInProgress;

  const effectiveChain = chain;
  const effectiveChainId = chain?.id || chainId;

  if (!isConnected || isLoading) {
    return (
      <div className="text-gray-900 dark:text-white">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span>Connecting wallet. Please wait...</span>
        </div>
        {isLoading && <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">Loading user data...</div>}
        {walletCreationInProgress && <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">Creating wallet...</div>}
      </div>
    );
  }

  if (!effectiveChain && !effectiveChainId && isConnected) {
    return (
      <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 text-yellow-700 dark:text-yellow-300 px-4 py-3 rounded mb-4">
        <strong>Warning:</strong> Wallet connected but chain is undefined. Please check your network configuration.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <WalletInfo />
      <NFTMinter prefilledEventTitle={prefilledEventTitle} />
    </div>
  );
}

// ==================== MAIN EXPORT COMPONENT ====================
function Web3Zone({ prefilledEventTitle }: { prefilledEventTitle?: string }) {
  const { user, isLoading, walletCreationInProgress } = useUser();
  useAutoConnect();

  if (!isLoading && !user) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4 text-gray-900 dark:text-white text-center">
          <h3 className="text-xl font-semibold mb-2"> Web3 Event Platform</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Please sign in using the button above to access your embedded wallet and mint event attendance NFTs.
          </p>
        </div>
      </div>
    );
  }

  // Render EventsPage when user is signed in
  return <Web3Dashboard prefilledEventTitle={prefilledEventTitle} walletCreationInProgress={walletCreationInProgress} />;
}

export { Web3Zone };