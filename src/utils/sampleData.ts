import type { Expense } from '../types/expense';
import { subDays, subMonths } from 'date-fns';

export const generateSampleExpenses = (): Expense[] => {
  const now = new Date();

  const sampleExpenses: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>[] = [
    // This month
    { description: 'Grocery shopping at Whole Foods', amount: 125.50, category: 'Food & Dining', date: subDays(now, 2).toISOString() },
    { description: 'Gas for car', amount: 45.00, category: 'Transportation', date: subDays(now, 3).toISOString() },
    { description: 'Electricity bill', amount: 89.99, category: 'Utilities', date: subDays(now, 5).toISOString() },
    { description: 'Netflix subscription', amount: 15.99, category: 'Entertainment', date: subDays(now, 7).toISOString() },
    { description: 'Dinner at Italian restaurant', amount: 67.50, category: 'Food & Dining', date: subDays(now, 8).toISOString() },
    { description: 'Monthly rent payment', amount: 1500.00, category: 'Housing', date: subDays(now, 1).toISOString() },
    { description: 'Online course subscription', amount: 29.99, category: 'Education', date: subDays(now, 10).toISOString() },
    { description: 'Gym membership', amount: 49.99, category: 'Personal Care', date: subDays(now, 12).toISOString() },

    // Last month
    { description: 'Grocery shopping', amount: 98.75, category: 'Food & Dining', date: subMonths(now, 1).toISOString() },
    { description: 'Car insurance', amount: 125.00, category: 'Insurance', date: subDays(subMonths(now, 1), 5).toISOString() },
    { description: 'Internet bill', amount: 59.99, category: 'Utilities', date: subDays(subMonths(now, 1), 3).toISOString() },
    { description: 'Coffee shop', amount: 12.50, category: 'Food & Dining', date: subDays(subMonths(now, 1), 10).toISOString() },
    { description: 'New shoes', amount: 89.99, category: 'Shopping', date: subDays(subMonths(now, 1), 15).toISOString() },
    { description: 'Doctor visit co-pay', amount: 35.00, category: 'Healthcare', date: subDays(subMonths(now, 1), 20).toISOString() },
    { description: 'Monthly rent payment', amount: 1500.00, category: 'Housing', date: subDays(subMonths(now, 1), 1).toISOString() },

    // 2 months ago
    { description: 'Grocery shopping', amount: 110.25, category: 'Food & Dining', date: subMonths(now, 2).toISOString() },
    { description: 'Gas for car', amount: 42.00, category: 'Transportation', date: subDays(subMonths(now, 2), 5).toISOString() },
    { description: 'Movie tickets', amount: 28.00, category: 'Entertainment', date: subDays(subMonths(now, 2), 8).toISOString() },
    { description: 'Phone bill', amount: 65.00, category: 'Utilities', date: subDays(subMonths(now, 2), 3).toISOString() },
    { description: 'Savings deposit', amount: 500.00, category: 'Savings & Investments', date: subDays(subMonths(now, 2), 1).toISOString() },
    { description: 'Monthly rent payment', amount: 1500.00, category: 'Housing', date: subDays(subMonths(now, 2), 1).toISOString() },

    // 3 months ago
    { description: 'Grocery shopping', amount: 105.00, category: 'Food & Dining', date: subMonths(now, 3).toISOString() },
    { description: 'Weekend trip', amount: 350.00, category: 'Travel', date: subDays(subMonths(now, 3), 10).toISOString() },
    { description: 'New laptop', amount: 1200.00, category: 'Shopping', date: subDays(subMonths(now, 3), 15).toISOString() },
    { description: 'Restaurant dinner', amount: 85.00, category: 'Food & Dining', date: subDays(subMonths(now, 3), 20).toISOString() },
    { description: 'Monthly rent payment', amount: 1500.00, category: 'Housing', date: subDays(subMonths(now, 3), 1).toISOString() },

    // 4 months ago
    { description: 'Grocery shopping', amount: 95.50, category: 'Food & Dining', date: subMonths(now, 4).toISOString() },
    { description: 'Car maintenance', amount: 250.00, category: 'Transportation', date: subDays(subMonths(now, 4), 10).toISOString() },
    { description: 'Haircut', amount: 35.00, category: 'Personal Care', date: subDays(subMonths(now, 4), 15).toISOString() },
    { description: 'Concert tickets', amount: 120.00, category: 'Entertainment', date: subDays(subMonths(now, 4), 20).toISOString() },
    { description: 'Monthly rent payment', amount: 1500.00, category: 'Housing', date: subDays(subMonths(now, 4), 1).toISOString() },

    // 5 months ago
    { description: 'Grocery shopping', amount: 102.00, category: 'Food & Dining', date: subMonths(now, 5).toISOString() },
    { description: 'Health insurance', amount: 350.00, category: 'Insurance', date: subDays(subMonths(now, 5), 5).toISOString() },
    { description: 'Textbooks', amount: 180.00, category: 'Education', date: subDays(subMonths(now, 5), 10).toISOString() },
    { description: 'Coffee and snacks', amount: 25.00, category: 'Food & Dining', date: subDays(subMonths(now, 5), 15).toISOString() },
    { description: 'Monthly rent payment', amount: 1500.00, category: 'Housing', date: subDays(subMonths(now, 5), 1).toISOString() },
  ];

  return sampleExpenses.map((expense, index) => ({
    ...expense,
    id: `sample-${index}`,
    createdAt: expense.date,
    updatedAt: expense.date,
  }));
};
