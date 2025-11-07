'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString()
    };

    setExpenses([newExpense, ...expenses]);
    setDescription('');
    setAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Expenses</h1>

        <div className={styles.totalBox}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalAmount}>${total.toFixed(2)}</span>
        </div>

        <form onSubmit={addExpense} className={styles.form}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Add</button>
        </form>

        <div className={styles.list}>
          {expenses.map(expense => (
            <div key={expense.id} className={styles.expense}>
              <div className={styles.expenseInfo}>
                <span className={styles.expenseDesc}>{expense.description}</span>
                <span className={styles.expenseDate}>
                  {new Date(expense.date).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.expenseRight}>
                <span className={styles.expenseAmount}>${expense.amount.toFixed(2)}</span>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className={styles.deleteBtn}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
