'use client';
import { useState, useRef } from 'react';
import styles from './styles/modal.module.css';

export default function GenerateCodePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codes, setCodes] = useState(['AK-WD12-X7Y9Z', 'AK-WD12-H2K4M']);
  const [formData, setFormData] = useState({
    batch: 'Web Development - Batch 12',
    email: 'user@example.com',
    expiryDate: '10/05/2025',
    numCodes: 1
  });
  const datePickerRef = useRef<HTMLInputElement>(null);

  const generateCode = () => {
    const batchNum = formData.batch.match(/\d+/)?.[0] || '12';
    const random = Math.random().toString(36).substring(2,7).toUpperCase();
    return `AK-WD${batchNum}-${random}`;
  };

  const handleGenerate = () => {
    const newCodes = Array.from({length: formData.numCodes}, generateCode);
    setCodes([...codes, ...newCodes]);
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateFocus = () => {
    setShowDatePicker(true);
    dateInputRef.current?.showPicker();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split('-');
    setFormData({...formData, expiryDate: `${day}/${month}/${year}`});
    setShowDatePicker(false);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className={styles.openButton}>
        Generate Access Codes
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button 
              onClick={() => setIsModalOpen(false)} 
              className={styles.closeButton}
            >
              &times;
            </button>
            
            <h2 className={styles.title}>Generate Access Codes</h2>
            <div className={styles.divider}></div>
            
            <div className={styles.columnsContainer}>
              <div className={styles.leftColumn}>
                <div className={styles.inputGroup}>
                  <label>Select Batch</label>
                  <select 
                    value={formData.batch}
                    onChange={(e) => setFormData({...formData, batch: e.target.value})}
                    className={styles.select}
                  >
                    <option>Web Development - Batch 12</option>
                    <option>Data Science - Batch 5</option>
                  </select>
                </div>
                          
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
                  <div className={styles.dateInputWrapper}>
                    <input
                      type="date"
                      ref={dateInputRef}
                      onChange={handleDateChange}
                      className={styles.hiddenDateInput}
                    />
                  </div>
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

              <div className={styles.rightColumn}>
                <div className={styles.codesSection}>
                  <h3 className={styles.sectionTitle}>Generated Access Codes</h3>
                  <div className={styles.codeList}>
                    {codes.map((code, i) => (
                      <div key={i} className={styles.codeItem}>{code}</div>
                    ))}
                  </div>
                </div>
                
                <div className={styles.detailsSection}>
                  <h3 className={styles.sectionTitleCodeDetails}>Code Details</h3>
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

            <div className={styles.divider}></div>
            
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