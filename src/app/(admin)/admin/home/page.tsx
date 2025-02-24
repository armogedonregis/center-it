'use client'

import { useState, useEffect } from 'react'
import { HomeContent } from '@/types/home'

export default function AdminHomePage() {
  const [content, setContent] = useState<HomeContent | null>(null)
  
  useEffect(() => {
    fetch('/api/home/get')
      .then(res => res.json())
      .then(data => setContent(data))
  }, [])

  if (!content) return <div>Загрузка...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Редактирование главной страницы</h1>
      {/* Форма редактирования */}
    </div>
  )
} 