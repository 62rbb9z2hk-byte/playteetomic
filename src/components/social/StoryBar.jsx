import { useDataStore } from '../../store/appStore'
import Avatar from '../ui/Avatar'

export default function StoryBar() {
  const { stories, getUser } = useDataStore()

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide px-1">
      {stories.map((story) => {
        const author = getUser(story.userId)
        return (
          <button key={story.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="p-0.5 rounded-full bg-gradient-to-br from-brand-gold via-brand-green to-emerald-400">
              <div className="p-0.5 rounded-full bg-brand-dark">
                <Avatar user={author} size={12} />
              </div>
            </div>
            <span className="text-[11px] text-brand-muted max-w-[52px] truncate">{author?.name?.split(' ')[0]}</span>
          </button>
        )
      })}
    </div>
  )
}
