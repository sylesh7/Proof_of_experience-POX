import { NextRequest, NextResponse } from 'next/server';
import { calendar_v3, google } from 'googleapis';
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

    // Initialize OAuth2 client with just the client ID
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID
    );

    // Set the access token
    oauth2Client.setCredentials({
      access_token: accessToken
    });

    // Initialize Google Calendar API with OAuth client
    const calendar = google.calendar({
      version: 'v3',
      auth: oauth2Client
    });

    // Create calendar event
    const event: calendar_v3.Schema$Event = {
      summary: `${eventTitle} - NFT Event`,
      description: `NFT Transaction Hash: ${txHash}\nContract Address: ${contractAddress}`,
      start: {
        dateTime: eventDate,
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(new Date(eventDate).getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours duration
        timeZone: 'UTC',
      },
      attendees: [
        { email: userEmail }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 30 }, // 30 minutes before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Calendar event created successfully',
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