import { Divider, Modal, Paper, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearDynamicData,
  togglePreviewFee,
} from 'src/features/financeFeatures/financeSlice';
import { formatSalary } from 'src/utils/helperFunctions';
import styles from '../modalBoxStyle';

const FeePreview = ({ fees }) => {
  const dispatch = useDispatch();
  const { previewFee, fee_id, year_level_name, program_name, isTESDA } =
    useSelector((state) => state.finance);

  return (
    <Modal
      open={previewFee}
      onClose={() => {
        dispatch(clearDynamicData({ fee_id, year_level_name, program_name }));
        dispatch(togglePreviewFee());
      }}
      aria-labelledby="preview-fee-title"
      aria-describedby="preview-fee-description"
    >
      <Paper
        sx={{ ...styles, width: 500, maxHeight: '80vh', overflowY: 'scroll' }}
      >
        <Typography
          variant="h4"
          textTransform={'uppercase'}
          mb={3}
          textAlign={'center'}
          id="preview-fee-title"
        >
          {year_level_name ? year_level_name : program_name}
        </Typography>

        <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Tuition Fee{' '}
            {program_name && `${isTESDA ? '(Per Hour)' : '(Per Unit)'}`}
          </Typography>
          <Typography variant="h5" fontWeight={600} textAlign={'right'}>
            {year_level_name &&
              formatSalary(
                fees
                  ?.filter((fee) => fee.fee_type?.fee_type === 'Tuition Fee')
                  ?.reduce((acc, curr) => acc + curr.fee, 0)
              )}

            {program_name &&
              (isTESDA
                ? formatSalary(
                    fees
                      ?.filter(
                        (fee) =>
                          fee.fee_type?.fee_type === 'Tuition Fee Per Hour'
                      )
                      ?.reduce((acc, curr) => acc + curr.fee, 0)
                  )
                : formatSalary(
                    fees
                      ?.filter(
                        (fee) =>
                          fee.fee_type?.fee_type === 'Tuition Fee Per Unit'
                      )
                      ?.reduce((acc, curr) => acc + curr.fee, 0)
                  ))}
          </Typography>
        </Stack>

        <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Matriculation Fee
          </Typography>

          <Typography variant="h5" fontWeight={600} textAlign={'right'}>
            {formatSalary(
              fees
                ?.filter(
                  (fee) => fee?.fee_type?.fee_type === 'Matriculation Fee'
                )
                ?.reduce((acc, curr) => acc + curr?.fee, 0)
            )}
          </Typography>
        </Stack>

        {fees
          ?.filter((fee) => fee?.fee_type?.fee_type === 'Matriculation Fee')
          .map((fee) => (
            <Stack
              key={fee._id}
              width={'80%'}
              direction={'row'}
              spacing={2}
              justifyContent={'space-between'}
            >
              <Typography variant="h5" gutterBottom>
                {fee?.fee_label}
              </Typography>

              <Typography variant="h5" textAlign={'right'}>
                {formatSalary(fee?.fee)}
              </Typography>
            </Stack>
          ))}

        <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Miscellaneous Fee
          </Typography>
          <Typography variant="h5" fontWeight={600} textAlign={'right'}>
            {formatSalary(
              fees
                ?.filter((fee) => fee?.fee_type?.fee_type === 'Miscellaneous')
                ?.reduce((acc, curr) => acc + curr?.fee, 0)
            )}
          </Typography>
        </Stack>

        {fees
          ?.filter((fee) => fee?.fee_type?.fee_type === 'Miscellaneous')
          .map((fee) => (
            <Stack
              key={fee._id}
              width={'80%'}
              direction={'row'}
              spacing={2}
              justifyContent={'space-between'}
            >
              <Typography variant="h5" gutterBottom>
                {fee?.fee_label}
              </Typography>

              <Typography variant="h5" textAlign={'right'}>
                {formatSalary(fee?.fee)}
              </Typography>
            </Stack>
          ))}

        {fees
          ?.filter((fee) => fee?.fee_type?.fee_type === 'Other Fees')
          .map((fee) => (
            <Stack
              key={fee._id}
              direction={'row'}
              spacing={2}
              justifyContent={'space-between'}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {fee?.fee_label}
              </Typography>

              <Typography variant="h5" fontWeight={600} textAlign={'right'}>
                {formatSalary(fee?.fee)}
              </Typography>
            </Stack>
          ))}

        <Divider sx={{ my: 1 }} />

        <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Total Fees
          </Typography>
          <Typography variant="h5" fontWeight={600} textAlign={'right'}>
            {formatSalary(fees?.reduce((acc, curr) => acc + curr?.fee, 0))}
          </Typography>
        </Stack>
        <Divider sx={{ my: 1 }} />
      </Paper>
    </Modal>
  );
};

export default FeePreview;
