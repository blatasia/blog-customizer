import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';

import styles from './ArticleParamsForm.module.scss';

import React, { useState, useRef, useEffect } from 'react';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	applyChanges: (newState: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	articleState,
	applyChanges,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [backgroundColor, setBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleButtonArrowClick = () => {
		setIsOpen(!isOpen);
	};

	const handleFontChange = (selectedOption: OptionType) => {
		setFontFamily(selectedOption);
	};

	const handleFontSizeChange = (selectedOption: OptionType) => {
		setFontSize(selectedOption);
	};

	const handleFontColorChange = (selectedOption: OptionType) => {
		setFontColor(selectedOption);
	};

	const handleBackgroundColorChange = (selectedOption: OptionType) => {
		setBackgroundColor(selectedOption);
	};

	const handleContentWidthChange = (selectedOption: OptionType) => {
		setContentWidth(selectedOption);
	};

	const handleFormReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setFontSize(defaultArticleState.fontSizeOption);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	const handleApplyChanges = () => {
		const newState = {
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			fontSizeOption: fontSize,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		};
		applyChanges(newState);
	};

	useEffect(() => {
		const handleClickOverlay = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOverlay);
		return () => {
			document.removeEventListener('mousedown', handleClickOverlay);
		};
	}, []);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleButtonArrowClick} />
			<aside
				ref={sidebarRef}
				className={`${styles.container}
				${isOpen ? styles.container_open : ''}`}>
				<form className={styles.form}>
					<Text
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase
						align='left'>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						onChange={handleFontChange}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						name='font-size'
						selected={fontSize}
						onChange={handleFontSizeChange}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={fontColor}
						onChange={handleFontColorChange}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						onChange={handleBackgroundColorChange}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleFormReset} />
						<Button
							title='Применить'
							type='button'
							onClick={handleApplyChanges}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
