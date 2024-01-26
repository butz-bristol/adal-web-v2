import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
    Grid,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
    Button,
} from '@mui/material';

import {
    clearStudent,
    setStudent,
    toggleFamilyBackgroundModal,
    updateStudent
} from "features/admissionsFeatures/admissionsSlice";

const EditStudentFamilyBackground = () => {
    const dispatch = useDispatch();

    const { isEditingStudentFamilyBackground, student } = useSelector((state) => state.admissions);

    const handleChange = (e) => {
        dispatch(setStudent({ ...student, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (student.student_father_name === '' && student.student_mother_name === '' && student.student_guardian_name === '') {
            toast.error('Input at least one family or guardian information!');
            return;
        }

        dispatch(updateStudent({ ...student }));
        dispatch(toggleFamilyBackgroundModal());
    }

    const handleClose = () => {
        dispatch(toggleFamilyBackgroundModal());
        dispatch(clearStudent());
    };

    return (
        <Dialog
            fullWidth
            open={isEditingStudentFamilyBackground}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Typography variant="h4" gutterBottom mb={3}>
                        Family Background
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid container item spacing={2}>
                            <Grid item>
                                <Typography variant="h5" color="secondary">Father's Information</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth variant="outlined" type="text" name="student_father_name" onChange={handleChange} value={student.student_father_name || ''} label="Father's name" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="text" name="student_father_contact_number" onChange={handleChange} value={student.student_father_contact_number || ''} label="Contact Number" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="text" name="student_father_occupation" onChange={handleChange} value={student.student_father_occupation || ''} label="Occupation" />
                            </Grid>

                            <Grid item>
                                <Typography variant="h5" color="secondary">Mothers's Information</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="text" name="student_mother_name" onChange={handleChange} value={student.student_mother_name || ''} label="Mother's name" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="text" name="student_mother_contact_number" onChange={handleChange} value={student.student_mother_contact_number || ''} label="Contact Number" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="text" name="student_mother_occupation" onChange={handleChange} value={student.student_mother_occupation || ''} label="Occupation" />
                            </Grid>

                            <Grid item>
                                <Typography variant="h5" color="secondary">Guardian's Information</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="text" name="student_guardian_name" onChange={handleChange} value={student.student_guardian_name || ''} label="Guardian's name" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="text" name="student_guardian_contact_number" onChange={handleChange} value={student.student_guardian_contact_number || ''} label="Contact Number" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="text" name="student_guardian_occupation" onChange={handleChange} value={student.student_guardian_occupation || ''} label="Occupation" />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="warning" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="secondary" type="submit">Update</Button>
                </DialogActions>
            </form>
        </Dialog >
    );
}

export default EditStudentFamilyBackground;