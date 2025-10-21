import type { Expense } from '../types/expense';

const STORAGE_KEY = 'household_expenses';

export const saveExpenses = (expenses: Expense[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Failed to save expenses to localStorage:', error);
  }
};

export const loadExpenses = (): Expense[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Expense[];
  } catch (error) {
    console.error('Failed to load expenses from localStorage:', error);
    return [];
  }
};

export const addExpense = (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Expense => {
  const expenses = loadExpenses();
  const now = new Date().toISOString();
  const newExpense: Expense = {
    ...expense,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  expenses.push(newExpense);
  saveExpenses(expenses);
  return newExpense;
};

export const updateExpense = (id: string, updates: Partial<Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>>): Expense | null => {
  const expenses = loadExpenses();
  const index = expenses.findIndex(e => e.id === id);
  if (index === -1) return null;

  const updatedExpense: Expense = {
    ...expenses[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  expenses[index] = updatedExpense;
  saveExpenses(expenses);
  return updatedExpense;
};

export const deleteExpense = (id: string): boolean => {
  const expenses = loadExpenses();
  const filteredExpenses = expenses.filter(e => e.id !== id);
  if (filteredExpenses.length === expenses.length) return false;
  saveExpenses(filteredExpenses);
  return true;
};
