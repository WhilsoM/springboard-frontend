import { useOpportunityStore } from '@/entities/opportunity'
import { Button } from '@/shared'
import { Heart } from 'lucide-react'
import type { IAddToFavoriteProps } from '../model'

export const AddToFavorite = ({ opportunity }: IAddToFavoriteProps) => {
  const addToFavorite = useOpportunityStore((s) => s.addToFavorite)
  const deleteFromFavorite = useOpportunityStore((s) => s.deleteFromFavorite)

  const isFavorite = useOpportunityStore((s) =>
    s.favoriteOpportunities.some((fav) => fav.id === opportunity.id),
  )

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isFavorite) {
      deleteFromFavorite(opportunity.id)
    } else {
      addToFavorite(opportunity)
    }
  }

  return (
    <Button variant="ghost" onClick={handleClick} className="hover:bg-transparent">
      <Heart
        size={24}
        className={`transition-all ${
          isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-slate-400 hover:text-red-400'
        }`}
      />
    </Button>
  )
}
