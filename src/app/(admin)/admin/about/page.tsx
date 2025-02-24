'use client'

import { useState, useEffect } from 'react'

export default function AdminAboutPage() {
  const [content, setContent] = useState<null>(null)
  
  useEffect(() => {
    fetch('/api/about/get')
      .then(res => res.json())
      .then(data => setContent(data))
  }, [])

  if (!content) return <div>Загрузка...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Редактирование страницы "О компании"</h1>
      {/* Форма редактирования */}
    </div>
  )
} 