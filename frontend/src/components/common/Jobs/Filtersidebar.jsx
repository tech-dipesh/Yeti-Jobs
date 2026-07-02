import { useState } from 'react';
import Input from "../Input";
import Radio from '../Radio';
import Buttoncomps from '../Button';
import { jobTypeOptions, postedOptions, statusOptions } from '../../../Data/UserArray';

const INIT = { jobType: '', status: '', posted: '', minSalary: '', maxSalary: '', minExp: '', maxExp: '', sortBy: 'created_at', skills: '', location: '' };

export default function FilterSidebar({ onApply, onClear }) {
  const [filters, setFilters] = useState(INIT);
  const set = (name) => (val) => setFilters((p) => ({ ...p, [name]: val }));
  const handleApply = () => onApply?.(filters);
  const handleClear = () => { setFilters(INIT); onClear?.(INIT); };

  return (
    <div className="bg-[#314158] w-full rounded-2xl p-6 border border-slate-700/50 sticky top-24 shadow-xl">
      <h3 className="text-lg font-bold text-white mb-6">Filters</h3>
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Job Type</p>
          <Radio options={jobTypeOptions} value={filters.jobType} click={setFilters} name="jobType" layout="vertical" />
        </div>

        <div className="border-t border-slate-600/40 pt-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Salary Range</p>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Min" type="number" value={filters.minSalary} click={setFilters} name="minSalary" />
            <Input placeholder="Max" type="number" value={filters.maxSalary} click={setFilters} name="maxSalary" />
          </div>
        </div>

        <div className="border-t border-slate-600/40 pt-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Experience (years)</p>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Min" type="number" step="0.5" value={filters.minExp} click={setFilters} name="minExp" />
            <Input placeholder="Max" type="number" step="0.5" value={filters.maxExp} click={setFilters} name="maxExp" />
          </div>
        </div>

        <div className="border-t border-slate-600/40 pt-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Posted Date</p>
          <Radio options={postedOptions} value={filters.posted} click={setFilters} name="posted" layout="vertical" />
        </div>

        <div className="border-t border-slate-600/40 pt-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Status</p>
          <Radio options={statusOptions} value={filters.status} click={setFilters} name="status" layout="vertical" />
        </div>

        <div className="border-t border-slate-600/40 pt-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Sort By</p>
          <select
            value={filters.sortBy}
            onChange={setFilters}
            className="w-full bg-slate-900/60 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
          >
            <option value="created_at">Most Recent</option>
            <option value="salary">Salary (High to Low)</option>
            <option value="total_job_views">Most Views</option>
          </select>
        </div>

        <div className="border-t border-slate-600/40 pt-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Skills</p>
          <Input placeholder="e.g., React, Node.js" type="text" value={filters.skills} click={setFilters} name="skills" />
        </div>

        <div className="border-t border-slate-600/40 pt-5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Location</p>
          <Input placeholder="City or remote" type="text" value={filters.location} click={setFilters} name="location" />
        </div>

        <div className="border-t border-slate-600/40 pt-5 flex gap-3">
          <button
            onClick={handleApply}
            className="flex-1 bg-cyan-700 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors"
          >
            Apply
          </button>
          <button
            onClick={handleClear}
            className="flex-1 bg-blue-900/60 border border-slate-600 text-white text-sm font-semibold py-2.5 rounded-xl cursor-pointer transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
