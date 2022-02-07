import React, { useState } from 'react';
import { map, values, max, isEmpty, find, keys, forEach, sum } from 'lodash';
import { Pane, Table, UnorderedList, ListItem, Heading } from 'evergreen-ui';
import { Line, Pie, Bar } from 'react-chartjs-2';
import DetailsPopup from './DetailsPopup';
import theme from '../../../utils/theme';
import { message } from '../../../helpers';

const emotionsConst = {
  ANGRY: 'angry',
  HAPPY: 'happy',
  SAD: 'sad',
  NEUTRAL: 'neutral',
  SURPRISED: 'surprised',
  DISGUSTED: 'disgusted',
  FEARFUL: 'fearful',
  NO: 'no',
}

const EMOTIONS = {
  [emotionsConst.ANGRY]:
    { displayName: message('emotions.angry.displayName'), key: 1, },
  [emotionsConst.HAPPY]:
    { displayName: message('emotions.happy.displayName'), key: 6 },
  [emotionsConst.SAD]:
    { displayName: message('emotions.sad.displayName'), key: 3 },
  [emotionsConst.NEUTRAL]:
    { displayName: message('emotions.neutral.displayName'), key: 4 },
  [emotionsConst.SURPRISED]:
    { displayName: message('emotions.surprised.displayName'), key: 5 },
  [emotionsConst.DISGUSTED]:
    { displayName: message('emotions.disgusted.displayName'), key: 0 },
  [emotionsConst.FEARFUL]:
    { displayName: message('emotions.fearful.displayName'), key: 2 },
  [emotionsConst.NO]:
    { displayName: message('emotions.no.displayName'), key: -1 },
};

const KEYS = {
  '-1': emotionsConst.NO,
  '0': emotionsConst.DISGUSTED,
  '1': emotionsConst.ANGRY,
  '2': emotionsConst.FEARFUL,
  '3': emotionsConst.SAD,
  '4': emotionsConst.NEUTRAL,
  '5': emotionsConst.SURPRISED,
  '6': emotionsConst.HAPPY,
};

const Charts = ({ analyzedData }) => {
  const [ isDetailsPopupOpened, setIsDetailsPopupOpened ] = useState(false);
  const [ selectedTime, setSelectedTime ] = useState(false);

  if (isEmpty(analyzedData)) {
    return null;
  }

  const getMostAccurateEmotion = (emotions) => {
    const emotionsValues = values(emotions);
    const emotionsKeys = keys(emotions);

    const maxValue = max(emotionsValues);

    return find(emotionsKeys, (key) => emotions[key] === maxValue) || emotionsConst.NO;
  };

  const convertSecondsIntoData = (seconds) => {
    if (seconds < 3600) {
      return new Date(seconds * 1000).toISOString().substr(14, 5);
    }

    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  const getEmotionsPerVideo = () => {
    let result = {};
    const data = map(analyzedData, ({ emotions }) => getMostAccurateEmotion(emotions));

    forEach(data, (key) => {
      if (!result[key]) {
        result[key] = 1;

        return;
      }

      result[key] = result[key] + 1;
    });

    return result;
  };

  const getPercentsFromCounts = (counts) => {
    const totalCount = sum(counts);

    return map(counts, (count) => Math.round((count * 100)/totalCount));
  }

  const data1 = {
    labels: map(analyzedData, 'currentTime'),
    datasets: [{
      label: message('videoDetailsPage.analyzer.charts.chart1.label'),
      data: map(analyzedData, ({ emotions }) => {
        const key = getMostAccurateEmotion(emotions);

        if (!key) {
          return
        }

        return EMOTIONS[key]?.key;
      }),
      fill: false,
      borderColor: theme.primaryColor,
    }],
  };
  const options1 = {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function (label) {
              const emotionByLabel = KEYS[label];

              if (!emotionByLabel) {
                return null;
              }

              return EMOTIONS[emotionByLabel].displayName;
            },
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            callback: (label) => convertSecondsIntoData(label),
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: ({ value, label }) => {
          const emotionKey = KEYS[value];
          const data = find(analyzedData, { currentTime: +label });

          if (isEmpty(data)) {
            return null;
          }

          const displayName = EMOTIONS[emotionKey].displayName;
          const percent = Math.round(data.emotions[emotionKey] * 100);

          return message(
            'videoDetailsPage.analyzer.charts.emotionsLabel',
            { displayName, percent }
          );
        },
        title: (dataset) => {
          const { label: time } = dataset[0];

          return convertSecondsIntoData(time);
        }
      }
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
          threshold: 5,
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'xy',
          },
        },
      },
    },
  };
  const emotionsPerVideo = getEmotionsPerVideo();
  const data2 = {
    labels: keys(emotionsPerVideo).map((emotionKey) => EMOTIONS[emotionKey].displayName),
    datasets: [
      {
        label: message('videoDetailsPage.analyzer.charts.chart2.label'),
        data: getPercentsFromCounts(values(emotionsPerVideo)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(66, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(66, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Pane marginBottom={50}>
        <Heading size={400} marginTop={16}>
          {message('videoDetailsPage.analyzer.charts.possibleEmotions')}
        </Heading>
        <UnorderedList>
          {map(values(EMOTIONS), ({ displayName }) => <ListItem>{displayName}</ListItem> )}
        </UnorderedList>
      </Pane>
      <Pane marginBottom={50}>
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>
              {message('videoDetailsPage.analyzer.charts.table.header1')}
            </Table.TextHeaderCell>
            <Table.TextHeaderCell>
              {message('videoDetailsPage.analyzer.charts.table.header2')}
            </Table.TextHeaderCell>
            <Table.TextHeaderCell>
              {message('videoDetailsPage.analyzer.charts.table.header3')}
            </Table.TextHeaderCell>
          </Table.Head>
          <Table.VirtualBody height={240}>
            {analyzedData.map(({ emotions, currentTime: seconds }, index) => {
              const currentEmotionKey = getMostAccurateEmotion(emotions);

              const time = convertSecondsIntoData(seconds);
              const data = find(analyzedData, { currentTime: seconds });

              let displayName, percent;

              if (currentEmotionKey === emotionsConst.NO) {
                percent = 0;
                displayName = 'Неможливо визначити емоцію';
              } else {
                percent = Math.round(data.emotions[currentEmotionKey] * 100);
                displayName = EMOTIONS[currentEmotionKey].displayName;
              }

              return (
                <Table.Row
                  key={index}
                  isSelectable
                  onSelect={() => {
                    setSelectedTime(seconds);
                    setIsDetailsPopupOpened(true);
                  }}
                >
                  <Table.TextCell>{time}</Table.TextCell>
                  <Table.TextCell>{displayName}</Table.TextCell>
                  <Table.TextCell>{percent}%</Table.TextCell>
                </Table.Row>
              );
            })}
          </Table.VirtualBody>
        </Table>
      </Pane>
      <Pane marginBottom={50}>
        <Line data={data1} options={options1} />
      </Pane>
      <Pane marginBottom={50}>
        <Pie data={data2} />
      </Pane>
      <Pane marginBottom={50}>
        <Bar data={data2} />
      </Pane>
      <DetailsPopup
        isOpened={isDetailsPopupOpened}
        changeState={setIsDetailsPopupOpened}
        selectedTime={selectedTime}
        analyzedData={analyzedData}
      />
    </>
  );
};

export default Charts;
