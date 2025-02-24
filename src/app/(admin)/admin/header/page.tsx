'use client'

import { useState, useEffect } from 'react'

export default function AdminHeaderPage() {
  const [content, setContent] = useState<null>(null)
  
  useEffect(() => {
    fetch('/api/header/get')
      .then(res => res.json())
      .then(data => setContent(data))
  }, [])

  if (!content) return <div>Загрузка...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Редактирование хедера</h1>
      {/* Форма редактирования */}
    </div>
  )
} 