import type { Item } from './types.ts'

const KEY = 'untangle.items.v1'

// localStorage에서 항목 목록을 읽는다. 없거나 깨졌으면 빈 배열.
export function loadItems(): Item[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Item[]) : []
  } catch {
    return []
  }
}

export function saveItems(items: Item[]): void {
  localStorage.setItem(KEY, JSON.stringify(items))
}

// 백업용: 현재 데이터를 JSON 문자열로 내보낸다.
// (Safari가 오래 방문하지 않은 사이트의 저장 데이터를 지울 수 있어 백업 수단을 둔다)
export function exportJson(items: Item[]): string {
  return JSON.stringify(items, null, 2)
}

// 백업 JSON을 읽어 항목 목록으로 변환한다. 형식이 틀리면 null.
export function parseImport(text: string): Item[] | null {
  try {
    const data = JSON.parse(text)
    return Array.isArray(data) ? (data as Item[]) : null
  } catch {
    return null
  }
}
