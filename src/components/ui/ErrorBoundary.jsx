import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-brand-black flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-red-900/20 border border-red-500/30 rounded-2xl p-6">
            <h2 className="text-red-400 font-bold text-lg mb-2">Error de aplicación</h2>
            <pre className="text-red-300/70 text-xs overflow-auto whitespace-pre-wrap">
              {this.state.error.message}
              {'\n\n'}
              {this.state.error.stack?.slice(0, 600)}
            </pre>
            <button
              onClick={() => { this.setState({ error: null }); window.location.href = '/' }}
              className="mt-4 btn-gold text-sm">
              Volver al inicio
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
