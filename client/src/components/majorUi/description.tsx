export default function Description({
  children,
  className,
}:{
  children:string,
  className?:string
}) {
  return (
    <p className={`mt-6 text-foreground/80 break-words whitespace-normal text-sm md:text-lg ${className}`}>
      {children}
    </p>
  );
}
