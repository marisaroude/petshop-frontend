import { useAuth } from '@/app/context/authContext'
import { useBackgroundColor } from '@/app/context/backgroundColorContext'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  Bars3Icon,
  HomeIcon,
  InformationCircleIcon,
  ShoppingCartIcon,
  ClockIcon,
  HeartIcon,
  ArrowRightEndOnRectangleIcon,
  QuestionMarkCircleIcon,
  GiftIcon,
} from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'
import { FaUpload } from 'react-icons/fa'

export default function AdminMenu() {
  const router = useRouter()
  const { handleSignOut } = useAuth()
  const { bgColor } = useBackgroundColor()
  return (
    <Menu>
      <MenuButton>
        <Bars3Icon className="size-8 fill-black cursor-pointer" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className={`w-52 shadow-md origin-top-right rounded-xl border border-black/9 ${bgColor} p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
        <MenuItem>
          <button
            onClick={() => router.push('/agregar-producto')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <FaUpload className="size-4 fill-black" />
            Agregar Producto
          </button>
        </MenuItem>
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <GiftIcon className="size-4 fill-black" />
            Promociones
          </button>
        </MenuItem>
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <InformationCircleIcon className="size-4 fill-black" />
            Informes
          </button>
        </MenuItem>
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <QuestionMarkCircleIcon className="size-4 fill-black" />
            Preguntas Pendientes
          </button>
        </MenuItem>
        {/* <MenuItem>
          <button
            onClick={() => router.push('/cart')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <ShoppingCartIcon className="size-4 fill-black" />
            Carrito
          </button>
        </MenuItem> */}
        <MenuItem>
          <button
            onClick={handleSignOut}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <ArrowRightEndOnRectangleIcon className="size-4 fill-black" />
            Cerrar Sesion
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
