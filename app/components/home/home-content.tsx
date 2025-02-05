import styles from "./home-content.module.css";

interface HomeContentProps {
  title: string;
  iconName: string;
  onClickSetting: () => void;
  children: React.ReactNode
}

export default function HomeContent({
  title,
  iconName,
  onClickSetting,
  children,
}: HomeContentProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className="material-icons">{iconName}</span>
        <span>{title}</span>
        <span className="material-icons" onClick={onClickSetting}>settings</span>
      </div>
      {children}
    </div>
  );
}
