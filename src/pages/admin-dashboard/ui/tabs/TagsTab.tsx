import { TagList, useTagsStore } from '@/entities/tags'
import { Button, Input } from '@/shared'
import { useState } from 'react'

export const TagsTab = () => {
  const [tag, setTag] = useState('')
  const createNewTag = useTagsStore((state) => state.createNewTag)

  return (
    <div>
      <h1 className="font-bold">Все тэги</h1>
      <TagList />

      <h2 className="text-xl font-semibold mt-5 mb-5">Добавить новый тэг</h2>
      <div className="flex gap-2.5 max-w-sm">
        <Input
          placeholder="Введите новый тэг..."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button
          disabled={!tag.trim()}
          onClick={() => {
            createNewTag(tag.trim())
            setTag('')
          }}
        >
          Отправить
        </Button>
      </div>
    </div>
  )
}
