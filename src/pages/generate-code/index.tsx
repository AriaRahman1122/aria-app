'use client';
import { useState } from 'react';
import styles from './styles/modal.module.css';

export default function GenerateCodePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codes, setCodes] = useState(['AK-WD12-XYY9Z', 'AK-WD12-H2K4M']);
  const [formData, setFormData] = useState({
    batch: 'Web Development - Batch 12',
    email: 'user@example.com',
    expiryDate: '10/05/2025',
    numCodes: 1
  });

  const generateCode = () => {
    const batchNum = formData.batch.match(/\d+/)?.[0] || '12';
    const random = Math.random().toString(36).substring(2,7).toUpperCase();
    return `AK-WD${batchNum}-${random}`;
  };

  const handleGenerate = () => {
    const newCodes = Array.from({length: formData.numCodes}, generateCode);
    setCodes([...codes, ...newCodes]);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className={styles.openButton}>
        Generate Access Codes
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h1 className={styles.title}>Generate Access Codes</h1>
            
            <div className={styles.columnsContainer}>
              {/* Left Column - Form */}
              <div className={styles.leftColumn}>
                <h2 className={styles.sectionTitle}>Select Batch</h2>
                <select 
                  value={formData.batch}
                  onChange={(e) => setFormData({...formData, batch: e.target.value})}
                  className={styles.select}
                >
                  <option>Web Development - Batch 12</option>
                  <option>Data Science - Batch 5</option>
                </select>
                
                <div className={styles.inputGroup}>
                  <label>User Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length > 2) value = value.slice(0,2) + '/' + value.slice(2);
                      if (value.length > 5) value = value.slice(0,5) + '/' + value.slice(5,9);
                      setFormData({...formData, expiryDate: value});
                    }}
                    placeholder="dd/mm/yyyy"
                    maxLength={10}
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Number of Codes</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.numCodes}
                    onChange={(e) => setFormData({...formData, numCodes: Number(e.target.value) || 1})}
                  />
                </div>
                
                <button 
                  onClick={handleGenerate}
                  className={styles.generateButton}
                >
                  Generate Code
                </button>
              </div>

              {/* Right Column - Codes and Details */}
              <div className={styles.rightColumn}>
                <div className={styles.codesSection}>
                  <h2 className={styles.sectionTitle}>Generated Access Codes</h2>
                  <div className={styles.codeList}>
                    {codes.map((code, i) => (
                      <div key={i} className={styles.codeItem}>{code}</div>
                    ))}
                  </div>
                </div>
                
                <div className={styles.detailsSection}>
                  <h2 className={styles.sectionTitle}>Code Details</h2>
                  <div className={styles.detailRow}>
                    <span>Batch:</span>
                    <span>{formData.batch}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Email:</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Expires:</span>
                    <span>{new Date(formData.expiryDate.split('/').reverse().join('-')).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span>Status:</span>
                    <span className={styles.activeStatus}>Active</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.buttonGroup}>
              <button 
                onClick={() => setIsModalOpen(false)}
                className={styles.secondaryButton}
              >
                Close
              </button>
              <button className={styles.primaryButton}>
                Save Codes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}