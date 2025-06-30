import {
  HomeIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const FullScreenUnsubscribed = () => {
  const router = useRouter()

  const handleBackHome = () => {
    signOut()
    router.push('/')
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-bold text-red-600">Acceso restringido</h1>
        <p className="text-gray-800">
          Tu cuenta fue dada de baja y no podés acceder al sistema en este
          momento.
        </p>
        <p className="text-gray-600">
          Si creés que esto es un error, por favor contactanos por alguno de los
          siguientes medios:
        </p>

        <div className="space-y-3 text-left text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-5 h-5 text-green-700" />
            <span>
              Atención Telefónica: <strong>0810-220-2345</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ChatBubbleLeftIcon className="w-5 h-5 text-green-700" />
            <span>
              WhatsApp: <strong>+54 911 6702 6320</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="w-5 h-5 text-green-700" />
            <span>
              Email:{' '}
              <a
                href="mailto:puppisarg.soporte@gmail.com"
                className="underline">
                puppisarg.soporte@gmail.com
              </a>
            </span>
          </div>
          <p className="text-sm mt-2 font-semibold text-gray-600">
            Horario: Lunes a Sábados de 9 a 21 hs
          </p>
        </div>

        <button
          onClick={handleBackHome}
          className="inline-flex items-center justify-center gap-2 mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          <HomeIcon className="w-5 h-5" />
          Volver al inicio
        </button>
      </div>
    </div>
  )
}

export default FullScreenUnsubscribed
