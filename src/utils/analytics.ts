import type { Expense, ExpenseCategory, ExpenseFilters, ExpenseStats } from '../types/expense';
import { format, isWithinInterval, parseISO } from 'date-fns';

export const filterExpenses = (expenses: Expense[], filters: ExpenseFilters): Expense[] => {
  return expenses.filter(expense => {
    if (filters.category && expense.category !== filters.category) {
      return false;
    }

    if (filters.startDate || filters.endDate) {
      const expenseDate = parseISO(expense.date);
      const start = filters.startDate ? parseISO(filters.startDate) : new Date(0);
      const end = filters.endDate ? parseISO(filters.endDate) : new Date();

      if (!isWithinInterval(expenseDate, { start, end })) {
        return false;
      }
    }

    if (filters.minAmount !== undefined && expense.amount < filters.minAmount) {
      return false;
    }

    if (filters.maxAmount !== undefined && expense.amount > filters.maxAmount) {
      return false;
    }

    return true;
  });
};

export const calculateStats = (expenses: Expense[]): ExpenseStats => {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  // Category breakdown
  const categoryBreakdown: Record<ExpenseCategory, number> = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  // Monthly trend for the last 6 months
  const monthlyMap = new Map<string, number>();
  expenses.forEach(expense => {
    const monthKey = format(parseISO(expense.date), 'MMM yyyy');
    monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + expense.amount);
  });

  const monthlyTrend = Array.from(monthlyMap.entries())
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => {
      const dateA = parseISO(`01 ${a.month}`);
      const dateB = parseISO(`01 ${b.month}`);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(-6); // Last 6 months

  return {
    totalExpenses,
    averageExpense,
    categoryBreakdown,
    monthlyTrend,
  };
};

export const getCategoryColor = (category: ExpenseCategory): string => {
  const colorMap: Record<ExpenseCategory, string> = {
    'Food & Dining': '#FF6384',
    'Transportation': '#36A2EB',
    'Housing': '#FFCE56',
    'Utilities': '#4BC0C0',
    'Healthcare': '#9966FF',
    'Entertainment': '#FF9F40',
    'Shopping': '#FF6384',
    'Education': '#C9CBCF',
    'Personal Care': '#4BC0C0',
    'Travel': '#FF9F40',
    'Insurance': '#36A2EB',
    'Savings & Investments': '#9966FF',
    'Other': '#C9CBCF',
  };
  return colorMap[category] || '#C9CBCF';
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
