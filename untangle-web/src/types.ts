// 앱 전체에서 쓰는 데이터 모델. 이 파일만 보면 데이터 구조를 알 수 있다.

// 항목의 현재 위치
export type Status = 'braindump' | 'worry' | 'todo' | 'archived'

// 얼마나 걸릴까요? quick: 10분 이하, focus: 30분 이상
export type Effort = 'quick' | 'focus'

// 언제 할까요? (정확한 날짜는 쓰지 않는다)
export type When = 'today' | 'this_week' | 'next_week' | 'later'

export type Item = {
  id: string
  text: string
  createdAt: string // ISO 문자열
  status: Status
  effort?: Effort // todo일 때만
  when?: When // todo일 때만
}

// 화면(탭) 종류
export type Screen = 'braindump' | 'worries' | 'todos' | 'archive'
