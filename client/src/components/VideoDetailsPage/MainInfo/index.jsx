import React from 'react';
import ReactPlayer from 'react-player';
import { Pane, Heading, Paragraph } from 'evergreen-ui';
import { envVariables } from '../../../configurations';

const MainInfo = ({ url, name, description }) => {
  return (
    <Pane>
      <ReactPlayer
        url={`${envVariables.API_URL}/${url}`}
        controls
        width='70%'
        height='auto'
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
