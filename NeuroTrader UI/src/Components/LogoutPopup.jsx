import "../Styles/LogoutPopup.css";

// Usage:
// <LogoutPopup open={isOpen} onConfirm={handleYes} onCancel={handleNo} />

export default function LogoutPopup({ open, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="lp-overlay" role="dialog" aria-modal="true" aria-labelledby="lp-title">
      <div className="lp-modal">
        <h2 id="lp-title" className="lp-title">Are you sure you want to logout?</h2>

        <p className="lp-text">This will sign you out of your account.</p>

        <div className="lp-actions">
          <button
            className="lp-btn lp-btn-yes"
            onClick={onConfirm}
            type="button"
          >
            Yes
          </button>

          <button
            className="lp-btn lp-btn-no"
            onClick={onCancel}
            type="button"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
