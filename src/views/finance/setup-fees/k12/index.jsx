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
import {
  fetchFees,
  setDynamicData,
  togglePreviewFee,
} from 'src/features/financeFeatures/financeSlice';
import { getAllYearLevels } from 'src/features/registrarFeatures/registrarSlice';
import { extractRole } from 'src/utils/helperFunctions';
const K12FeeSetup = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { user } = useSelector((state) => state.users);
  const { year_levels, isFetchingYearLevels } = useSelector(
    (state) => state.registrar
  );
  const { fees, fee_id } = useSelector((state) => state.finance);

  const k12Fees = fees?.filter((fee) => fee.applies_to !== 'Programs');

  const options = year_levels
    .filter(
      (level) =>
        level?.department?.department_name !== 'College' &&
        level?.department?.department_name !==
          'Technical Education and Skills Development Authority (TESDA)' &&
        level?.remarks === 'Active'
    )
    .map((level) => {
      return {
        label: `${level?.year_level_name}`,
        id: level?._id,
      };
    });

  const filteredYearLevels = filter?.label
    ? year_levels.filter((level) => level._id === filter?.id)
    : year_levels;

  useEffect(() => {
    dispatch(getAllYearLevels());
    dispatch(fetchFees());
  }, [dispatch]);

  return (
    <Stack>
      {/* Fee Preview Modal */}
      <FeePreview
        fees={k12Fees?.filter((fees) => {
          return fees?.levels?.includes(fee_id);
        })}
      />

      {isFetchingYearLevels && <LoadingScreen />}

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

      <Grid container spacing={2} mt={2}>
        {filteredYearLevels
          ?.filter(
            (level) =>
              level?.department?.department_name !== 'College' &&
              level?.department?.department_name !==
                'Technical Education and Skills Development Authority (TESDA)'
          )
          .map((level) => (
            <Grid item xs={12} md={4} key={level._id} sx={{ height: '100%' }}>
              <Card
                sx={{
                  '&:hover': {
                    boxShadow: '0 8px 10px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h4" component={'div'}>
                    {level?.year_level_name}
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
                          year_level_name: level.year_level_name,
                          fee_id: level._id,
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

export default K12FeeSetup;
