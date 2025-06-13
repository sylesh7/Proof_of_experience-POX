import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { 
      to, 
      eventTitle, 
      txHash, 
      contractAddress, 
      userAddress, 
      openseaLink, 
      etherscanLink 
    } = await request.json();

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your NFT Attendance Ticket - Civic Auth</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
        
        <!-- Main Container -->
        <div style="max-width: 600px; margin: 0 auto; background: white;">
          
          <!-- Civic Auth Header -->
          <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 40px 30px; text-align: center;">
            <div style="background: rgba(255,255,255,0.1); display: inline-block; padding: 12px; border-radius: 12px; margin-bottom: 20px;">
              <span style="font-size: 32px; display: block;">🎫</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
              Event Attendance NFT
            </h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">
              Authenticated via Civic Auth
            </p>
          </div>

          <!-- Event Title Banner -->
          <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 30px; text-align: center; border-bottom: 3px solid #4f46e5;">
            <h2 style="color: #1e293b; margin: 0; font-size: 24px; font-weight: 700;">
              ${eventTitle}
            </h2>
            <p style="color: #64748b; margin: 8px 0 0 0; font-size: 14px;">
              Your attendance is now verified on blockchain
            </p>
          </div>

          <!-- Success Message -->
          <div style="padding: 30px;">
            <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 1px solid #a7f3d0; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
              <div style="display: flex; align-items: center;">
                <span style="font-size: 24px; margin-right: 12px;">🎉</span>
                <div>
                  <h3 style="color: #065f46; margin: 0; font-size: 18px; font-weight: 600;">
                    NFT Minted Successfully!
                  </h3>
                  <p style="color: #059669; margin: 4px 0 0 0; font-size: 14px;">
                    Your proof of attendance is now permanently on the blockchain
                  </p>
                </div>
              </div>
            </div>

            <!-- NFT Details Card -->
            <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
              <div style="background: #f8fafc; padding: 16px; border-bottom: 1px solid #e2e8f0;">
                <h4 style="color: #1e293b; margin: 0; font-size: 16px; font-weight: 600;">
                  📋 NFT Details
                </h4>
              </div>
              <div style="padding: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 500; width: 120px;">
                      Event:
                    </td>
                    <td style="padding: 10px 0; color: #1e293b; font-size: 14px; font-weight: 600;">
                      ${eventTitle}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 500;">
                      Date:
                    </td>
                    <td style="padding: 10px 0; color: #1e293b; font-size: 14px;">
                      ${new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 500;">
                      Wallet:
                    </td>
                    <td style="padding: 10px 0; color: #1e293b; font-size: 12px; font-family: 'SF Mono', Monaco, monospace; background: #f1f5f9; padding: 6px 8px; border-radius: 4px;">
                      ${userAddress}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #64748b; font-size: 14px; font-weight: 500;">
                      Network:
                    </td>
                    <td style="padding: 10px 0; color: #1e293b; font-size: 14px;">
                      Ethereum Sepolia Testnet
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="${etherscanLink}" 
                 style="display: inline-block; background: #4f46e5; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; margin: 8px; font-weight: 600; font-size: 14px; transition: background 0.2s;">
                 🔍 View Transaction
              </a>
              <a href="${openseaLink}" 
                 style="display: inline-block; background: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; margin: 8px; font-weight: 600; font-size: 14px; transition: background 0.2s;">
                 🌊 View on OpenSea
              </a>
            </div>

            <!-- Info Box -->
            <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 1px solid #93c5fd; border-radius: 12px; padding: 20px;">
              <div style="display: flex; align-items: flex-start;">
                <span style="font-size: 20px; margin-right: 12px; margin-top: 2px;">💡</span>
                <div>
                  <h4 style="color: #1e40af; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">
                    What happens next?
                  </h4>
                  <ul style="color: #1e40af; margin: 0; padding-left: 16px; font-size: 14px; line-height: 1.6;">
                    <li>Your NFT is securely stored in your Civic Auth wallet</li>
                    <li>It may take 2-5 minutes to appear on OpenSea</li>
                    <li>This serves as permanent proof of your event attendance</li>
                    <li>You can view it anytime using the links above</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Transaction Hash -->
            <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px;">
              <p style="color: #64748b; margin: 0 0 4px 0; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">
                Transaction Hash
              </p>
              <p style="color: #1e293b; margin: 0; font-size: 11px; font-family: 'SF Mono', Monaco, monospace; word-break: break-all; line-height: 1.4;">
                ${txHash}
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <div style="margin-bottom: 16px;">
              <img style="width: 24px; height: 24px; display: inline-block; vertical-align: middle; margin-right: 8px;" 
                   src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234f46e5'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E" 
                   alt="Civic">
              <span style="color: #4f46e5; font-weight: 600; font-size: 16px; vertical-align: middle;">
                Civic Auth
              </span>
            </div>
            <p style="color: #64748b; margin: 0; font-size: 12px; line-height: 1.5;">
              This NFT was minted securely using Civic's identity verification.<br>
              Your attendance is now permanently recorded on the Ethereum blockchain.
            </p>
            <p style="color: #94a3b8; margin: 12px 0 0 0; font-size: 11px;">
              © ${new Date().getFullYear()} Civic Technologies, Inc. • Powered by Ethereum
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // In a real implementation, you would use a proper email service here
    // For now, we'll use a simple service or log the email
    console.log(`📧 Fallback: Sending NFT email to ${to}`);
    console.log(`📝 Subject: Your "${eventTitle}" Attendance NFT is Ready! 🎫`);
    
    // You can integrate with any email service here:
    // - Resend, SendGrid, Nodemailer, etc.
    
    return NextResponse.json({ 
      success: true, 
      message: 'NFT email prepared (fallback mode)',
      recipient: to,
      subject: `Your "${eventTitle}" Attendance NFT is Ready! 🎫`
    });

  } catch (error) {
    console.error('Fallback email failed:', error);
    return NextResponse.json(
      { success: false, error: 'Fallback email system failed' },
      { status: 500 }
    );
  }
}