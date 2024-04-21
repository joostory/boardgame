import { FormEvent, ReactNode } from "react"

export function FormItem({
  label,
  children
}: {
  label?: string,
  children: ReactNode
}) {
  return (
    <div className='px-0 py-6 grid grid-cols-3 gap-4 text-sm'>
      <dt className='flex justify-center items-start pt-2'>{label}</dt>
      <dd className='col-span-2 text-start'>
        {children}
      </dd>
    </div>
  )
}

export default function Form({
  children,
  onSubmit
}: {
  children: ReactNode,
  onSubmit?: {(e: FormEvent): void}
}) {
  return (
    <form className='mt-6 border-t border-gray-900' onSubmit={onSubmit}>
      <dl className='divide-y divide-gray-900'>
        {children}
      </dl>
    </form>
  )
}
