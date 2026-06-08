'use client'
import { useState, useRef } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { uploadToCloudinary, type CloudinaryFolder } from '@/lib/cloudinary'
import Image from 'next/image'

interface Props {
  folder: CloudinaryFolder
  value: string
  onChange: (url: string) => void
  label?: string
  aspectRatio?: string
}

export default function ImageUpload({ folder, value, onChange, label = 'Upload Image', aspectRatio = 'aspect-video' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('File must be under 5MB')
      return
    }

    setUploading(true)
    setError('')
    try {
      const url = await uploadToCloudinary(file, folder)
      onChange(url)
    } catch {
      setError('Upload failed. Check your Cloudinary settings.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full">
      {value ? (
        <div className={`relative ${aspectRatio} rounded-xl overflow-hidden border border-blue-100 bg-blue-50 group`}>
          <Image src={value} alt="Uploaded" fill className="object-cover" />
          <button
            onClick={() => { onChange(''); if (inputRef.current) inputRef.current.value = '' }}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`w-full ${aspectRatio} border-2 border-dashed border-blue-200 hover:border-blue-400 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors bg-blue-50 hover:bg-blue-100 disabled:opacity-60`}
        >
          {uploading ? (
            <>
              <Loader2 size={22} className="text-blue-400 animate-spin" />
              <span className="text-xs text-blue-500 font-medium">Uploading to Cloudinary…</span>
            </>
          ) : (
            <>
              <Upload size={22} className="text-blue-400" />
              <span className="text-xs text-blue-500 font-medium">{label}</span>
              <span className="text-[10px] text-blue-300">PNG, JPG up to 5MB</span>
            </>
          )}
        </button>
      )}

      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  )
}
