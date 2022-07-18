import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const VideoCard = ({peer}) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', (stream) => {
        console.log(stream)
      ref.current.srcObject = stream;
    });
    peer.on('track', (track, stream) => {
        console.log(track)
    });
  }, [peer]);

  return (
    <Video
      playsInline
      autoPlay
      ref={ref}
    />
  );
};

const Video = styled.video``;

export default VideoCard;
