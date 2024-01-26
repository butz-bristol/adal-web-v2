import { Box, Modal, Paper, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllLeaveAssigns,
  toggleLeaveBalance,
} from 'src/features/hrFeatures/coreHr/hrSlice';
import styles from '../modalBoxStyle';

const LeaveBalance = () => {
  const dispatch = useDispatch();
  const { viewLeaveBalance, leave_assigns, leave_applications } = useSelector(
    (state) => state.coreHr
  );
  const { userProfile } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchAllLeaveAssigns());
  }, [dispatch]);

  return (
    <Modal
      open={viewLeaveBalance}
      onClose={() => dispatch(toggleLeaveBalance())}
    >
      <Paper sx={styles}>
        <Stack spacing={2} mb={3}>
          <Typography variant="h3" id="leave-balance" component="h2">
            Leave Balance
          </Typography>
        </Stack>

        <Box>
          {leave_assigns?.map((leave_assign) => {
            return (
              <Stack
                key={leave_assign?._id}
                direction="row"
                justifyContent="space-between"
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  textTransform={'capitalize'}
                >
                  {leave_assign?.leave_category_name} :{' '}
                  <span>
                    {leave_applications
                      ?.filter(
                        (application) =>
                          application?.leave_type?.leave_category_name ===
                            leave_assign?.leave_category_name &&
                          application?.userId?._id === userProfile?._id
                      )
                      ?.map(
                        (application) =>
                          application?.leave_status === 'approved' &&
                          application?.leave_days
                      )
                      .reduce((a, b) => a + b || 0, 0)}
                  </span>{' '}
                  {' | '}
                  <span>{leave_assign?.number_of_days}</span>{' '}
                </Typography>

                <Typography
                  variant="h5"
                  textTransform={'capitalize'}
                  style={{
                    color: `${
                      leave_assign?.number_of_days -
                        leave_applications
                          ?.filter(
                            (application) =>
                              application?.leave_type?.leave_category_name ===
                                leave_assign?.leave_category_name &&
                              application?.userId?._id === userProfile?._id
                          )
                          ?.map(
                            (application) =>
                              application?.leave_status === 'approved' &&
                              application?.leave_days
                          )
                          ?.reduce((a, b) => a + b || 0, 0) <
                      0
                        ? 'red'
                        : 'green'
                    }`,
                  }}
                >
                  {leave_assign?.number_of_days -
                    leave_applications
                      ?.filter(
                        (application) =>
                          application?.leave_type.leave_category_name ===
                            leave_assign?.leave_category_name &&
                          application?.userId?._id === userProfile?._id
                      )
                      .map(
                        (application) =>
                          application?.leave_status === 'approved' &&
                          application?.leave_days
                      )
                      .reduce((a, b) => a + b || 0, 0)}{' '}
                  days left
                </Typography>
              </Stack>
            );
          })}
        </Box>
      </Paper>
    </Modal>
  );
};

export default LeaveBalance;
