import { ImageResponse } from 'next/og'

export const runtime = 'edge'

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
          background: 'linear-gradient(to bottom right, #080D14, #05070A)',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#3B82F6',
            marginBottom: '20px',
            display: 'flex',
          }}
        >
          AI · 3D WEBSITES · DIGITAL MARKETING
        </div>
        <div
          style={{
            fontSize: '64px',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            background: 'linear-gradient(to right, #ffffff, #94a3b8)',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'flex',
          }}
        >
          Varunya Technologies
        </div>
        <div
          style={{
            fontSize: '24px',
            fontWeight: '500',
            color: '#64748B',
            marginBottom: '60px',
            display: 'flex',
          }}
        >
          Intelligent Digital Futures
        </div>
        <div
          style={{
            fontSize: '12px',
            fontFamily: 'monospace',
            color: '#475569',
            letterSpacing: '0.1em',
            display: 'flex',
          }}
        >
          varunya-tech-site.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
