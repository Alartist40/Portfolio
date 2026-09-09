import React, { Component, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Portfolio ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#F4F1EA',
          color: '#191919',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <h1 style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontSize: '36px', marginBottom: '16px' }}>
            Portfolio
          </h1>
          <p style={{ color: '#767676', marginBottom: '24px', textAlign: 'center' }}>
            An unexpected error occurred during rendering.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null })
              window.location.reload()
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#E06000',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

const rootEl = document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <ErrorBoundary>
        <HashRouter>
          <App />
        </HashRouter>
      </ErrorBoundary>
    </React.StrictMode>
  )
}
