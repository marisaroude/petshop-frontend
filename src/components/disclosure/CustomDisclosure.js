import { useBackgroundColor } from '@/app/context/backgroundColorContext'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function CustomDisclosure({ data }) {
  const { bgLightColors } = useBackgroundColor()

  return (
    <div>
      <Disclosure as="div" className={`p-6 ${bgLightColors}`}>
        <DisclosureButton className="group flex w-full items-center justify-between">
          <span className="text-md font-medium text-black group-data-hover:text-black/80">
            {data.question}
          </span>
          <ChevronDownIcon className="size-5 fill-black/60 group-data-hover:fill-black/50 group-data-open:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel className="mt-2  text-md text-black/50">
          {data.answer}
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}
