import type { ErrorInfo, ReactNode } from 'react'
import React, { Component } from 'react'

import constant from '@/config/constant'

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error)
    this.setState({ hasError: true, error })
  }

  render() {
    if (this.state.hasError) {
      console.log('error', this.state.error, this.state.error?.message)
      if (this.state.error?.message === 'Cannot read properties of undefined (reading \'value\')') {
        localStorage.removeItem(constant.RESUME_SETTING)
      }
      return <div>Oops! Something went wrong. Setting has been reset. Please refresh the page.</div>
    }

    return this.props.children
  }
}

export default ErrorBoundary
