import styles from '../styles/modal.module.css';

interface CodeDetailsProps {
  code: {
    batch: string;
    email: string;
    expires: string;
    status: string;
  };
}

export default function CodeDetails({ code }: CodeDetailsProps) {
  return (
    <div className={styles.codeDetails}>
      <h3>Code Details</h3>
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Batch:</span>
        <span>{code.batch}</span>
      </div>
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Email:</span>
        <span>{code.email}</span>
      </div>
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Expires:</span>
        <span>{code.expires}</span>
      </div>
      <div className={styles.detailRow}>
        <span className={styles.detailLabel}>Status:</span>
        <span className={styles.activeStatus}>{code.status}</span>
      </div>
    </div>
  );
}