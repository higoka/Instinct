import React from 'react';
import {
  Card,
  Container,
  Column,
  Jumbotron,
  Row,
  UserContainer,
  UserLayout,
  setURL,
  Skeleton,
  useFetchStaffTeam,
} from '@instinct-prj/frontend';

setURL('community/staff', <Staff />);

export function Staff() {
  const staff = useFetchStaffTeam();

  return (
    <UserLayout section="community_team">
      <Jumbotron title="Staff Team">
        <p>
          These volunteer players represent the official team and are
          responsible for maintaining order and security inside the hotel.
        </p>
      </Jumbotron>
      <Container>
        <Row>
          <Column side="left">
            <div className="members-container">
              {staff !== undefined ? (
                staff!.map(rank => (
                  <Card key={rank.id} header={rank.name}>
                    {rank.users!.map(user => (
                      <div key={user.id} className="mt-2">
                        <UserContainer user={user} />
                      </div>
                    ))}
                  </Card>
                ))
              ) : (
                <>
                  <Card header="Staff">
                    <div className="row">
                      <div className="col-2">
                        <Skeleton circle height={100} width={100} />
                      </div>
                      <div className="col-8">
                        <div className="mt-3">
                          <Skeleton width={200} height={20} />
                          <br />
                          <Skeleton width={200} height={20} />
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              )}
            </div>
          </Column>
        </Row>
      </Container>
    </UserLayout>
  );
}
