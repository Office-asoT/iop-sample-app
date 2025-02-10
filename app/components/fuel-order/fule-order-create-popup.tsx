import { useFetcher } from "react-router";
import { useState, useEffect } from "react";
import styles from "./fule-order-create-popup.module.css";

export default function FuelOrderCreatePopup({ farmFieldList, onClose }) {
  const fetcher = useFetcher();
  const [selectedFarmFieldId, setSelectedFarmFieldId] = useState(farmFieldList[0].id);
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("数量は3桁以内の整数で入力してください。");

  const selectedFarmField = farmFieldList.find((field) => field.id === selectedFarmFieldId) || {};

  const handleOrder = (event) => {
    const isConfirmed = window.confirm(`入力内容で燃料発注を行います。よろしいですか？`);
    if (!isConfirmed) {
      event.preventDefault();
    }
  };

  const handleChange = (event) => {
    setSelectedFarmFieldId(event.target.value);
  };

  const handleQuantityBlur = () => {
    if (!/^[1-9]\d{0,2}$/.test(quantity)) {
      setError("数量は3桁以内の整数で入力してください。");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (fetcher.data?.message) {
      window.alert(fetcher.data.message);
      if (fetcher.data.redirectUrl) {
        onClose()
      }
    }
  }, [fetcher.data]);

  return (
    <>
      <div className={styles.popupOverlay} onClick={onClose}></div>
      <div className={styles.popupContainer}>
        <div className={styles.popupTitleContainer}>
          <div className={styles.popupTitle}>新規発注</div>
          <span className={styles.closeButton} onClick={onClose}>×</span>
        </div>
        <fetcher.Form
          action="/fuel-order/create"
          method="post"
        >
          <input type="hidden" name="userId" value="hoge" />
          <input type="hidden" name="farmFieldName" value={selectedFarmField.name} />
          <div className={styles.farmFieldContainer}>
            <div className={styles.title}>圃場名</div>
            <div className={styles.selectContainer}>
              <select className={styles.select}defaultValue={selectedFarmField} onChange={handleChange} name="farmFieldId">
                {farmFieldList.map((farmField) => (
                  <option key={farmField.id} value={farmField.id}>
                    {farmField.name}
                  </option>
                ))} 
              </select>
            </div>
          </div>
          <div className={styles.fuelOrderTargetJaContainer}>
            <div className={styles.title}>発注依頼JA</div>
            <div className={styles.name}>{selectedFarmField.ja_branch_office_name}</div>
            <input type="hidden" name="jaBranchOfficeName" value={selectedFarmField.ja_branch_office_name} />
            <input type="hidden" name="jaBranchOfficeNumber" value={selectedFarmField.ja_branch_office_number} />
            <input type="hidden" name="jaBranchOfficeEmailAddress" value={selectedFarmField.ja_branch_office_email_address} />
          </div>
          <div className={styles.fuelTypeContainer}>
            <div className={styles.title}>燃料種類</div>
            <div className={styles.selectContainer}>
              <select className={styles.select} defaultValue="灯油" name="fuelType">
                <option value="灯油">灯油</option>
                <option value="重油">重油</option>
              </select>
            </div>
          </div>

          <div className={styles.quantityContainer}>
            <div className={styles.title}>数量</div>
            <div className={styles.name}>
              <input 
                className={styles.quantityInput} 
                name="quantity" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                onBlur={handleQuantityBlur} 
              /> 
              <span className={styles.unit}>L</span>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>
          
          <br />
          <div className={styles.buttonGroup}>
            <button 
              className={`${styles.submitButton} ${styles.baseButton}`}
              type="submit"
              disabled={!!error}
              onClick={(event) => handleOrder(event)}
            >発注する</button>
          </div>
        </fetcher.Form>
      </div>
    </>
  );
};
