export default function Description({
  children,
  className,
}:{
  children:React.ReactNode,
  className?:string
}) {
  return (
    <p className={` break-words whitespace-normal text-sm md:text-lg ${className}`}>
      {children}
    </p>
  );
}
