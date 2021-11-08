import React from 'react';
import { find } from 'lodash';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ReactPlayer from 'react-player';
import { Pane, Heading, Paragraph, Spinner } from 'evergreen-ui';
import { envVariables } from '../../../configurations';

import { useGalleryListLoading } from '../../../customHooks/useInitialLoading';

const MainInfo = () => {
  const { id } = useParams();
  const galleryList = useSelector((state) => state.gallery.list);
  const galleryListIsLoading = useSelector((state) => state.gallery.isLoading);

  const videoDetails = find(galleryList, { id });

  useGalleryListLoading();

  if (galleryListIsLoading) {
    return (
      <Pane>
        <Spinner marginX='auto' marginY={120} />
      </Pane>
    );
  }

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
