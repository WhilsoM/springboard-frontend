import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldGroup,
  Input,
  Label,
} from '@/shared'

import { useEffect, useState } from 'react'

export const ApplicantTags = () => {
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js'])
  const [newSkillsInput, setNewSkillsInput] = useState(skills.join(' '))
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddSkills = (e: React.FormEvent) => {
    e.preventDefault()

    const skillsArray = newSkillsInput
      .split(' ')
      .map((s) => s.trim())
      .filter((s) => s !== '')

    setSkills(skillsArray)
    setIsDialogOpen(false)
  }

  useEffect(() => {
    if (isDialogOpen) {
      setNewSkillsInput(skills.join(' '))
    }
  }, [isDialogOpen, skills])

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 text-sm font-medium text-slate-700">Skills</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill, index) => (
            <p key={index} className="bg-slate-200 text-slate-800 px-2 py-1 rounded-md text-sm">
              {skill}
            </p>
          ))}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant={'ghost'}
                className="inline-flex items-center rounded-full border border-dashed border-slate-300 px-2.5 py-0.5 text-xs font-semibold text-slate-500 hover:border-blue-400 hover:text-blue-600"
              >
                + Add
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
              <form onSubmit={handleAddSkills}>
                <DialogHeader>
                  <DialogTitle>Добавить навыки</DialogTitle>
                  <DialogDescription>Введите названия навыков через пробел.</DialogDescription>
                </DialogHeader>

                <FieldGroup className="py-4">
                  <Field>
                    <Label htmlFor="skills">Новые навыки</Label>
                    <Input
                      id="skills"
                      value={newSkillsInput}
                      onChange={(e) => setNewSkillsInput(e.target.value)}
                      placeholder="Git Tailwind..."
                      autoFocus
                    />
                  </Field>
                </FieldGroup>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Отмена
                    </Button>
                  </DialogClose>
                  <Button type="submit">Сохранить</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
