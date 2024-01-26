import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import LoadingScreen from 'src/components/LoadingScreen';
import FeePreview from 'src/components/finance/FeePreview';
import { getAllPrograms } from 'src/features/academicFeatures/academicSlice';
import {
  fetchFees,
  setDynamicData,
  togglePreviewFee,
} from 'src/features/financeFeatures/financeSlice';
import { extractRole } from 'src/utils/helperFunctions';
const TesdaFeesSetup = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { programs, isFetchingPrograms } = useSelector(
    (state) => state.academics
  );
  const { fees, fee_id } = useSelector((state) => state.finance);
  const { user } = useSelector((state) => state.users);

  const tesdaFees = fees?.filter((fee) => fee.applies_to == 'Programs');

  const options = programs
    ?.filter((program) => program.program_description === 'TESDA')
    .map((program) => {
      return {
        label: `${program?.program_name}`,
        id: program?._id,
      };
    });

  const filteredCourses = filter?.label
    ? programs.filter((program) => program._id === filter?.id)
    : programs;

  useEffect(() => {
    dispatch(fetchFees());
    dispatch(getAllPrograms());
  }, [dispatch]);

  return (
    <Stack>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box width={300}>
          <FormControl fullWidth>
            <Autocomplete
              id="filter"
              options={options}
              renderInput={(params) => (
                <TextField {...params} label="Filter" variant="outlined" />
              )}
              value={filter}
              onChange={(event, value) => {
                setFilter(value);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              inputValue={inputValue}
            />
          </FormControl>
        </Box>

        <Box>
          <LinkComponent
            to={`/${extractRole(user.user_role)}/setup-fees/tuition-and-fees`}
          >
            <Button
              variant="contained"
              color="secondary"
              startIcon={<IconPlus stroke={2} size="1.2rem" />}
            >
              Add New
            </Button>
          </LinkComponent>
        </Box>
      </Stack>

      {/* Fee Preview Modal */}

      <FeePreview
        fees={tesdaFees?.filter((fees) => {
          return fees?.programs?.includes(fee_id);
        })}
      />

      {isFetchingPrograms && <LoadingScreen />}

      <Grid container spacing={2} mt={2}>
        {filteredCourses
          ?.filter((program) => program.program_description === 'TESDA')
          .map((program) => (
            <Grid item xs={12} md={4} key={program._id} sx={{ height: '100%' }}>
              <Card
                sx={{
                  '&:hover': {
                    boxShadow: '0 8px 10px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component={'div'}>
                    {program?.program_name}
                  </Typography>
                  <Typography variant="body2">
                    ({program?.program_description})
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => {
                      dispatch(togglePreviewFee());
                      dispatch(
                        setDynamicData({
                          program_name: program.program_name,
                          fee_id: program._id,
                          isTESDA: true,
                        })
                      );
                    }}
                  >
                    Preview
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};

export default TesdaFeesSetup;
