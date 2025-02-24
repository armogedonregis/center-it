'use client'

import { useState, useEffect } from 'react'

export default function AdminServicesPage() {
  const [content, setContent] = useState<null>(null)
  
  useEffect(() => {
    fetch('/api/services/get')
      .then(res => res.json())
      .then(data => setContent(data))
  }, [])

  if (!content) return <div>Загрузка...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Редактирование страницы "Услуги"</h1>
      {/* Форма редактирования */}
    </div>
  )
} 