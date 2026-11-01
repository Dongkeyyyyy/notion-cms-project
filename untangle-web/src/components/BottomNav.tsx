import type { Screen } from '../types.ts'

const TABS: { id: Screen; label: string }[] = [
  { id: 'braindump', label: 'Brain Dump' },
  { id: 'worries', label: '걱정' },
  { id: 'todos', label: '해야 할 일' },
  { id: 'archive', label: 'Archive' },
]

type Props = {
  current: Screen
  onChange: (screen: Screen) => void
}

// 화면 하단 탭 바 (iPhone 앱의 탭 바를 흉내 낸다)
export default function BottomNav({ current, onChange }: Props) {
  return (
    <nav className="fixed inset-x-0 bottom-0 border-t border-stone-200 bg-white pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto flex max-w-md">
        {TABS.map((tab) => (
          <li key={tab.id} className="flex-1">
            <button
              onClick={() => onChange(tab.id)}
              className={`w-full py-3 text-sm ${
                current === tab.id ? 'font-bold text-stone-900' : 'text-stone-400'
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
