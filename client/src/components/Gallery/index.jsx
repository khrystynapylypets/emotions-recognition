import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, map, sortBy } from 'lodash';
import { Button, Pane, Text, PlusIcon, BoxIcon, Spinner } from 'evergreen-ui';

import { useGalleryListLoading } from '../../customHooks/useInitialLoading';
import PrivateLayout from '../Layout/PrivateLayout';
import UploadVideoPanel from '../UploadVideoPanel';
import GalleryItem from './GalleryItem';
import { message } from '../../helpers';

const Gallery = () => {
  const galleryItems = useSelector((state) => state.gallery.list);
  const galleryListIsLoading = useSelector((state) => state.gallery.isLoading);
  const videoIsDeleting = useSelector((state) => state.gallery.isDeleting);

  const [ isUploadVideoPanelVisible, setUploadVideoPanelVisible ] = useState(false);

  useGalleryListLoading();

  const renderContent = () => {
    if (galleryListIsLoading || videoIsDeleting) {
      return (
        <Pane>
          <Spinner marginX='auto' marginY={120} />
        </Pane>
      );
    }

    if (isEmpty(galleryItems)) {
      return (
        <Pane
          display='flex'
          alignItems='center'
          flexDirection='column'
          paddingY={100}
        >
          <BoxIcon
            marginBottom={10}
            color='muted'
            size={30}
          />
          <Text
            size={500}
            color='muted'
          >
            {message('gallery.empty')}
          </Text>
        </Pane>
      );
    }

    const sortedItems = sortBy(galleryItems, 'name');

    return (
      <Pane
        display='flex'
        justifyContent='space-between'
        flexDirection='row'
        flexWrap='wrap'
      >
        {map(sortedItems, (item) => <GalleryItem key={`galleryItem-${item.id}`} {...item} />)}
      </Pane>
    );
  };

  return (
    <PrivateLayout>
      {isUploadVideoPanelVisible && (
        <UploadVideoPanel closePanel={() => setUploadVideoPanelVisible(false)} />
      )}
      <Pane
        width='100%'
        paddingY={25}
        paddingX={150}
        minHeight={500}
      >
        <Pane
          display='flex'
          justifyContent='flex-end'
          marginBottom={50}
        >
          <Button
            appearance='primary'
            intent='success'
            size='large'
            onClick={() => setUploadVideoPanelVisible(true)}
            iconBefore={PlusIcon}
          >
            {message('gallery.buttons.upload')}
          </Button>
        </Pane>
        {renderContent()}
      </Pane>
    </PrivateLayout>
  );
};

export default Gallery;
