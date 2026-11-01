import { useState } from 'react'
import BottomNav from './components/BottomNav.tsx'
import Archive from './screens/Archive.tsx'
import BrainDump from './screens/BrainDump.tsx'
import Todos from './screens/Todos.tsx'
import Worries from './screens/Worries.tsx'
import type { Screen } from './types.ts'

// 라우터 없이 state 하나로 화면을 전환한다 (화면이 4개뿐이라 충분)
export default function App() {
  const [screen, setScreen] = useState<Screen>('braindump')

  return (
    <div className="mx-auto min-h-screen max-w-md px-4 pt-6 pb-24">
      {screen === 'braindump' && <BrainDump />}
      {screen === 'worries' && <Worries />}
      {screen === 'todos' && <Todos />}
      {screen === 'archive' && <Archive />}
      <BottomNav current={screen} onChange={setScreen} />
    </div>
  )
}
