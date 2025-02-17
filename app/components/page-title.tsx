import styles from "./page-title.module.css";

interface PageTitleProps {
  title: string;
  iconName: string;
}

export default function PageTitle({
  title,
  iconName,
}: PageTitleProps) {
  return (
    <div className={styles.title}>
      <span className={`material-icons ${styles.titleItemIcon}`}>{iconName}</span>
      <span>{title}</span>
    </div>);
}
