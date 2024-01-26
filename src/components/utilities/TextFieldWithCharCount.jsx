import { FormControl, TextField, Typography } from '@mui/material';

const CharacterCountTextField = ({ name, value, onChange, maxChars, rows = 1, multiline = false }) => {
  const handleChange = (e) => {
    if (e.target.value.length <= maxChars) {
      onChange(e);
    }
  };

  return (
    <FormControl fullWidth>
      <TextField name={name} value={value} onChange={handleChange} multiline={multiline} rows={rows} />

      <Typography variant="body2" color={value.length > maxChars ? 'error' : 'textSecondary'}>
        {`${value.length}/${maxChars} characters`}
      </Typography>
    </FormControl>
  );
};

export default CharacterCountTextField;
