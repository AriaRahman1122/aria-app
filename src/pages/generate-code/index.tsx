"use client";
import { useState, useRef } from "react";
import modalStyles from '@styles/modal.module.css';
import pageStyles from '@styles/generateAccessCodePage.module.css';
import { FiMail, FiCheck } from "react-icons/fi";
import { FaCopy, FaRegFilePdf } from "react-icons/fa6";

export default function GenerateCodePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codes, setCodes] = useState(["AK-WD12-X7Y9Z"]);
  const [formData, setFormData] = useState({
    batch: "Web Development - Batch 12",
    email: "user@example.com",
    expiryDate: "10/05/2025",
    numCodes: 1,
  });
  const datePickerRef = useRef<HTMLInputElement>(null);

  const generateCode = () => {
    const batchNum = formData.batch.match(/\d+/)?.[0] || "12";
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `AK-WD${batchNum}-${random}`;
  };

  const handleGenerate = () => {
    const newCodes = Array.from({ length: formData.numCodes }, generateCode);
    setCodes([...codes, ...newCodes]);
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateFocus = () => {
    setShowDatePicker(true);
    dateInputRef.current?.showPicker();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split("-");
    setFormData({ ...formData, expiryDate: `${day}/${month}/${year}` });
    setShowDatePicker(false);
  };

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllCodes = () => {
    navigator.clipboard.writeText(codes.join("\n"));
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  const downloadPDF = () => {
    // PDF generation logic would go here
    alert("PDF download functionality would be implemented here");
  };

  const sendEmail = () => {
    // Email sending logic would go here
    alert("Email sending functionality would be implemented here");
  };

  const [selectedCode, setSelectedCode] = useState<{
    batch: string;
    email: string;
    expires: string;
    status: string;
  } | null>(null);

  // Fungsi untuk handle ketika code di klik
  const handleCodeClick = (code: string) => {
    const today = new Date();
  
    const [day, month, year] = formData.expiryDate.split('/').map(Number);
    const expiry = new Date(year, month - 1, day); // month - 1 karena bulan dimulai dari 0
  
    const status = expiry >= today ? "Active" : "Inactive";
  
    setSelectedCode({
      batch: formData.batch,
      email: formData.email,
      expires: formData.expiryDate,
      status: status
    });
  };
  

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className={pageStyles.openButton}
      >
        Generate Access Codes
      </button>

      {isModalOpen && (
        <div className={modalStyles.modalOverlay}>
          <div className={modalStyles.modal}>
            <button
              onClick={() => setIsModalOpen(false)}
              className={modalStyles.closeButton}
            >
              &times;
            </button>

            <h2 className={modalStyles.modalTitle}>Generate Access Codes</h2>
            <div className={modalStyles.modalDivider}></div>

            <div className={modalStyles.modalColumns}>
              <div className={modalStyles.modalLeftColumn}>
                <div className={pageStyles.inputGroup}>
                  <label>Select Batch</label>
                  <select
                    value={formData.batch}
                    onChange={(e) =>
                      setFormData({ ...formData, batch: e.target.value })
                    }
                    className={pageStyles.select}
                  >
                    <option>Web Development - Batch 12</option>
                    <option>Data Science - Batch 5</option>
                  </select>
                </div>

                <div className={pageStyles.inputGroup}>
                  <label>User Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter email address"
                  />
                </div>

                <div className={pageStyles.inputGroup}>
                  <label>Expiry Date</label>
                  <div>
                    <input
                      type="date"
                      ref={dateInputRef}
                      onChange={handleDateChange}
                    />
                  </div>
                </div>

                <div className={pageStyles.inputGroup}>
                  <label>Number of Codes</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.numCodes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numCodes: Number(e.target.value) || 1,
                      })
                    }
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  className={pageStyles.generateButton}
                >
                  Generate Code
                </button>
              </div>

              <div className={modalStyles.modalRightColumn}>
              <div className={pageStyles.generatedAccessCodeBox}>
                  <div className={pageStyles.codesHeader}>
                    <h3 className={pageStyles.sectionTitle}>
                      Generated Access Codes
                    </h3>
                    <div className={pageStyles.codeActions}>
                      <button
                        onClick={copyAllCodes}
                        className={pageStyles.actionButton}
                        title="Copy All"
                      >
                        {allCopied ? <FiCheck /> : <FaCopy />}
                      </button>
                      <button
                        onClick={downloadPDF}
                        className={pageStyles.actionButton}
                        title="Download PDF"
                      >
                        <FaRegFilePdf />
                      </button>
                      <button
                        onClick={sendEmail}
                        className={pageStyles.actionButton}
                        title="Send email"
                      >
                        <FiMail />
                      </button>
                    </div>
                  </div>

                  <div className={pageStyles.codeList}>
                    {codes.map((code, i) => (
                      <div 
                        key={i} 
                        className={pageStyles.codeItem}
                        onClick={() => handleCodeClick(code)} // Tambahkan onClick handler
                        style={{ cursor: 'pointer' }} // Ubah cursor saat hover
                      >
                        <span className={pageStyles.codeText}>{code}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Mencegah event bubbling
                            copyCode(code, i);
                          }}
                          className={pageStyles.copyButton}
                          title="Copy code"
                        >
                          {copiedIndex === i ? <FiCheck /> : <FaCopy />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Details Section - hanya muncul jika ada selectedCode */}
                {selectedCode && (
                  <div className={pageStyles.codeDetailsBox}>
                    <h3 className={pageStyles.sectionTitleCodeDetails}>
                      Code Details
                    </h3>
                    <div className={pageStyles.detailRow}>
                      <span>Batch:</span>
                      <span>{selectedCode.batch}</span>
                    </div>
                    <div className={pageStyles.detailRow}>
                      <span>Email:</span>
                      <span>{selectedCode.email}</span>
                    </div>
                    <div className={pageStyles.detailRow}>
                      <span>Expires:</span>
                      <span>
                        {new Date(
                          selectedCode.expires.split("/").reverse().join("-")
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className={pageStyles.detailRow}>
                    <span>Status:</span>
                    <span
                      className={
                        selectedCode.status === "Inactive"
                          ? pageStyles.inactiveStatus
                          : pageStyles.activeStatus
                      }
                    >
                      {selectedCode.status}
                    </span>
                  </div>
                  </div>
                )}
              </div>
            </div>

            <div className={modalStyles.modalDivider}></div>

            <div className={modalStyles.modalButtonGroup}>
              <button
                onClick={() => setIsModalOpen(false)}
                className={modalStyles.secondaryButton}
              >
                Close
              </button>
              <button className={modalStyles.primaryButton}>Save Codes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
