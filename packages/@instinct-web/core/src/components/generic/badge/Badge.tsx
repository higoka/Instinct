import {BadgeProps} from './';
import React, {useState} from 'react';

export function Badge({badge}: BadgeProps) {
  return (
    <img
      src={`https://images.projectmeteor.online/c_images/album1584/${badge.code}.gif`}
      width={50}
    />
  );
}
