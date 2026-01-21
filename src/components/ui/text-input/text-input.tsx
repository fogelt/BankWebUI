interface TextInputProps {
  label: string;
  type?: "text" | "password";
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
}

export function TextInput({ label, type = "text", value, onChange, className }: TextInputProps) {
  return (
    <div className={`relative w-full mb-2 ${className}`}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder=" "
        className="peer w-full px-4 py-3 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-1 focus:ring-gray-500 
                   focus:border-transparent transition-all shadow-lg bg-gray-100"
      />

      <label
        className="absolute left-4 bg-gray-100 rounded-sm top-3 text-gray-400 text-sm transition-all duration-200 pointer-events-none uppercase tracking-[0.1em]
           peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-gray-600 
           peer-focus:ring-1 peer-focus:ring-gray-500 peer-focus:px-1 
           peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2
           peer-[:not(:focus)]:ring-gray-300 peer-[:not(:placeholder-shown)]:ring-1
           peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-1"
      >
        {label}
      </label>
    </div>
  );
}