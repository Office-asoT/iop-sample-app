import { useSubmit } from "react-router";
import styles from "./edit-delivery-email-address-form.module.css";

export default function EditDeliveryEmailAddressForm({ deliveryName, emailAddress, id, errors, addFlag, onBlur, onRemove }) {
  const submit = useSubmit();

  const handleBlur = (event) => {
    const { name, value } = event.target;
    onBlur(id, name, value);
  };

  const send_mail = (event, emailAddress) => {
    event.preventDefault();
    const isConfirmed = window.confirm(`「${emailAddress}」にテストメールを送信してもよいですか？`);
    if (!isConfirmed) {
      return;
    }
    submit(
      { "emailAddress": emailAddress },
      { action: "/delivery-email-address/edit", method: "post" }
    );
  }

  return (
    <tr key={id}>
      <td className={`${styles.listTd} ${styles.listTdInput}`}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="deliveryName"
            placeholder="宛先名称を入力してください"
            defaultValue={deliveryName}
            onBlur={handleBlur}>
          </input>
          {errors.deliveryName && <p className={styles.errorMessage}>宛先名称を入力してください。</p>}
        </div>
      </td>
      <td className={`${styles.listTd} ${styles.listTdInput}`}>
        <div className={styles.inputContainer}>
          <input
            type="email"
            name="emailAddress"
            placeholder="メールアドレスを入力してください"
            defaultValue={emailAddress}
            onBlur={handleBlur}>
          </input>
          {errors.emailAddress && <p className={styles.errorMessage}>正しいメールアドレスを入力してください。</p>}
        </div>
      </td>
      <td className={`${styles.listTd} ${styles.textCenter}`}>
        <div>
            <button className={styles.sendMailButton} onClick={(event) => send_mail(event, emailAddress)} disabled={errors.emailAddress}type="button">テスト送信</button>
        </div>
      </td>
      <td className={`${styles.listTd} ${styles.textCenter}`}>
        {addFlag && <div className={`material-icons ${styles.rowDeleteButton}`} onClick={onRemove}>close</div>}
        </td>
    </tr>
  );
}
