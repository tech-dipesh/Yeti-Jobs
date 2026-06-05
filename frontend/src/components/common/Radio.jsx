export default function Radio({ options, value, click, name, layout = 'vertical' }) {
  const handleChange = (selectedValue) => {
    if (name && click) click((prev) => ({ ...prev, [name]: selectedValue }));
    else if (click) click(selectedValue);
  };

  return (
    <div className={`flex ${layout === 'horizontal' ? 'flex-row gap-6' : 'flex-col gap-3'}`}>
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => handleChange(opt.value)}
            className="w-4 h-4 text-sky-500 bg-slate-800 border-gray-500 focus:ring-sky-500 focus:ring-2"
          />
          <span className="text-white text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
