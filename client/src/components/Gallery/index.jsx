import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, map, sortBy } from 'lodash';
import { Button, Pane, Text, PlusIcon, BoxIcon, Spinner } from 'evergreen-ui';
import PrivateLayout from '../Layout/PrivateLayout';
import UploadVideoPanel from '../UploadVideoPanel';
import GalleryItem from './GalleryItem';
import galleryActions from '../../redux/actions/gallery';
import { message } from '../../helpers';

const Gallery = () => {
  const dispatch = useDispatch();

  const galleryItems = useSelector((state) => state.gallery.list);
  const galleryListQueriedAt = useSelector((state) => state.gallery.queriedAt);
  const galleryListIsLoading = useSelector((state) => state.gallery.isLoading);
  const videoIsDeleting = useSelector((state) => state.gallery.isDeleting);

  const [ isUploadVideoPanelVisible, setUploadVideoPanelVisible ] = useState(false);

  useEffect(() => {
    // initial loading
    if (!galleryListQueriedAt && !galleryListIsLoading) {
      dispatch(galleryActions.getVideosAction());
    }
  }, [ galleryListQueriedAt ]);

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
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          padding={100}
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
        padding={25}
        minHeight={500}
      >
        <Pane
          display='flex'
          justifyContent='flex-end'
          marginBottom={40}
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
