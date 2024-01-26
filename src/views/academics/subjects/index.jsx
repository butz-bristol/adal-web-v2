import { Card, Grid, Tab, Tabs } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  IconBook2,
  IconCertificate,
  IconCertificate2,
  IconListCheck,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CollegeSubjects from 'src/components/academics/Subject/CollegeSubjects';
import K12Subjects from 'src/components/academics/Subject/K12Subjects';
import SubjectTypes from 'src/components/academics/Subject/SubjectTypes';
import TesdaCourses from 'src/components/academics/Subject/TESDACourses';
import { TabPanel } from 'src/components/OtherComponents';
import {
  collegeDepartmentAcademicRoles,
  k12DepartmentAcademicRoles,
  tabProps,
  tesdaDepartmentAcademicRoles,
} from 'src/utils/helperFunctions';
const Subjects = () => {
  const theme = useTheme();

  const { userProfile } = useSelector((state) => state.academics);
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
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
            {k12DepartmentAcademicRoles.includes(
              userProfile.admin_designation?.designation_name
            ) && (
              <Tab
                component={Link}
                to="#"
                icon={<IconBook2 />}
                label="K-12 Subjects"
                {...tabProps(0)}
              />
            )}
            {collegeDepartmentAcademicRoles.includes(
              userProfile.admin_designation?.designation_name
            ) && (
              <Tab
                component={Link}
                to="#"
                icon={<IconCertificate />}
                label="College Subjects"
                {...tabProps(0)}
              />
            )}
            {tesdaDepartmentAcademicRoles.includes(
              userProfile.admin_designation?.designation_name
            ) && (
              <Tab
                component={Link}
                to="#"
                icon={<IconCertificate2 />}
                label="TESDA Courses"
                {...tabProps(0)}
              />
            )}
            {userProfile.admin_designation_toggle && (
              <Tab
                component={Link}
                to="#"
                icon={<IconListCheck />}
                label="Subject Types"
                {...tabProps(0)}
              />
            )}
          </Tabs>
        </Card>
      </Grid>
      <Grid item xs={12}>
        {userProfile.admin_designation_toggle ? (
          <>
            <TabPanel value={value} index={0}>
              <K12Subjects />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <CollegeSubjects />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <TesdaCourses />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <SubjectTypes />
            </TabPanel>
          </>
        ) : (
          <TabPanel value={value} index={0}>
            {k12DepartmentAcademicRoles.includes(
              userProfile.admin_designation?.designation_name
            ) && <K12Subjects />}
            {collegeDepartmentAcademicRoles.includes(
              userProfile.admin_designation?.designation_name
            ) && <CollegeSubjects />}
            {tesdaDepartmentAcademicRoles.includes(
              userProfile.admin_designation?.designation_name
            ) && <TesdaCourses />}
            {userProfile.admin_designation_toggle && <SubjectTypes />}
          </TabPanel>
        )}
      </Grid>
    </Grid>
  );
};

export default Subjects;
