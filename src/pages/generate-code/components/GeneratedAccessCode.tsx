'use client';
import { useState } from 'react';
import styles from '../styles/modal.module.css';

interface GenerateFormProps {
  onGenerate: (code: string) => void;
}

export default function GenerateForm({ onGenerate }: GenerateFormProps) {
  const [formData, setFormData] = useState({
    batch: 'Web Development - Batch 12',
    email: '',
    expiryDate: '',
    numCodes: 1
  });

  const generateCode = () => {
    const batchNumber = formData.batch.match(/\d+/)?.[0] || '12';
    const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `AK-WD${batchNumber}-${randomChars}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = generateCode();
    onGenerate(newCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Batch</label>
        <select
          value={formData.batch}
          onChange={(e) => setFormData({...formData, batch: e.target.value})}
        >
          <option>Web Development - Batch 12</option>
          <option>Data Science - Batch 5</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>User Email</label>
        <input
          type="email"
          placeholder="Enter email address"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Expiry Date</label>
        <input
          type="text"
          placeholder="dd/mm/yyyy"
          value={formData.expiryDate}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) value = value.substring(0, 2) + '/' + value.substring(2);
            if (value.length > 5) value = value.substring(0, 5) + '/' + value.substring(5, 9);
            setFormData({...formData, expiryDate: value});
          }}
          maxLength={10}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Number of Codes</label>
        <input
          type="number"
          min="1"
          value={formData.numCodes}
          onChange={(e) => setFormData({...formData, numCodes: Number(e.target.value)})}
        />
      </div>

      <button type="submit" className={styles.generateButton}>
        Generate Code
      </button>
    </form>
  );
}