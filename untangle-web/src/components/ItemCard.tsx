import type { Item } from '../types.ts'

// 항목 하나를 카드로 보여준다. Quick/Focus는 형광펜 색으로 구분.
export default function ItemCard({ item }: { item: Item }) {
  const color =
    item.effort === 'quick' ? 'bg-quick' : item.effort === 'focus' ? 'bg-focus' : 'bg-white'

  return (
    <div className={`rounded-xl border border-stone-200 px-4 py-3 ${color}`}>
      {item.text}
    </div>
  )
}
