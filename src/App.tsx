import { useState, useEffect, useMemo } from 'react';
import type { Expense, ExpenseFilters } from './types/expense';
import { loadExpenses, addExpense, updateExpense, deleteExpense, saveExpenses } from './utils/storage';
import { filterExpenses, calculateStats, formatCurrency } from './utils/analytics';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { CategoryChart } from './components/CategoryChart';
import { MonthlyTrendChart } from './components/MonthlyTrendChart';
import { StatCard } from './components/StatCard';
import { ExpenseFiltersComponent } from './components/ExpenseFilters';
import { DollarSign, TrendingUp, Receipt, Calendar, Download } from 'lucide-react';
import { generateSampleExpenses } from './utils/sampleData';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filters, setFilters] = useState<ExpenseFilters>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'list'>('overview');

  // Load expenses from localStorage on mount
  useEffect(() => {
    setExpenses(loadExpenses());
  }, []);

  // Filter expenses based on active filters
  const filteredExpenses = useMemo(() => {
    return filterExpenses(expenses, filters);
  }, [expenses, filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    return calculateStats(filteredExpenses);
  }, [filteredExpenses]);

  const handleAddExpense = (expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newExpense = addExpense(expenseData);
    setExpenses([...expenses, newExpense]);
  };

  const handleUpdateExpense = (expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingExpense) return;
    const updated = updateExpense(editingExpense.id, expenseData);
    if (updated) {
      setExpenses(expenses.map(e => e.id === updated.id ? updated : e));
      setEditingExpense(null);
    }
  };

  const handleDeleteExpense = (id: string) => {
    if (deleteExpense(id)) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadSampleData = () => {
    if (expenses.length > 0) {
      const confirmed = confirm('This will replace all existing expenses. Are you sure?');
      if (!confirmed) return;
    }
    const sampleExpenses = generateSampleExpenses();
    saveExpenses(sampleExpenses);
    setExpenses(sampleExpenses);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Household Expenses Dashboard</h1>
              <p className="text-gray-600">Track and analyze your spending patterns</p>
            </div>
            {expenses.length === 0 && (
              <button
                onClick={handleLoadSampleData}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Download size={18} />
                Load Sample Data
              </button>
            )}
          </div>
        </div>

        {/* Expense Form */}
        <div className="mb-8">
          <ExpenseForm
            onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
            onCancel={editingExpense ? () => setEditingExpense(null) : undefined}
            initialData={editingExpense || undefined}
          />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ExpenseFiltersComponent filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Analytics Overview
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'list'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Expenses
              </button>
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Expenses"
                value={formatCurrency(stats.totalExpenses)}
                icon={DollarSign}
                color="bg-blue-500"
              />
              <StatCard
                title="Average Expense"
                value={formatCurrency(stats.averageExpense)}
                icon={TrendingUp}
                color="bg-green-500"
              />
              <StatCard
                title="Total Transactions"
                value={filteredExpenses.length.toString()}
                icon={Receipt}
                color="bg-purple-500"
              />
              <StatCard
                title="Categories Used"
                value={Object.keys(stats.categoryBreakdown).length.toString()}
                icon={Calendar}
                color="bg-orange-500"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <CategoryChart categoryBreakdown={stats.categoryBreakdown} />
              <MonthlyTrendChart monthlyTrend={stats.monthlyTrend} />
            </div>
          </>
        ) : (
          /* Expense List */
          <div className="mb-8">
            <ExpenseList
              expenses={filteredExpenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
