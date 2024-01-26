import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import {
  Button,
  Card,
  CardHeader,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

import {
  getAllCollegeSubjects,
  getAllInstructors,
  getAllK12Subjects,
  getAllRooms,
  getAllStudentsByLevel,
  getAllSubjectAssignments,
  getAllTesdaCourses,
  getSection,
} from 'src/features/academicFeatures/academicSlice';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {
  IconBooks,
  IconCalendar,
  IconEdit,
  IconUsers,
} from '@tabler/icons-react';

import { k12Departments, tabProps } from 'src/utils/helperFunctions';

import { TabPanel } from '../OtherComponents';

import LoadingData from 'src/components/LoadingData';
import { fetchPrincipal } from 'src/features/users/userSlice';
import LinkComponent from '../LinkComponent';
import ClassSchedules from './Section/ClassSchedules';
import ClassStudents from './Section/ClassStudents';
import ClassSubjects from './Section/ClassSubjects';

const Section = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { section, isFetchingSection } = useSelector(
    (state) => state.academics
  );
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getSection(id));
    dispatch(fetchPrincipal());
    dispatch(getAllSubjectAssignments());
    dispatch(getAllInstructors());
    dispatch(getAllRooms());
  }, [dispatch, id]);

  useEffect(() => {
    if (section.level?._id) {
      dispatch(getAllStudentsByLevel(section.level?._id));
    }
    if (k12Departments.includes(section.department?.department_name)) {
      dispatch(getAllK12Subjects());
      return;
    } else if (section.department?.department_name === 'College') {
      dispatch(getAllCollegeSubjects());
      return;
    } else if (
      section.department?.department_name ===
      'Technical Education and Skills Development Authority (TESDA)'
    ) {
      dispatch(getAllTesdaCourses());
      return;
    }
  }, [dispatch, section]);

  return (
    <Stack spacing={2}>
      <LinkComponent to={'../'}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ArrowCircleLeftIcon />}
        >
          Back
        </Button>
      </LinkComponent>
      {isFetchingSection ? (
        <LoadingData />
      ) : (
        <>
          <Card>
            <CardHeader
              title={
                <>
                  <Typography variant="h3" color="white">
                    {section?.section_name}
                  </Typography>
                  <Typography variant="caption" color="white">
                    {section.program
                      ? section?.program?.program_name +
                        ' | ' +
                        section?.level?.year_level_name
                      : section?.level?.year_level_name}
                  </Typography>
                </>
              }
              sx={{ backgroundColor: '#9e1313', height: '80px', mb: 2 }}
              action={
                <IconButton>
                  <IconEdit color="white" />
                </IconButton>
              }
            ></CardHeader>
            <Tabs
              value={value}
              indicatorColor="secondary"
              textColor="secondary"
              onChange={handleChange}
              variant="scrollable"
              sx={{
                '& a': {
                  minHeight: 'auto',
                  minWidth: 10,
                  py: 1.5,
                  px: 1,
                  mr: 2.25,
                  color: theme.palette.grey[600],
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                '& a.Mui-selected': {
                  color: theme.palette.secondary.main,
                },
                '& .MuiTabs-indicator': {
                  bottom: 2,
                },
                '& a > svg': {
                  marginBottom: '0px !important',
                  mr: 1.25,
                },
              }}
            >
              <Tab
                component={Link}
                to="#"
                icon={<IconUsers />}
                label="Students"
                {...tabProps(0)}
              />
              <Tab
                component={Link}
                to="#"
                icon={<IconCalendar />}
                label="Schedules"
                {...tabProps(1)}
              />
              <Tab
                component={Link}
                to="#"
                icon={<IconBooks />}
                label="Subjects"
                {...tabProps(2)}
              />
            </Tabs>
          </Card>
          <TabPanel value={value} index={0}>
            <ClassStudents />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ClassSchedules />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ClassSubjects />
          </TabPanel>
        </>
      )}
    </Stack>
  );
};

export default Section;
