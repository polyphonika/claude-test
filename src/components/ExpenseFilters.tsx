import { useState } from 'react';
import type { ExpenseCategory, ExpenseFilters } from '../types/expense';
import { EXPENSE_CATEGORIES } from '../types/expense';
import { Filter, X } from 'lucide-react';
import { format } from 'date-fns';

interface ExpenseFiltersProps {
  filters: ExpenseFilters;
  onFiltersChange: (filters: ExpenseFilters) => void;
}

export const ExpenseFiltersComponent = ({ filters, onFiltersChange }: ExpenseFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleReset = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              Active
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Filter size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div>
            <label htmlFor="filter-category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="filter-category"
              value={filters.category || ''}
              onChange={(e) => onFiltersChange({ ...filters, category: e.target.value as ExpenseCategory || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {EXPENSE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-start-date" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="filter-start-date"
              value={filters.startDate ? format(new Date(filters.startDate), 'yyyy-MM-dd') : ''}
              onChange={(e) => onFiltersChange({ ...filters, startDate: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="filter-end-date" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="filter-end-date"
              value={filters.endDate ? format(new Date(filters.endDate), 'yyyy-MM-dd') : ''}
              onChange={(e) => onFiltersChange({ ...filters, endDate: e.target.value || undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="filter-min-amount" className="block text-sm font-medium text-gray-700 mb-1">
              Min Amount ($)
            </label>
            <input
              type="number"
              id="filter-min-amount"
              value={filters.minAmount || ''}
              onChange={(e) => onFiltersChange({ ...filters, minAmount: e.target.value ? parseFloat(e.target.value) : undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
        </div>
      )}
    </div>
  );
};
