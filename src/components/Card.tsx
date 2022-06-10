export default ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`rounded bg-white p-4 ${className ? className : ''}`}>
      {children}
    </div>
  )
}
