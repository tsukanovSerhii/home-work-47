import { forwardRef } from 'react'
import { AlertCircle } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-300" htmlFor={props.id}>
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full bg-black/20 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-indigo-500'
            } rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors`}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-sm flex items-center gap-1 mt-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
