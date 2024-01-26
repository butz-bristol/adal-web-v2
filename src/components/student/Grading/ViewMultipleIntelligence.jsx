import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useEffect } from 'react';
import { setStudentReport } from 'src/features/academicFeatures/academicSlice';

const ViewMultipleIntelligence = () => {
  const dispatch = useDispatch();

  const { student_report } = useSelector((state) => state.students);

  const intelligences = [
    {
      intelligence: 'Word smart',
      checklist: [
        {
          description:
            'Understands time-related words such as soon, later and in a few minutes',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Understands abstract adjectives',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Identifies similarities and differences',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Expresses thoughts and ideas in a sentence',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Constructs simple sentences',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Tells familiar stories without pictures for cue',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Gives reason why an object does not belong in a group',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Reads words with more than one syllables',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
      ],
    },
    {
      intelligence: 'Music smart',
      checklist: [
        {
          description: 'Moves to beat and rhythms',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Seeks and enjoys musical experiences',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Repeats familiar action songs and rhymes',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Plays with sounds and other musical instruments',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Remembers tunes and sound patterns',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
      ],
    },
    {
      intelligence: 'Number smart',
      checklist: [
        {
          description: 'Points to colors upon request',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Names the primary and secondary colors',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Distinguishes different shapes',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Identifies numbers from 1 to 100',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description:
            'Understands the basic addition and substraction processes',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description:
            'Understands time concepts such as today, tomorrow and yesterday',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: "Doesn't skip counting by 2's, 5's and 10's",
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Points to or places an object using the preposition',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
      ],
    },
    {
      intelligence: 'Body smart',
      checklist: [
        {
          description: 'Runs around objects/corners without falling',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Balances on one foot for 10 seconds',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Imitates dance steps',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
      ],
    },
    {
      intelligence: 'Nature smart',
      checklist: [
        {
          description:
            'Exhibits interest in exploring the natural surroundings',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Identifies weather and weather condition',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description:
            'Participates in activities like nature walk and garden exploration',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Recognizes animal sounds',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
      ],
    },
    {
      intelligence: 'Picture smart',
      checklist: [
        {
          description:
            "Likes to put things together or takes things apart using blocks, Lego's and links",
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description:
            'Traces/copies letters of the alphabet (lower and upper cases)',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Draws a recognizable picture',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Writes own name on his/her work',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Creates designs using different lines and shapes',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
      ],
    },
    {
      intelligence: 'People smart',
      checklist: [
        {
          description: 'Likes to work in a group',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Mingles and helps classmates easily',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Takes the lead in every activity',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
      ],
    },
    {
      intelligence: 'Self smart',
      checklist: [
        {
          description: 'Likes to work on his/her own',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description:
            'Expresses self-discipline without the constant reminder',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
        {
          description: 'Takes care of him/herself after class',
          first_period: '',
          second_period: '',
          third_period: '',
          fourth_period: '',
        },
      ],
    },
  ];

  const legend = [
    { value: 'O', description: 'Outstanding' },
    { value: 'VS', description: 'Very Satisfactory' },
    { value: 'S', description: 'Satisfactory' },
  ];

  useEffect(() => {
    // Check if student_report.intelligences is empty
    if (
      !student_report.intelligences ||
      student_report.intelligences.length === 0
    ) {
      // Dispatch the action to set intelligences with some default values (e.g., an empty array)
      dispatch(
        setStudentReport({ ...student_report, intelligences: intelligences })
      );
    }
  }, []);

  return (
    <Grid container component={Paper}>
      <Grid item xs={12}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width={500}>
                <Typography variant="h4">Multiple Intelligence</Typography>
              </TableCell>
              <TableCell align="center">1st</TableCell>
              <TableCell align="center">2nd</TableCell>
              <TableCell align="center">3rd</TableCell>
              <TableCell align="center">4th</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {intelligences.map((item, intelligenceIndex) => (
              <Fragment key={intelligenceIndex}>
                <TableRow>
                  <TableCell>
                    <Typography variant="h4">{item.intelligence}</Typography>
                  </TableCell>
                  <TableCell colSpan={5}></TableCell>
                </TableRow>
                {item.checklist.map((checklistItem, checklistIndex) => (
                  <TableRow key={checklistIndex}>
                    <TableCell width={400}>
                      {checklistItem.description}
                    </TableCell>
                    {[
                      'first_period',
                      'second_period',
                      'third_period',
                      'fourth_period',
                    ].map((period, periodIndex) => (
                      <TableCell key={periodIndex} align="center">
                        {student_report?.intelligences?.[intelligenceIndex]
                          ?.checklist?.[checklistIndex]?.[period] || ''}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid container item xs={12} spacing={2} m={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Legends:</Typography>
        </Grid>
        {legend.map((item, index) => (
          <Grid item key={index} xs={3}>
            <Typography variant="h5">{item.value}</Typography>
            <Typography variant="caption">{item.description}</Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ViewMultipleIntelligence;
