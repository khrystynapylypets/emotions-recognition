import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { find, map } from 'lodash';
import { Pane, Paragraph, Spinner } from 'evergreen-ui';
import { StyledTabList, StyledTab, StyledTabName, StyledTabContentWrapper } from './style';
import PrivateLayout from '../Layout/PrivateLayout';
import MainInfo from './MainInfo';
import AnalyzerWrapper from './AnalyzerWrapper';
import { message } from '../../helpers';
import { useGalleryListLoading } from '../../customHooks/useInitialLoading';
import { useParams } from 'react-router';

const VideoDetailsPage = () => {
  const { id } = useParams();
  const [ selectedTabIndex, setSelectedTabIndex ] = useState(0);

  const galleryList = useSelector((state) => state.gallery.list);
  const videoDetails = find(galleryList, { id });

  const { isLoading: galleryListIsLoading, queriedAt: galleryListQueriedAt } = useGalleryListLoading();

  if (galleryListIsLoading) {
    return (
      <Pane>
        <Spinner marginX='auto' marginY={120} />
      </Pane>
    );
  }

  if (!videoDetails && galleryListQueriedAt) {
    return (
      <Paragraph>Cannot find content.</Paragraph>
    );
  }

  const tabs = [
    {
      displayName: message('videoDetailsPage.tabs.mainInfo'),
      component: MainInfo,
    }, {
      displayName: message('videoDetailsPage.tabs.analyzer'),
      component: AnalyzerWrapper,
    },
  ];
  const SelectedTabComponent = tabs[selectedTabIndex].component;

  return (
    <PrivateLayout>
      <Pane display='flex' height={550}>
        <StyledTabList
          flexBasis={250}
        >
          {map(tabs, ({ displayName }, index) => (
            <StyledTab
              key={`tab-${index}`}
              id={index}
              onSelect={() => setSelectedTabIndex(index)}
              isSelected={index === selectedTabIndex}
              selected={index === selectedTabIndex}
            >
              <StyledTabName
                selected={index === selectedTabIndex}
                size={400}
              >
                {displayName}
              </StyledTabName>
            </StyledTab>
          ))}
        </StyledTabList>
        <StyledTabContentWrapper>
          <SelectedTabComponent {...videoDetails} />
        </StyledTabContentWrapper>
      </Pane>
    </PrivateLayout>
  );
};

export default VideoDetailsPage;
