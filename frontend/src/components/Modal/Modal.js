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
}) {
  return (
    <div className={styles.layout}>
      <div className={styles.modalWrap}>
        <h2 className={styles.title}>{title}</h2>
        <section className={styles.body}>{children}</section>
        <div className={styles.btnWrap}>
          {canCanel && <button onClick={cancelHandler}>Cancel</button>}
          {canConfirm && <button onClick={submitHandler}>Confirm</button>}
        </div>
      </div>
    </div>
  );
}
Modal.propTypes = {
  title: PropTypes.string,
  canCanel: PropTypes.bool,
  canConfirm: PropTypes.bool,
  children: PropTypes.element,
  cancelHandler: PropTypes.func,
  submitHandler: PropTypes.func,
};
export default Modal;