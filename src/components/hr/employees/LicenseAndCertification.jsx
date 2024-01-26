import EditIcon from '@mui/icons-material/Edit';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Box, Button, styled, Typography } from '@mui/material';
import { IconExternalLink } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import {
  setLicenseAndCertification,
  toggleEditLicenseAndCertificationModal,
} from 'src/features/users/userSlice';

const LicenseAndCertification = ({
  _id,
  license_name,
  issuing_authority,
  license_issue_month,
  license_issue_year,
  license_expiry_month,
  license_expiry_year,
  license_url,
  expiration_toggle,
  license_number,
}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ alignSelf: 'flex-start' }}>
          <WorkspacePremiumIcon fontSize="large" sx={{ mr: 2 }} />
        </Box>
        <Box>
          <Box>
            <Typography variant="h5">{license_name}</Typography>
            <Typography variant="h6">{issuing_authority}</Typography>
          </Box>
          <span>
            Issued {license_issue_month && <span>{license_issue_month}</span>}{' '}
            {license_issue_year} -{' '}
            {expiration_toggle ? (
              <span>No Expiration Date</span>
            ) : (
              <span>
                {license_expiry_month && (
                  <span>
                    {license_expiry_month} {license_expiry_year}
                  </span>
                )}
              </span>
            )}
          </span>
          {license_url && (
            <a href={license_url} target="_blank" rel="noreferrer">
              show credential{' '}
              <span>
                <IconExternalLink />
              </span>
            </a>
          )}
        </Box>
      </Box>

      <Button
        sx={{ minWidth: 0, alignSelf: 'flex-start' }}
        onClick={() => {
          dispatch(
            setLicenseAndCertification({
              _id,
              license_name,
              issuing_authority,
              license_issue_month,
              license_issue_year,
              license_expiry_month,
              license_expiry_year,
              license_number,
              license_url,
              expiration_toggle,
            })
          );
          dispatch(toggleEditLicenseAndCertificationModal());
        }}
        size="small"
        variant="contained"
        color="warning"
      >
        <EditIcon fontSize="small" />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  margin: '1rem 0',

  a: {
    textDecoration: 'none',
    display: 'flex',
    gap: '0.5rem',
    alignContent: 'center',
    textTransform: 'capitalize',
    fontSize: '.9rem',
    borderRadius: ' 0.5rem',
    border: '1px solid #8e8e8e',
    padding: '0.25rem 0.7rem 0.05rem',
    width: 'fit-content',
    margin: '1rem 0',
    color: '#8e8e8e',
    lineHeight: '1.5em',

    svg: {
      marginTop: ' -0.2rem',
    },
  },

  span: {
    color: '#8e8e8e',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
}));
export default LicenseAndCertification;
