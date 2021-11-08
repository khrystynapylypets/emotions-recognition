import React from 'react';
import { find } from 'lodash';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ReactPlayer from 'react-player';
import { Pane, Heading, Paragraph } from 'evergreen-ui';
import { envVariables } from '../../../configurations';

const MainInfo = () => {
  const { id } = useParams();
  const galleryList = useSelector((state) => state.gallery.list);
  const videoDetails = find(galleryList, { id });

  if (!videoDetails) {
    return (
      <Paragraph>Cannot find content.</Paragraph>
    );
  }

  const { url, name, description } = videoDetails;

  return (
    <Pane>
      <ReactPlayer
        url={`${envVariables.API_URL}/${url}`}
        controls
        width='80%'
      />
      <Heading
        size={600}
        marginTop={40}
        marginBottom={15}
      >
        {name}
      </Heading>
      <Paragraph>{description}</Paragraph>
    </Pane>
  );
};

export default MainInfo;
