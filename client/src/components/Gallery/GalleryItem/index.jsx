import React from 'react';
import { useDispatch } from 'react-redux';
import { Heading, Pane, IconButton, EditIcon, TrashIcon, Badge, Tooltip, Position } from 'evergreen-ui';
import { StyledGalleryItem, StyledVideo, FlexPanel } from './style';

import galleryActions from '../../../redux/actions/gallery';
import { envVariables } from '../../../configurations';
import theme from '../../../utils/theme';
import { message } from '../../../helpers';


const GalleryItem = ({ name, url, isAnalyzed, id }) => {
  const dispatch = useDispatch();

  const deleteVideo = (id, name) => {
    dispatch(galleryActions.deleteVideoAction(id, name));
  };

  return (
    <StyledGalleryItem
      height={350}
      marginBottom={30}
      borderRadius={2}
      elevation={1}
    >
      <StyledVideo src={`${envVariables.API_URL}/${url}`} />
      <Pane
        height='25%'
        width='100%'
        padding={15}
      >
        <Heading
          textAlign='left'
          color={theme.textColor}
        >
          {name}
        </Heading>
      </Pane>
      <FlexPanel
        height='15%'
        width='100%'
        padding={15}
      >
        {isAnalyzed
          ? <Badge color='green'>{message('gallery.label.analyzed')}</Badge>
          : <Badge color='red'>{message('gallery.label.notAnalyzed')}</Badge>
        }
        <Pane>
          <Tooltip content={message('gallery.item.settings.detailsPage')} position={Position.LEFT}>
            <IconButton
              icon={EditIcon}
              marginRight={5}
              appearance='minimal'
            />
          </Tooltip>
          <Tooltip content={message('gallery.item.settings.delete')}>
            <IconButton
              icon={TrashIcon}
              marginRight={5}
              appearance='minimal'
              onClick={() => deleteVideo(id, name)}
            />
          </Tooltip>
        </Pane>
      </FlexPanel>
    </StyledGalleryItem>
  );
};

export default GalleryItem;
