import { useProgress } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LoadingProgress = () => {
  const { progress, loaded, total } = useProgress()
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setShow(false), 500)
      return () => clearTimeout(timer)
    }
  }, [progress])

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="w-full max-w-md px-4">
        <div className="relative">
          <div className="h-2 w-full rounded-full bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full bg-white"
            />
          </div>
          <div className="mt-4 text-center text-white">
            <span className="text-lg font-semibold">{Math.round(progress)}%</span>
            <p className="mt-1 text-sm text-gray-400">
              {loaded} / {total} 에셋 로드됨
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingProgress