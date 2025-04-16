import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  Bars3Icon,
  HomeIcon,
  InformationCircleIcon,
  ShoppingCartIcon,
  ClockIcon,
  HeartIcon,
  ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/16/solid'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function UserMenu() {
  const router = useRouter()

  return (
    <div>
      <Menu>
        <MenuButton>
          <Bars3Icon className="size-8 fill-black" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 shadow-md origin-top-right rounded-xl border border-black/9 bg-pink p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <HomeIcon className="size-4 fill-black" />
              Inicio
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <InformationCircleIcon className="size-4 fill-black" />
              Datos
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <ClockIcon className="size-4 fill-black" />
              Historial
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <HeartIcon className="size-4 fill-black" />
              Mascota
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <ShoppingCartIcon className="size-4 fill-black" />
              Carrito
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={signOut}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              <ArrowRightEndOnRectangleIcon className="size-4 fill-black" />
              Cerrar Sesion
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}
