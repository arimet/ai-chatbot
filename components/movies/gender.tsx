import { format, parseISO } from 'date-fns'

interface Gender {
  label: string
}

export function Genders({ props: genders }: { props: Gender[] }) {
  return (
    <div className="-mt-2 flex w-full flex-col gap-2 py-4">
      {genders.map(gender => (
        <div
          key={gender.label}
          className="flex shrink-0 flex-col gap-1 rounded-lg bg-zinc-800 p-4"
        >
          <div className="text-base font-bold text-zinc-200">
            {gender.label}
          </div>
         
        </div>
      ))}
    </div>
  )
}
