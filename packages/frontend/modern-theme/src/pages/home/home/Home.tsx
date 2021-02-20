import React from 'react';
import {
  Container,
  Column,
  UserLayout,
  setURL,
  RecentNews,
  MyProfile,
} from '@instinct-prj/frontend';

setURL('home', <Home />);

export function Home() {
  return (
    <UserLayout>
      <HomePage />
    </UserLayout>
  );
}

export function HomePage() {
  return (
    <Container>
      <Column side="left">
        <MyProfile />
      </Column>
      <Column side="right">
        <RecentNews />
      </Column>
    </Container>
  );
}
