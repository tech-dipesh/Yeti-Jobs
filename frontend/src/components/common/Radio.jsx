export default function Radio({ options, value, click, name, layout = 'vertical' }) {
  const handleChange = (val) => { if (click) click(val); };
  return (
    <div className={`flex ${layout === 'horizontal' ? 'flex-row gap-6' : 'flex-col gap-2'}`}>
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${value === opt.value ? 'border-sky-500 bg-sky-500' : 'border-slate-500 bg-transparent group-hover:border-slate-400'}`}>
            {value === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
          </div>
          <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={() => handleChange(opt.value)} className="sr-only" />
          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
