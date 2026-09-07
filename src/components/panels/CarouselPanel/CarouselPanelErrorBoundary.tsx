import { Component, type ReactNode } from 'react'

interface CarouselPanelErrorBoundaryProps {
  children: ReactNode
}

interface CarouselPanelErrorBoundaryState {
  hasError: boolean
}

class CarouselPanelErrorBoundary extends Component<
  CarouselPanelErrorBoundaryProps,
  CarouselPanelErrorBoundaryState
> {
  state: CarouselPanelErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <p>Could not fetch the data, try again or contact someone</p>
    }

    return this.props.children
  }
}

export { CarouselPanelErrorBoundary }
