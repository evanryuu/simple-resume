import type { ErrorInfo, ReactNode } from 'react'
import React, { Component } from 'react'

import TemplateData from '@/config/template.json'
import i18nInstance from '@/i18n'
import { useResumeStore } from '@/store'

import type { IResumeBlock } from '@/store'

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

  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error)
    this.setState({ hasError: true, error })
  }

  render() {
    if (this.state.hasError) {
      console.log('error', this.state.error, this.state.error?.message)
      if (this.state.error?.message === 'Cannot read properties of undefined (reading \'value\')') {
        const { setResumeData } = useResumeStore.getState()
        setResumeData(TemplateData.state.resumeData as IResumeBlock[])
      } else if (this.state.error?.message === 'Wrong template type') {
        const { setResumeData } = useResumeStore.getState()
        setResumeData(TemplateData.state.resumeData as IResumeBlock[])
      }
      return <div>{i18nInstance.t('dataInvalidTip')}</div>
    }

    return this.props.children
  }
}

export default ErrorBoundary
