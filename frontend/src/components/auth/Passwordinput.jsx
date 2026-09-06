import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import InputComps from '../ui/Input'; 
export default function PasswordInput({ value, setValue, setError, name = 'password', placeholder = '••••••••' }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full">
      <InputComps
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        value={value}
        click={setValue}
        error={setError}
        autoComplete="current-password"
        className="w-full pr-10" 
      />
      
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200 focus:outline-none cursor-pointer"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}