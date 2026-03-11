export default function Employeecomps({ uid, full_name, email, experience, education, role, resume_url, profile_pic_url, applied_at, skills }) {
  return (
    <div key={uid} className='bg-neutral-600  rounded-xl shadow-lg transition-shadow flex justify-between items-start flex-col gap-3 border border-gray-200 p-8 w-80 '>
      <div className='flex flex-col items-center gap-1 mb-2'>
      <img src={profile_pic_url} className='w-20 h-20 rounded-full object-cover ring-2 ring-neutral-400' alt="Profile Pic"/>
      <h2 className='text-white font-semibold text-lg'>{full_name}</h2>
      <p className='text-neutral-400 text-sm'>{email}</p>
    </div>
      <div className='w-full flex flex-col gap-2 text-sm'>
    <div className='flex justify-between text-neutral-300'>
      <span className='text-neutral-500'>Experience</span>
      <span>{experience} yrs</span>
    </div>
      <div className='flex justify-between text-neutral-300'>
        <span className='text-neutral-500'>Education</span>
        <span>{education}</span>
      </div>
    </div>

      <span className='bg-sky-500/20 text-sky-300 text-xs px-3 py-1 rounded-full border border-sky-500/30'>
        {role}
    </span>
    {applied_at && <p className='text-sm text-neutral-800'>Applied on: {new Date(applied_at).toLocaleDateString()}</p>}
    {skills && skills.map((u, i) => <p key={i} className='bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium'>{u}</p>)}
       {resume_url && 
      <iframe src={resume_url} width="20%" height="200px">
  <p>Your browser does not support iframes. <a href={resume_url}>Download the PDF</a>.</p>
    </iframe>
      }
    </div>
  )
}
