import { useAuth } from '@/app/context/authContext'
import { useBackgroundColor } from '@/app/context/backgroundColorContext'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  Bars3Icon,
  InformationCircleIcon,
  ArrowRightEndOnRectangleIcon,
  QuestionMarkCircleIcon,
  PlusCircleIcon,
  ShoppingBagIcon,
  TagIcon,
  SwatchIcon,
  TruckIcon,
  ArchiveBoxArrowDownIcon,
} from '@heroicons/react/16/solid'
import { useRouter } from 'next/navigation'

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
            onClick={() => router.push('/admin/productos/agregar')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <PlusCircleIcon className="size-4 fill-black" />
            Agregar Producto
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => router.push('/admin/productos')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <ShoppingBagIcon className="size-4 fill-black" />
            Ver Productos
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => router.push('/admin/promociones/agregar')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <TagIcon className="size-4 fill-black" />
            Agregar Promocion
          </button>
        </MenuItem>

        <MenuItem>
          <button
            onClick={() => router.push('/admin/promociones')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <SwatchIcon className="size-4 fill-black" />
            Ver Promociones
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => router.push('/admin/informes')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <InformationCircleIcon className="size-4 fill-black" />
            Informes
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => router.push('/admin/preguntas-pendientes')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <QuestionMarkCircleIcon className="size-4 fill-black" />
            Preguntas Pendientes
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => router.push('/admin/proveedores')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <TruckIcon className="size-4 fill-black" />
            Proveedores
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => router.push('/admin/ingresos')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <ArchiveBoxArrowDownIcon className="size-4 fill-black" />
            Ingresos
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => router.push('/admin/ingresos/agregar')}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
            <PlusCircleIcon className="size-4 fill-black" />
            Cargar Ingreso
          </button>
        </MenuItem>
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
