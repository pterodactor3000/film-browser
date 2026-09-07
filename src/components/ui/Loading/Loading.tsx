import './Loading.scss'

interface LoadingProps {
  label?: string
}

const Loading = ({ label = 'Loading...' }: LoadingProps) => {
  return (
    <div className="loader-wrapper" role="status" aria-live="polite">
      <div className="loader"></div>
      <span className="loader-label">{label}</span>
    </div>
  )
}

export { Loading }
