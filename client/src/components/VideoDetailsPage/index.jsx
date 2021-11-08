import React, { useState } from 'react';
import { map } from 'lodash';
import { Pane } from 'evergreen-ui';
import { StyledTabList, StyledTab, StyledTabName, StyledTabContentWrapper } from './style';
import PrivateLayout from '../Layout/PrivateLayout';
import MainInfo from './MainInfo';
import Analyzer from './Analyzer';
import { message } from '../../helpers';

const VideoDetailsPage = () => {
  const [ selectedTabIndex, setSelectedTabIndex ] = useState(0);
  const tabs = [
    {
      displayName: message('videoDetailsPage.tabs.mainInfo'),
      component: MainInfo,
    }, {
      displayName: message('videoDetailsPage.tabs.analyzer'),
      component: Analyzer,
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
          <SelectedTabComponent />
        </StyledTabContentWrapper>
      </Pane>
    </PrivateLayout>
  );
};

export default VideoDetailsPage;
