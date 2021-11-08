import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, generatePath } from 'react-router';
import ReactPlayer from 'react-player';
import { Heading, Pane, IconButton, EditIcon, TrashIcon, Badge, Tooltip, Position } from 'evergreen-ui';
import { StyledGalleryItem, VideoWrapper, FlexPanel } from './style';

import galleryActions from '../../../redux/actions/gallery';
import { envVariables } from '../../../configurations';
import theme from '../../../utils/theme';
import { path } from '../../../utils/constants';
import { message } from '../../../helpers';


const GalleryItem = ({ name, url, isAnalyzed, id }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteVideo = (id, name) => {
    dispatch(galleryActions.deleteVideoAction(id, name));
  };

  const redirectToDetailsPage = (id) => {
    history.push(generatePath(path.VIDEO_DETAILS_PAGE, { id }));
  };

  return (
    <StyledGalleryItem
      height={380}
      marginBottom={40}
      borderRadius={2}
      boxShadow={theme.boxShadow}
    >
      <VideoWrapper>
        <ReactPlayer
          controls
          url={`${envVariables.API_URL}/${url}`}
          height='100%'
          width='100%'
        />
      </VideoWrapper>
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
              onClick={() => redirectToDetailsPage(id)}
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
