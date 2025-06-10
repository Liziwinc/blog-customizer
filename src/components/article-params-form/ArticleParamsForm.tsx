import { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	ArticleParamsFormProps,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [state, setState] = useState(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	const handleChange = useCallback(
		(key: keyof ArticleStateType) => (option: OptionType) => {
			setState((prev) => ({ ...prev, [key]: option }));
		},
		[]
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(state);
	};

	const handleReset = () => {
		setState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				toggleOpen();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={state.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
						name='radio'
						options={fontSizeOptions}
						title='Размер Шрифта'
					/>
					<Select
						selected={state.fontColor}
						onChange={handleChange('fontColor')}
						options={fontColors}
						title='Цвет Шрифта'
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						onChange={handleChange('backgroundColor')}
						options={backgroundColors}
						title='Цвет Фона'
					/>
					<Select
						selected={state.contentWidth}
						onChange={handleChange('contentWidth')}
						options={contentWidthArr}
						title='Ширина Контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
