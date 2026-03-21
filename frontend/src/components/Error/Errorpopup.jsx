import { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function Errorpopup({error}) {
  useEffect(() => {
    if (error) {
      toast.error(error, { toastId: "unique-error-id" }
      )
    }
  }, [error])
  return (
    <>
    </>
  )
}