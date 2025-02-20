import { Link } from "react-router";

import PageTitle from "./page-title";

import type { To } from "react-router";

import styles from "./page-header.module.css";

interface PageHeaderProps {
  title: string;
  iconName: string;
  linkTo?: To;
  linkText?: string;
  buttonText?: string;
  onClickButton?: () => void;
}

export default function PageHeader({
  title,
  iconName,
  linkTo,
  linkText,
  buttonText,
  onClickButton,
}: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <PageTitle
        title={title}
        iconName={iconName}
      />
      <div className={styles.buttonsArea}>
        {linkTo && linkText && (
          <Link
            className={styles.button}
            to={linkTo}
          >
            {linkText}
          </Link>
        )}
        {buttonText && onClickButton && (
          <button
            className={styles.button}
            onClick={onClickButton}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
