export default function Title({children, className}:{children:string, className?:string}) {
  return (
    <div>
      <p className={`font-bold text-4xl lg:text-7xl font-archivo text-[#e3e3e3] ${className}`}>
        {children}
      </p>
    </div>
  );
}
