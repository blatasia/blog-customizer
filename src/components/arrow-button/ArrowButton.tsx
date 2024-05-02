// ArrowButton.tsx
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

export interface ArrowButtonProps {
	isOpen?: boolean;
	onClick?: () => void;
}

export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}
			/>
		</div>
	);
};
