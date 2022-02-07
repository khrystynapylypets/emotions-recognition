import * as faceapi from 'face-api.js';

class Analyzer {
  constructor(videoUrl) {
    this.videoUrl = videoUrl;
  };

  splitVideoIntoScreenshots = async (imagesPerSec = 1) => (
    new Promise(async (resolve) => {
      // fully download it first (no buffering):
      const videoBlob = await fetch(this.videoUrl).then(videoFile => videoFile.blob());
      const videoObjectUrl = URL.createObjectURL(videoBlob);
      const video = document.createElement('video');

      let seekResolve = null;

      video.addEventListener('seeked', async function () {
        if (!seekResolve) {
          return;
        }

        seekResolve();
      });

      video.addEventListener('loadeddata', async function () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const duration = video.duration;
        const frames = [];
        const interval = 1 / imagesPerSec;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        let currentTime = 0;

        while (currentTime < duration) {
          video.currentTime = currentTime;

          await new Promise(resolver => seekResolve = resolver);

          context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
          const screenshot = canvas.toDataURL('image/png');

          frames.push({ screenshot, currentTime });
          currentTime += interval;
        }

        resolve(frames);
      });

      // set video src *after* listening to events in case it loads so fast
      // that the events occur before we were listening.
      video.src = videoObjectUrl;
    })
  );

  loadModels = async () => {
    try {
      await faceapi.nets.ssdMobilenetv1.loadFromUri(`${process.env.PUBLIC_URL}/static/models`);
      await faceapi.nets.faceLandmark68Net.loadFromUri(`${process.env.PUBLIC_URL}/static/models`);
      await faceapi.nets.faceExpressionNet.loadFromUri(`${process.env.PUBLIC_URL}/static/models`);
    } catch (error) {
      throw error;
    }
  }

  analyzeImage = async (image) => {
    return faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceExpressions();
  };
}

export default Analyzer;
