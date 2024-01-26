import { useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { useDispatch, useSelector } from 'react-redux';
import { gridSpacing } from 'src/store/constant';
import BookCard from './BookCard';
import Ebooks from './Ebooks';
import IssueCard from './Issues';
import OverdueBooks from './OverdueBooks';

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
            <BookCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <IssueCard isLoading={isLoading} />
          </Grid>

          <Grid item lg={3} md={6} sm={6} xs={12}>
            <Ebooks isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <OverdueBooks isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Index;
