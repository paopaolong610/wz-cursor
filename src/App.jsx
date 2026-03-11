import { useEffect, useMemo, useState } from 'react'

function getInitialTheme() {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

function parseNumber(input) {
  const trimmed = String(input ?? '').trim()
  if (!trimmed) return null
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : null
}

function formatNumber(n) {
  if (Number.isNaN(n)) return 'NaN'
  if (!Number.isFinite(n)) return n > 0 ? '∞' : '-∞'
  return String(n)
}

export default function App() {
  const [value, setValue] = useState(0)
  const [operandInput, setOperandInput] = useState('1')
  const [error, setError] = useState('')
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const themeLabel = useMemo(() => (theme === 'dark' ? '暗黑' : '明亮'), [theme])

  function resetAll() {
    setValue(0)
    setOperandInput('1')
    setError('')
  }

  function applyOp(op) {
    const operand = parseNumber(operandInput)
    if (operand === null) {
      setError('请输入有效数字')
      return
    }
    setError('')
    setValue((prev) => {
      switch (op) {
        case '+':
          return prev + operand
        case '-':
          return prev - operand
        case '*':
          return prev * operand
        case '/':
          return operand === 0 ? NaN : prev / operand
        default:
          return prev
      }
    })
  }

  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex w-full max-w-xl items-center justify-between px-6 py-6">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">计数器 / 计算器</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            React + Vite + Tailwind
          </p>
        </div>

        <button
          type="button"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 active:scale-[0.99] dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
          aria-label="切换暗黑模式"
        >
          {themeLabel}模式
        </button>
      </header>

      <main className="mx-auto w-full max-w-xl px-6 pb-10">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">当前结果</div>
              <div className="text-5xl font-semibold tabular-nums tracking-tight">
                {formatNumber(value)}
              </div>
            </div>

            <button
              type="button"
              onClick={resetAll}
              className="rounded-xl border border-zinc-200 bg-transparent px-3 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 active:scale-[0.99] dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              重置
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <label className="block">
              <div className="mb-1 text-sm text-zinc-600 dark:text-zinc-400">输入数字</div>
              <input
                value={operandInput}
                onChange={(e) => setOperandInput(e.target.value)}
                inputMode="decimal"
                placeholder="例如：3.14、-2、100"
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-base text-zinc-900 shadow-sm outline-none ring-0 transition focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-700"
              />
            </label>

            {error ? (
              <div className="text-sm font-medium text-red-600 dark:text-red-400">{error}</div>
            ) : null}

            <div className="grid grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => applyOp('+')}
                className="rounded-xl bg-zinc-900 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => applyOp('-')}
                className="rounded-xl bg-zinc-900 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => applyOp('*')}
                className="rounded-xl bg-zinc-900 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                ×
              </button>
              <button
                type="button"
                onClick={() => applyOp('/')}
                className="rounded-xl bg-zinc-900 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                ÷
              </button>
            </div>
          </div>

          <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
            暗黑模式会记住你的选择（localStorage）。
          </div>
        </div>
      </main>
    </div>
  )
}

