import React from 'react'
import { toast } from 'react-toastify'

export default function Successcomps({data}) {
  return data && (
      <>
      {toast.success(data?.message || data)}
      </>
  )
}
