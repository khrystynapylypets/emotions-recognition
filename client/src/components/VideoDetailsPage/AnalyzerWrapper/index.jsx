import React, { useState, useMemo, useEffect } from 'react';
import { map } from 'lodash';
import { Button, Pane, Spinner, toaster as addMessage, TextInputField } from 'evergreen-ui';
import Analyzer from '../../../analyzer/Analyzer';
import Charts from '../Charts';
import { ERROR_MESSAGE_DISPLAYING_DURATION } from '../../../utils/constants';
import { useTextField } from '../../../customHooks/useFormField';
import { analyzerValidator } from '../../../utils/validation';
import { message } from '../../../helpers';

const AnalyzerWrapper = ({ url }) => {
  const [ isAnalyzing, setIsAnalyzing ] = useState(false);
  const [ analyzedData, setAnalyzedData ] = useState([]);
  const [ isModelsLoaded, setIsModelsLoaded ] = useState(false);
  const {
    value: framesPerSec,
    onChange: onFramesPerSecChange,
    onValidate: onFramesPerSecValidate,
    errorMessage: framesPerSecErrorMessage,
  }
  = useTextField({ initialValue: 1, validationFunction: analyzerValidator['framesPerSec'] });

  const analyzerInstance = useMemo(() => new Analyzer(url), []);

  useEffect(async () => {
    try {
      if (isModelsLoaded) {
        return;
      }

      await analyzerInstance.loadModels();
      setIsModelsLoaded(true);
    } catch (error) {
      addMessage.danger(
        'Cannot load models to analyze video, please try again later.',
        { duration: ERROR_MESSAGE_DISPLAYING_DURATION },
      );
    }
  }, [ isModelsLoaded ]);

  const convertFramesIntoImageObjects = (frames) => (
    map(frames, (frame) => {
      const imageObj = new Image();

      imageObj.src = frame.screenshot;

      return {
        currentTime: frame.currentTime,
        imageObj: imageObj,
      };
    })
  );

  const splitImagesFromVideo = async () => {
    const frames = await analyzerInstance.splitVideoIntoScreenshots(framesPerSec);

    return convertFramesIntoImageObjects(frames);
  };

  const analyzeVideo = async () => {
    if (!isModelsLoaded || isAnalyzing) {
      return;
    }

    if (onFramesPerSecValidate()) {
      return;
    }

    try {
      setIsAnalyzing(true);
      const images = await splitImagesFromVideo();

      const result = await Promise.all(map(images, async ({ imageObj, currentTime }) => {
        const analyzed = await analyzerInstance.analyzeImage(imageObj);

        console.log(analyzed);

        return {
          imageFrame: imageObj.src,
          emotions: analyzed[0] ? analyzed[0].expressions : null,
          currentTime,
        };
      }));

      setAnalyzedData(result);
      setIsAnalyzing(false);
    } catch {
      setIsAnalyzing(false);
      addMessage.danger(
        'Something went wrong, please try again.',
        { duration: ERROR_MESSAGE_DISPLAYING_DURATION },
      );
    }
  };

  const isAnalyzingDisabled = isAnalyzing || !isModelsLoaded;
  const mainContent = isAnalyzing
    ? <Spinner marginX='auto' marginY={100} />
    : <Charts analyzedData={analyzedData} />;

  return (
    <Pane>
      <TextInputField
        marginY={10}
        label={message('videoDetailsPage.analyzer.framesPerSec.label')}
        width={400}
        type='number'
        max={10}
        min={1}
        value={framesPerSec}
        onChange={({ target }) => onFramesPerSecChange(target.value)}
        validationMessage={framesPerSecErrorMessage}
      />
      <Button
        appearance='primary'
        intent='success'
        marginY={20}
        size='large'
        disabled={isAnalyzingDisabled}
        onClick={analyzeVideo}
      >
        {message('videoDetailsPage.analyzer.buttons.analyze')}
      </Button>
      <Pane marginY={20}>
        {mainContent}
      </Pane>
    </Pane>
  );
};

export default AnalyzerWrapper;
