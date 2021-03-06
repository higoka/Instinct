import React from 'react';
import {take} from 'lodash';
import Draggable from 'react-draggable';
import {Card} from '@instinct-prj/frontend';
import {UserProfileWidgetProps} from '../';
import {GroupContainer} from './group-container';

export function Groups({profile}: UserProfileWidgetProps) {
  return (
    <Draggable>
      <Card header="Groups">
        <div className="items-container">
          {profile?.groups.length === 0 && (
            <p>{profile.user?.username} hasn't joined any groups</p>
          )}
          {take(profile?.groups, 5).map(group => (
            <div className="item-container" key={group.id}>
              <GroupContainer group={group} />
            </div>
          ))}
        </div>
      </Card>
    </Draggable>
  );
}
