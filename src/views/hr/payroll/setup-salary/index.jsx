import { Box, Card, Grid, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { TabPanel } from 'src/components/OtherComponents';
import { tabProps } from 'src/utils/helperFunctions';
import AdminSalary from './AdminSalary';
import SpecialSalary from './SpecialSalary';
import TeachingSalary from './TeachingSalary';

const SetupSalaryTabs = () => {
  const [value, setValue] = useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <Grid item lg={9} xs={12}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab label="Admin Designation" {...tabProps(0)} />
              <Tab label="Teaching Designation" {...tabProps(1)} />
              <Tab label="Special Designation" {...tabProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AdminSalary />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TeachingSalary />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <SpecialSalary />
          </TabPanel>
        </Box>
      </Grid>
    </Card>
  );
};

export default SetupSalaryTabs;
