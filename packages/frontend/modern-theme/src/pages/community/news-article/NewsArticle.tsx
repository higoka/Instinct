import React from 'react';
import './NewsArticle.scss';
import Moment from 'moment';
import {useRoute} from 'wouter';
import {
  Avatar,
  Card,
  Container,
  Column,
  Jumbotron,
  Loading,
  RecentNews,
  UserLayout,
  setURL,
  useFetchArticleByID,
  Skeleton,
} from '@instinct-prj/frontend';

setURL('community/list-articles/:articleID', <NewsArticle />);

export function NewsArticle() {
  const [match, params] = useRoute<{articleID: string}>(
    '/community/news/:articleID'
  );
  const article: any = useFetchArticleByID(params!.articleID);

  return (
    <UserLayout section="article">
      <Loading isLoading={false}>
        <Jumbotron
          className="text-center"
          title={<Skeleton width={400} children={article?.title} />}
          style={{
            backgroundImage: `url('${
              article?.headerImage ??
              'https://images.habbo.com/web_images/habbo-web-articles/lpromo_hween20.png'
            }')`,
            backgroundSize: '100%',
          }}
        >
          {article?.category ? (
            <p>
              {article?.category.name} -{' '}
              {Moment.unix(article?.datePosted || 0).format('MMMM DD, YYYY')}
            </p>
          ) : (
            <Skeleton width={350} isLoading />
          )}
        </Jumbotron>
        <Container>
          <Column side="left">
            <Card>
              {article?.content ? (
                <div
                  dangerouslySetInnerHTML={{__html: article?.content ?? ''}}
                />
              ) : (
                <>
                  <Skeleton height={20} isLoading />
                  <Skeleton height={20} isLoading />
                  <Skeleton height={20} isLoading />
                  <Skeleton height={20} isLoading />
                </>
              )}
              <div className="article-author flex-container flex-vertical-center mt-3">
                <div className="author-image">
                  <Skeleton
                    height={100}
                    width={64}
                    isLoading={!article?.author}
                  >
                    <Avatar look={article?.author?.figure} />
                  </Skeleton>
                </div>
                <div className="author-details ml-2">
                  <div className="author-name">
                    <Skeleton width={250} height={22}>
                      {article?.author?.username}
                    </Skeleton>
                  </div>
                  <div className="author-function">
                    <Skeleton width={250} height={22}>
                      {article?.author?.rank?.name}
                    </Skeleton>
                  </div>
                </div>
              </div>
            </Card>
          </Column>
          <Column side="right">
            <RecentNews />
          </Column>
        </Container>
      </Loading>
    </UserLayout>
  );
}
