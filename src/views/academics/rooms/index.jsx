import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, Grid, Tab, Tabs } from '@mui/material';

import { IconBedFilled, IconBuildingCommunity } from '@tabler/icons-react';
import Rooms from 'src/components/academics/Room';
import RoomTypes from 'src/components/academics/RoomTypes';
import { TabPanel } from 'src/components/OtherComponents';
import { tabProps } from 'src/utils/helperFunctions';

const Subjects = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
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
            <Tab
              component={Link}
              to="#"
              icon={<IconBedFilled />}
              label="Rooms"
              {...tabProps(0)}
            />
            <Tab
              component={Link}
              to="#"
              icon={<IconBuildingCommunity />}
              label="Room Types"
              {...tabProps(1)}
            />
          </Tabs>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <TabPanel value={value} index={0}>
          <Rooms />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RoomTypes />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default Subjects;
