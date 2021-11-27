import {random} from 'lodash';
import {Col} from 'reactstrap';
import React, {useState} from 'react';
import {Icon} from '@instinct-web/core';
import {Card} from '../../components/card/Card';

const YOUTUBE_IDS = [
  'NkRkuI0ZgX0',
  'UoG4vGyniVI',
  'GQugkwnjFJM',
  'DZiaXEIQgkE',
  'ZAR49HnDo5c',
  'AnycCuYSW7A',
  '7cPhKwRF4oY',
  'VFbGOW5zbnY',
  'scqKIsRLILo',
  'YRCmmJZRyJs',
];

export function SalvatoreCard() {
  const [randomVideo, setRandomVideo] = useState(YOUTUBE_IDS[0]);

  function changeVideo() {
    const randomIndex = random(0, YOUTUBE_IDS.length);
    const randomYoutubeVideo = YOUTUBE_IDS[randomIndex];
    setRandomVideo(randomYoutubeVideo);
  }

  function getHeader() {
    return (
      <div className="row">
        <div className="col-6">Sponsored Video</div>
        <div className="col-6 text-right">
          <div style={{cursor: 'pointer'}} onClick={changeVideo}>
            <Icon type="sync" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <Col xs={8}>
        <Card style={{height: '100%'}} header={getHeader()}>
          <iframe
            width="100%"
            height={500}
            src={`https://www.youtube-nocookie.com/embed/${randomVideo}?controls=0&autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Card>
      </Col>
      <Col xs={4}>
        <Card
          style={{height: '100%'}}
          header={
            <>
              Instinct<b>RP</b>
            </>
          }
        >
          <p>We have been given a rare blessing from Salvatore himself</p>
          <img src="https://i.makeagif.com/media/7-24-2021/rQniTW.gif" />
          <p>"I am Salvatore Ganacci"</p>
          <p className="text-right">-Salvatore Ganacci</p>
        </Card>
      </Col>
    </div>
  );
}
