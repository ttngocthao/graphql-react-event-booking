import React from "react";
import styles from "./spinner.module.scss";
function Spinner() {
  return (
    <div className={styles.container}>
      <div className={styles.itemWrap}>
        <div className={styles.item}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
