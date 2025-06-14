import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export async function POST(request: NextRequest) {
  try {
    const { 
      eventTitle,
      eventDate,
      userEmail,
      txHash,
      contractAddress,
      accessToken
    } = await request.json();

    if (!accessToken || !userEmail) {
      return NextResponse.json({ success: false, error: 'Missing accessToken or userEmail' }, { status: 400 });
    }

   
    const oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    oauth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    
    const event = {
      summary: `${eventTitle} - NFT Attendance`,
      description: `Your proof of attendance NFT was minted.\n\nTxHash: ${txHash}\nContract: ${contractAddress}`,
      start: {
        dateTime: eventDate,
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(new Date(eventDate).getTime() + 2 * 60 * 60 * 1000).toISOString(), // +2 hours
        timeZone: 'UTC',
      },
      attendees: [{ email: userEmail }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },   
          { method: 'popup', minutes: 30 }         
        ],
      },
    };

    
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return NextResponse.json({
      success: true,
      message: 'Google Calendar event created',
      eventLink: response.data.htmlLink
    });

  } catch (error) {
    console.error('Calendar event creation failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create calendar event' },
      { status: 500 }
    );
  }
}
