import { AuroraText } from "../magicui/aurora-text";

export default function Title({children, className}:{children:any, className?:string}) {
  return (
    <div>
      <p className={`font-bold text-4xl md:text:6xl lg:text-7xl font-archivo bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent ${className}`}>
        {children}
      </p>
    </div>
  );
}
