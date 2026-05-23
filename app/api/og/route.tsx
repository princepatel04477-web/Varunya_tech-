import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0F172A',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {/* Varunya Technologies Title */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#FFFFFF',
              fontFamily: 'sans-serif',
              marginBottom: 16,
              letterSpacing: '-0.02em',
            }}
          >
            Varunya Technologies
          </div>

          {/* Electric Blue Tagline */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: '#3B82F6',
              fontFamily: 'sans-serif',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Intelligent Digital Futures
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
