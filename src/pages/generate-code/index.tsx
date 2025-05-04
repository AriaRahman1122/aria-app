"use client";
import { useState, useRef } from "react";
import modalStyles from "@styles/modal.module.css";
import pageStyles from "@styles/generateAccessCodePage.module.css";
import { FiMail, FiCheck } from "react-icons/fi";
import { FaCopy, FaRegFilePdf } from "react-icons/fa6";

interface CodeData {
  id: string;
  code: string;
  batch: string;
  email: string;
  expiryDate: string;
  status: string;
  generatedAt: Date;
}

export default function GenerateCodePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codes, setCodes] = useState<CodeData[]>([]);

  const [formData, setFormData] = useState({
    batch: "",
    email: "",
    expiryDate: "",
    numCodes: 1,
  });

  const [formErrors, setFormErrors] = useState({
    batch: false,
    email: false,
    expiryDate: false,
  });

  const batchOptions = [
    "Web Development - Batch 12",
    "Data Science - Batch 5",
  ];

  const [selectedCode, setSelectedCode] = useState<CodeData | null>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const validateForm = () => {
    const errors = {
      batch: !formData.batch,
      email: !formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      expiryDate: !formData.expiryDate,
    };
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const generateCode = (): CodeData => {
    const batchNum = formData.batch.match(/\d+/)?.[0] || "XX";
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    const code = `AK-WD${batchNum}-${random}`;

    const today = new Date();
    const [day, month, year] = formData.expiryDate.split("/").map(Number);
    const expiry = new Date(year, month - 1, day);

    return {
      id: Date.now().toString(),
      code,
      batch: formData.batch,
      email: formData.email,
      expiryDate: formData.expiryDate,
      status: expiry >= today ? "Active" : "Inactive",
      generatedAt: new Date(),
    };
  };

  const handleGenerate = () => {
    if (!validateForm()) return;
    const newCodes = Array.from({ length: formData.numCodes }, generateCode);
    setCodes((prev) => [...prev, ...newCodes]);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split("-");
    setFormData({ ...formData, expiryDate: `${day}/${month}/${year}` });
    setFormErrors((prev) => ({ ...prev, expiryDate: false }));
  };

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllCodes = () => {
    const allCodesText = codes.map((c) => c.code).join("\n");
    navigator.clipboard.writeText(allCodesText);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  const downloadPDF = () => {
    alert("PDF download functionality would be implemented here");
  };

  const sendEmail = () => {
    alert("Email sending functionality would be implemented here");
  };

  const handleCodeClick = (codeData: CodeData) => {
    setSelectedCode(codeData);
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
                  <label>Select Batch *</label>
                  <select
                    value={formData.batch}
                    onChange={(e) => {
                      setFormData({ ...formData, batch: e.target.value });
                      setFormErrors((prev) => ({ ...prev, batch: false }));
                    }}
                    className={`${pageStyles.select} ${formErrors.batch ? pageStyles.error : ""}`}
                  >
                    <option value="">-- Select Batch --</option>
                    {batchOptions.map((batch, index) => (
                      <option key={index} value={batch}>{batch}</option>
                    ))}
                  </select>
                  {formErrors.batch && <span className={pageStyles.errorMessage}>Please select a batch</span>}
                </div>

                <div className={pageStyles.inputGroup}>
                  <label>User Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setFormErrors((prev) => ({ ...prev, email: false }));
                    }}
                    placeholder="user@example.com"
                    className={formErrors.email ? pageStyles.error : ""}
                  />
                  {formErrors.email && <span className={pageStyles.errorMessage}>Please enter a valid email</span>}
                </div>

                <div className={pageStyles.inputGroup}>
                  <label>Expiry Date *</label>
                  <input
                    type="date"
                    ref={dateInputRef}
                    onChange={handleDateChange}
                    className={formErrors.expiryDate ? pageStyles.error : ""}
                  />
                  {formErrors.expiryDate && <span className={pageStyles.errorMessage}>Please select an expiry date</span>}
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
                        numCodes: Math.max(1, Number(e.target.value)),
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
                    <h3 className={pageStyles.sectionTitle}>Generated Access Codes</h3>
                    <div className={pageStyles.codeActions}>
                      <button
                        onClick={copyAllCodes}
                        className={pageStyles.actionButton}
                        title="Copy All"
                        disabled={codes.length === 0}
                      >
                        {allCopied ? <FiCheck /> : <FaCopy />}
                      </button>
                      <button
                        onClick={downloadPDF}
                        className={pageStyles.actionButton}
                        title="Download PDF"
                        disabled={codes.length === 0}
                      >
                        <FaRegFilePdf />
                      </button>
                      <button
                        onClick={sendEmail}
                        className={pageStyles.actionButton}
                        title="Send email"
                        disabled={codes.length === 0}
                      >
                        <FiMail />
                      </button>
                    </div>
                  </div>

                  <div className={pageStyles.codeListContainer}>
                    <div className={pageStyles.codeList}>
                      {codes.map((codeData, i) => (
                        <div
                          key={codeData.id}
                          className={pageStyles.codeItem}
                          onClick={() => handleCodeClick(codeData)}
                          style={{ cursor: "pointer" }}
                        >
                          <span className={pageStyles.codeText}>{codeData.code}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyCode(codeData.code, i);
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
                </div>

                {selectedCode && (
                  <div className={pageStyles.codeDetailsBox}>
                    <h3 className={pageStyles.sectionTitleCodeDetails}>Code Details</h3>
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
                      <span>{
                        new Date(
                          selectedCode.expiryDate.split("/").reverse().join("-")
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      }</span>
                    </div>
                    <div className={pageStyles.detailRow}>
                      <span>Status:</span>
                      <span
                        className={
                          selectedCode.status === "Active"
                            ? pageStyles.activeStatus
                            : pageStyles.inactiveStatus
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
              <button
                className={modalStyles.primaryButton}
                disabled={codes.length === 0}
              >
                Save Codes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}