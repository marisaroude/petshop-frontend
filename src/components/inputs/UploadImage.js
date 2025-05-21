'use client'

import { CldUploadWidget } from 'next-cloudinary'

export function UploadImage({ onUploadSuccess, image }) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={result => {
        if (typeof result.info === 'object' && 'secure_url' in result.info) {
          onUploadSuccess(result.info.secure_url)
        }
      }}
      config={{
        cloud: {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        },
      }}
      options={{
        singleUploadAutoClose: true,
      }}>
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            className="bg-gray-300 text-black px-4 py-2 rounded-md cursor-pointer">
            {image ? 'Cambiar foto' : 'Agregar foto'}
          </button>
        )
      }}
    </CldUploadWidget>
  )
}
