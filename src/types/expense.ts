export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

export type ExpenseCategory =
  | 'Food & Dining'
  | 'Transportation'
  | 'Housing'
  | 'Utilities'
  | 'Healthcare'
  | 'Entertainment'
  | 'Shopping'
  | 'Education'
  | 'Personal Care'
  | 'Travel'
  | 'Insurance'
  | 'Savings & Investments'
  | 'Other';

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Food & Dining',
  'Transportation',
  'Housing',
  'Utilities',
  'Healthcare',
  'Entertainment',
  'Shopping',
  'Education',
  'Personal Care',
  'Travel',
  'Insurance',
  'Savings & Investments',
  'Other',
];

export interface ExpenseFilters {
  category?: ExpenseCategory;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface ExpenseStats {
  totalExpenses: number;
  averageExpense: number;
  categoryBreakdown: Record<ExpenseCategory, number>;
  monthlyTrend: { month: string; amount: number }[];
}
