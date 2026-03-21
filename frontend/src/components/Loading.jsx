import { FadeLoader } from 'react-spinners'

export default function Loading() {
  return (
     <div className='flex justify-center align-middle my-24'>
    <FadeLoader
        color="#404040"
        loading={true}
        height={50}
        width={6}
        radius={4}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
      </div>
    )
}
