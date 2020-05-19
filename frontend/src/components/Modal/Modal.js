import React from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.scss";
function Modal({
  title,
  canCanel,
  canConfirm,
  children,
  cancelHandler,
  submitHandler,
  confirmText,
  cancelText,
}) {
  return (
    <div className={styles.layout}>
      <div className={styles.modalWrap}>
        <h2 className={styles.title}>{title}</h2>
        <section className={styles.body}>{children}</section>
        <div className={styles.btnWrap}>
          {canCanel && (
            <button onClick={cancelHandler}>
              {cancelText ? cancelText : "Cancel"}
            </button>
          )}
          {canConfirm && (
            <button onClick={submitHandler}>
              {confirmText ? confirmText : "Confirm"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
Modal.propTypes = {
  title: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  canCanel: PropTypes.bool,
  canConfirm: PropTypes.bool,
  children: PropTypes.array,
  cancelHandler: PropTypes.func,
  submitHandler: PropTypes.func,
};
export default Modal;
