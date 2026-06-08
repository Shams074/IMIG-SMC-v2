export type CloudinaryFolder = 'blogs' | 'events' | 'team' | 'resources'

export async function uploadToCloudinary(
  file: File,
  folder: CloudinaryFolder
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary environment variables not set')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('folder', `imig-smc/${folder}`)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData }
  )

  if (!res.ok) {
    throw new Error(`Cloudinary upload failed: ${res.statusText}`)
  }

  const data = await res.json()
  return data.secure_url as string
}

export function getCloudinaryUrl(url: string, width = 800, quality = 'auto') {
  if (!url || !url.includes('cloudinary.com')) return url
  return url.replace('/upload/', `/upload/w_${width},q_${quality},f_auto/`)
}
