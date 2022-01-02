import React from 'react';
import { find } from 'lodash';
import { Dialog, Pane } from 'evergreen-ui';

const DetailsPopup = ({ isOpened, changeState, selectedTime, analyzedData }) => {
  const getImageFile = () => {
    const data = find(analyzedData, { currentTime: selectedTime });

    if (!data) {
      return null;
    }

    return data.imageFrame;
  };

  return (
    <Pane>
      <Dialog
        isShown={isOpened}
        title='Кадр'
        onCloseComplete={() => changeState(false)}
        hasFooter={false}
      >
        <Pane
          textAlign='center'
          padding={30}
          marginBottom={10}
        >
          <img
            width='400px'
            height='auto'
            src={getImageFile()}
            alt='Text'
          />
        </Pane>
      </Dialog>
    </Pane>
  );
};

export default DetailsPopup;
