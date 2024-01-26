import {
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  IconCreditCard,
  IconLock,
  IconSchool,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import { useState } from 'react';
import { gridSpacing } from 'src/store/constant';

import { TabPanel } from 'src/components/OtherComponents';
import ChangePassword from 'src/components/student/ChangePassword';
import AcademicRecords from 'src/components/student/ViewAcademicRecords';
import BasicInformation from 'src/components/student/ViewBasicInformation';
import FamilyBackground from 'src/components/student/ViewFamilyBackground';
import { tabProps } from 'src/utils/helperFunctions';

const Profile = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabsOption = [
    {
      label: 'My Profile',
      icon: <IconUser />,
      caption: 'Basic Information',
    },
    {
      label: 'Academic Records',
      icon: <IconSchool />,
      caption: 'Educational Background',
    },
    {
      label: 'Family and Relationships',
      icon: <IconUsersGroup />,
      caption: 'Parents and Guardians',
    },
    {
      label: 'Payment',
      icon: <IconCreditCard />,
      caption: 'Tuition and Fees',
    },
    {
      label: 'Change Password',
      icon: <IconLock />,
      caption: 'Update Account Security',
    },
  ];

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Card>
          <Grid container>
            <Grid item xs={12} lg={4}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h3">About</Typography>
              </Box>
              <Tabs
                value={value}
                onChange={handleChange}
                orientation="vertical"
                variant="scrollable"
                sx={{
                  '& .MuiTabs-flexContainer': {
                    borderBottom: 'none',
                  },
                  '& button': {
                    color:
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[600]
                        : theme.palette.grey[600],
                    minHeight: 'auto',
                    minWidth: '100%',
                    py: 1.5,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    borderRadius: `3px`,
                  },
                  '& button.Mui-selected': {
                    color: theme.palette.secondary.main,
                    background:
                      theme.palette.mode === 'dark'
                        ? theme.palette.dark.main
                        : theme.palette.grey[50],
                  },
                  '& button > svg': {
                    marginBottom: '0px !important',
                    marginRight: 1.25,
                    marginTop: 1.25,
                    height: 20,
                    width: 20,
                  },
                  '& button > div > span': {
                    display: 'block',
                  },
                  '& > div > span': {
                    display: 'none',
                  },
                }}
              >
                {tabsOption.map((tab, index) => (
                  <Tab
                    key={index}
                    icon={tab.icon}
                    label={
                      <Grid container direction="column">
                        <Typography variant="subtitle1" color="inherit">
                          {tab.label}
                        </Typography>
                        <Typography
                          textTransform="capitalize"
                          variant="caption"
                        >
                          {tab.caption}
                        </Typography>
                      </Grid>
                    }
                    {...tabProps(index)}
                  />
                ))}
              </Tabs>
            </Grid>
            <Grid item xs={12} lg={8}>
              <CardContent
                sx={{
                  borderLeft: '1px solid',
                  [theme.breakpoints.only('xs')]: {
                    borderLeft: 0,
                    borderTop: '1px solid',
                    borderColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette.background.default
                        : theme.palette.grey[200],
                  },
                  borderColor:
                    theme.palette.mode === 'dark'
                      ? theme.palette.background.default
                      : theme.palette.grey[200],
                  height: '100%',
                }}
              >
                <TabPanel value={value} index={0}>
                  <BasicInformation />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <AcademicRecords />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <FamilyBackground />
                </TabPanel>
                <TabPanel value={value} index={3}></TabPanel>
                <TabPanel value={value} index={4}>
                  <ChangePassword />
                </TabPanel>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
