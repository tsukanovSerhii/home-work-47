import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle2, AlertCircle } from 'lucide-react'

// Типізація даних форми
interface IFormInput {
  name: string
  email: string
  password: string
}

export default function RegistrationForm() {
  const [isSuccess, setIsSuccess] = useState(false)

  // Ініціалізація React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    mode: 'onTouched', // Валідація спрацьовує, коли користувач покидає поле
  })

  // Обробник відправки
  const onSubmit = async (data: IFormInput) => {
    // Штучна затримка для демонстрації процесу
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Дані форми успішно відправлені:', data)
    setIsSuccess(true)
    reset() // Очищення форми
    setTimeout(() => setIsSuccess(false), 3000)
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Декоративний градієнт */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400 text-sm">Join us today. It takes only a minute.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          
          {/* Поле: Ім'я */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300" htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              className={`w-full bg-black/20 border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-indigo-500'} rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors`}
              placeholder="John Doe"
              aria-invalid={errors.name ? "true" : "false"}
              {...register('name', {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/i,
                  message: "Name can only contain letters",
                }
              })}
            />
            {errors.name && (
              <p className="text-red-400 text-sm flex items-center gap-1 mt-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Поле: Електронна пошта */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className={`w-full bg-black/20 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-indigo-500'} rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors`}
              placeholder="hello@example.com"
              aria-invalid={errors.email ? "true" : "false"}
              {...register('email', {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                }
              })}
            />
            {errors.email && (
              <p className="text-red-400 text-sm flex items-center gap-1 mt-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Поле: Пароль */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={`w-full bg-black/20 border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-indigo-500'} rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors`}
              placeholder="••••••••"
              aria-invalid={errors.password ? "true" : "false"}
              {...register('password', {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                }
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm flex items-center gap-1 mt-1">
                <AlertCircle className="w-4 h-4" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Кнопка відправки */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-xl shadow-[0_4px_15px_rgba(99,102,241,0.4)] transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Повідомлення про успіх */}
        {isSuccess && (
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl z-10 animate-in fade-in duration-300">
            <div className="bg-green-500/20 p-4 rounded-full mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Success!</h3>
            <p className="text-slate-300">Your account has been created.</p>
          </div>
        )}
      </div>
    </div>
  )
}
