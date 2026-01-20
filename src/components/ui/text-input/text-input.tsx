interface TextInputProps {
  label: string;
  type?: "text" | "password";
  value?: string;
  onChange?: (val: string) => void;
}

export function TextInput({ label, type = "text", value, onChange }: TextInputProps) {
  return (
    <div className="relative w-full mb-2">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder=" "
        className="peer w-full px-4 py-3 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-transparent transition-all bg-white text-gray-900"
      />

      <label
        className="absolute left-4 top-3 text-gray-500 transition-all duration-200 pointer-events-none
                   peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-1
                   peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
      >
        {label}
      </label>
    </div>
  );
}