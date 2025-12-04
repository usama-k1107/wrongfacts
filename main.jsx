import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}

function initApp() {
  const rootElement = document.getElementById('root')

  if (!rootElement) {
    console.error('Root element not found!')
    document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found!</div>'
    return
  }

  try {
    const root = createRoot(rootElement)
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    )
    console.log('React app rendered successfully!')
  } catch (error) {
    console.error('Error rendering React app:', error)
    rootElement.innerHTML = `<div style="padding: 20px; color: red;">Error: ${error.message}</div>`
  }
}

