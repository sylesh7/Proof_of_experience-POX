# civic-auth web3 Wagmi example with NextJS frontend code
1. Set up your .env.local file:
    NEXT_PUBLIC_CLIENT_ID, 
    RESEND_API_KEY, 
    NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    GOOGLE_REDIRECT_URI="http://localhost:3000/api/auth/callback/google"
    
2. `yarn && yarn dev`
3. Log in with Civic, see your embedded wallet address and balance, and send ETH to another wallet