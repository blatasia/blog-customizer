import {useState, CSSProperties} from "react";
import { Article } from "./components/article";
import { ArticleParamsForm } from "./components/article-params-form";
import { defaultArticleState, ArticleStateType } from "./constants/articleProps";
import './styles/index.scss';
import styles from './styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const applyChanges = (newState: ArticleStateType) => {
		setArticleState(newState);
	};

	return (
		<main
			className={styles.main}
			//clsx можно не использовать, если только один селектор передается
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				applyChanges={applyChanges}
			/>
			<Article />
		</main>
	);
};