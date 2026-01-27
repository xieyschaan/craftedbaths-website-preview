interface SkeletonProps {
  className?: string
  width?: string
  height?: string
}

export default function Skeleton({ className = '', width, height }: SkeletonProps) {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded ${className}`}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    />
  )
}
