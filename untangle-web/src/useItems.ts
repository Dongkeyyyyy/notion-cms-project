import { useEffect, useState } from 'react'
import { loadItems, saveItems } from './storage.ts'
import type { Item, Status } from './types.ts'

// 항목 목록 상태를 한 곳에서 관리하는 훅. 바뀔 때마다 localStorage에 저장한다.
export function useItems() {
  const [items, setItems] = useState<Item[]>(loadItems)

  useEffect(() => {
    saveItems(items)
  }, [items])

  // Brain Dump에 새 생각 추가 (우선순위, 날짜, 태그는 묻지 않는다)
  function addItem(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    const item: Item = {
      id: crypto.randomUUID(),
      text: trimmed,
      createdAt: new Date().toISOString(),
      status: 'braindump',
    }
    setItems((prev) => [item, ...prev])
  }

  // 항목 일부 필드를 바꾼다 (예: status 이동, effort/when 지정)
  function updateItem(id: string, patch: Partial<Item>) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }

  function moveItem(id: string, status: Status) {
    updateItem(id, { status })
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function replaceAll(next: Item[]) {
    setItems(next)
  }

  return { items, addItem, updateItem, moveItem, removeItem, replaceAll }
}
