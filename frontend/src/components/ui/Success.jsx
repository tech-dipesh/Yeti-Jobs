import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function Successcomps({ data }) {
  useEffect(() => {
    if (data) {
      toast.success(data?.message || data, {toastId: data?.message})
    }
  }, [data])

  return null
}
