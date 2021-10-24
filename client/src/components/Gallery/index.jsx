import React, { useState } from 'react';
import { Button, Heading, Pane, Text } from 'evergreen-ui';
import PrivateLayout from '../Layout/PrivateLayout';
import UploadVideoPanel from '../UploadVideoPanel';
import theme from '../../utils/theme';
import { message } from '../../helpers';

const Gallery = () => {
  const [ isUploadVideoPanelVisible, setUploadVideoPanelVisible ] = useState(false);

  return (
    <PrivateLayout>
      {isUploadVideoPanelVisible && (
        <UploadVideoPanel closePanel={() => setUploadVideoPanelVisible(false)} />
      )}
      <Pane
        padding={25}
        background={theme.panelColor}
        width='100%'
        minHeight={500}
      >
        <Pane
          display='flex'
          justifyContent='space-between'
          marginBottom={30}
        >
          <Heading size={600} color={theme.textColor}>
            {message('gallery.title')}
          </Heading>
          <Button
            appearance='primary'
            intent='success'
            onClick={() => setUploadVideoPanelVisible(true)}
          >
            {message('gallery.buttons.upload')}
          </Button>
        </Pane>
        <Pane textAlign='center' marginY={50}>
          <Text>{message('gallery.empty')}</Text>
        </Pane>
      </Pane>
    </PrivateLayout>
  );
};

export default Gallery;
