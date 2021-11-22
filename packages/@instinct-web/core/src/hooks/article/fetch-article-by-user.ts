import {useEffect, useState} from 'react';
import {Article} from '@instinct-prj/interface';
import {articleService} from '../../services/article';

export function useFetchArticleByUser(
  userID?: number,
  refresh = 0
): Article[] | undefined {
  const [articles, setArticles] = useState<Article[]>();

  useEffect(() => {
    setArticles(undefined);

    async function fetchArticle() {
      const newsArticles = await articleService.getByUser(userID!);
      setArticles(newsArticles);
    }

    if (userID) fetchArticle();
  }, [userID, refresh]);

  return articles;
}
