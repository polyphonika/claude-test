# Household Expenses Dashboard

A modern, responsive web application for tracking and analyzing household expenses. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Expense Tracking**: Add, edit, and delete expenses with details like description, amount, category, and date
- **13 Expense Categories**: Food & Dining, Transportation, Housing, Utilities, Healthcare, Entertainment, Shopping, Education, Personal Care, Travel, Insurance, Savings & Investments, and Other
- **Advanced Analytics**:
  - Total expenses and average expense calculations
  - Category breakdown pie chart
  - Monthly spending trend line chart
  - Transaction count and category usage statistics
- **Filtering System**: Filter expenses by category, date range, and amount
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: All data is stored locally in your browser
- **Sample Data**: Load demo data to explore features instantly

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Recharts** - Data visualization
- **date-fns** - Date manipulation
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd claude-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Adding Expenses

1. Fill out the expense form at the top of the dashboard
2. Enter description, amount, category, and date
3. Click "Add Expense" to save

### Viewing Analytics

- **Analytics Overview Tab**: View summary statistics and charts
  - Total expenses, average expense, transaction count, and categories used
  - Pie chart showing expense distribution by category
  - Line chart showing monthly spending trends

- **All Expenses Tab**: View a detailed list of all expenses
  - Edit expenses by clicking the pencil icon
  - Delete expenses by clicking the trash icon

### Filtering Expenses

1. Click the "Filters" section to expand filter options
2. Filter by:
   - Category
   - Start and end dates
   - Minimum amount
3. Click "Clear All" to reset filters

### Sample Data

If you're starting fresh, click the "Load Sample Data" button in the header to populate the dashboard with example expenses spanning 6 months.

## Project Structure

```
src/
├── components/          # React components
│   ├── CategoryChart.tsx       # Pie chart for category breakdown
│   ├── ExpenseFilters.tsx      # Filter controls
│   ├── ExpenseForm.tsx         # Form for adding/editing expenses
│   ├── ExpenseList.tsx         # Table of all expenses
│   ├── MonthlyTrendChart.tsx   # Line chart for monthly trends
│   └── StatCard.tsx            # Summary statistic cards
├── types/              # TypeScript type definitions
│   └── expense.ts              # Expense-related types
├── utils/              # Utility functions
│   ├── analytics.ts            # Analytics calculations
│   ├── sampleData.ts           # Sample data generator
│   └── storage.ts              # localStorage operations
├── App.tsx             # Main application component
├── index.css           # Global styles with Tailwind
└── main.tsx            # Application entry point
```

## Data Storage

All expense data is stored in your browser's localStorage under the key `household_expenses`. Data persists between sessions and is never sent to any server.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
