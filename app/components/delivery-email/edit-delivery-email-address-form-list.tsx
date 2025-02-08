import { useState } from "react";
import { Form, Link } from "react-router";
import EditDeliveryEmailAddressFrom from "~/components/delivery-email/edit-delivery-email-address-form";

import styles from "./edit-delivery-email-address-form-list.module.css";
import { v4 as uuidv4 } from "uuid";

export default function EditDeliveryEmailAddressFormList({ deliveryEmailAddresses }) {

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const [emailList, setEmailList] = useState(
    deliveryEmailAddresses.map((item) => ({
      deliveryName: item.delivery_name,
      emailAddress: item.email_address,
      id: uuidv4(),
      errors: { deliveryName: item.delivery_name === "", emailAddress: !validateEmail(item.email_address) },
      addFlag: false
    }))
  );

  const isSaveDisabled = emailList.some((item) => item.errors.deliveryName || item.errors.emailAddress);

  const handleAdd = () => {
    setEmailList((prevList) => [
      ...prevList,
      { 
        deliveryName: "",
        emailAddress: "",
        id: uuidv4(),
        errors: { deliveryName: true, emailAddress: true },
        addFlag: true
      }
    ]);
  };

  const handleRemove = (id) => {
    setEmailList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const handleBlur = (id, field, value) => {
    const hasError = field === "deliveryName" ? value.trim() === "" : !validateEmail(value);
    setEmailList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? { ...item, [field]: value, errors: { ...item.errors, [field]: hasError } } 
          : item
      )
    );
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <div className={styles.title}>アドレス一覧</div>
      </div>
      <div className={styles.listContainer}>
        <Form 
          action="/delivery-email-address/upsert"
          method="post"
          >
          <table className={styles.list}>
            <thead>
              <tr className={styles.listTr}>
                <th className={styles.listTh}>宛先名称</th>
                <th className={styles.listTh}>配信先メールアドレス</th>
                <th className={`${styles.listTh} ${styles.textCenter}`}>テスト送信</th>
                <th className={`${styles.listTh} ${styles.textCenter}`}>削除</th>
              </tr>
            </thead>
            <tbody>
              {emailList.map(({ deliveryName, emailAddress, id, errors, addFlag}) => (
                <EditDeliveryEmailAddressFrom 
                  key={id}
                  id={id}
                  deliveryName={deliveryName} 
                  emailAddress={emailAddress} 
                  errors={errors}
                  addFlag = {addFlag}
                  onBlur={handleBlur}
                  onRemove={() => handleRemove(id)}
                />
              ))}
            </tbody>
          </table>
          <div className={styles.addButtonContainer}><button className={`${styles.addButton} ${styles.baseButton}`} type="button" onClick={handleAdd}>新規追加</button></div>
          <div className={styles.buttonContainer}>
            <button className={`${styles.submitButton} ${styles.baseButton}`} type="submit" disabled={isSaveDisabled}>保存する</button>
            <Link className={`${styles.cancelButton} ${styles.baseButton}`} to="/delivery-email-address/">キャンセル</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
