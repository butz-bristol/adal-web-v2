import { useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'src/store/constant';
import ItemCard from './ItemCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Index = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.users);
  const id = localStorage.getItem('user.userId');
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <ItemCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Index;
