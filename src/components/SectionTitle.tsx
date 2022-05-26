export default ({
  title,
  className = '',
}: {
  title: string
  className?: string
}) => {
  return (
    <h1
      className={`mb-2 font-roboto text-xl font-bold text-base-200 ${
        className ? className : ''
      }`}
    >
      {title.toUpperCase()}
    </h1>
  )
}
