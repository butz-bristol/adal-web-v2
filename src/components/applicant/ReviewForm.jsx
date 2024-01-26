import { useSelector } from "react-redux";

import {
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import {
    IconAnalyzeFilled,
    IconBuilding,
    IconBuildingArch,
    IconCalendar,
    IconCertificate,
    IconFlag,
    IconGenderAgender,
    IconGenderFemale,
    IconGenderMale,
    IconHeart,
    IconHome,
    IconHomeCog,
    IconId,
    IconIdBadge,
    IconMail,
    IconPhone,
    IconSchool,
    IconStatusChange,
} from '@tabler/icons-react';

const ReviewForm = () => {
    const { newApplicant, newApplicant: {
        student_esc_grant_status,
        student_shs_voucher_status,
        old_student_number,
        student_returnee_status,
        student_type,
        student_last_school_attended,
        student_last_school_year_attended,
        student_department,
        student_college_track,
        student_program,
        student_yearlevel,
        student_first_name,
        student_middle_name,
        student_last_name,
        student_gender,
        student_sexual_orientation,
        student_nationality,
        student_birthdate,
        student_contact_number,
        student_personal_email,
        region,
        province,
        municipality,
        barangay,
        student_present_address,
        student_same_address,
        student_permanent_address,
        student_civil_status,
        student_father_name,
        student_father_email_address,
        student_father_contact_number,
        student_father_occupation,
        student_mother_name,
        student_mother_email_address,
        student_mother_contact_number,
        student_mother_occupation,
        student_guardian_name,
        student_guardian_email_address,
        student_guardian_contact_number,
        student_guardian_occupation,
    } } = useSelector((state) => state.applicants);

    const { college_tracks, year_levels, departments } = useSelector((state) => state.registrar);
    const { programs } = useSelector((state) => state.academics);

    const Department = departments.find((item) => item._id === student_department?._id)?.department_name;
    const CollegeTrack = college_tracks.find((item) => item._id === student_college_track?._id)?.college_track_name;
    const Program = programs.find((item) => item._id === student_program?._id)?.program_name;
    const YearLevel = year_levels.find((item) => item._id === student_yearlevel?._id)?.year_level_name;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Divider textAlign="left"><Typography color='secondary' textTransform="uppercase">Academic Information</Typography></Divider>
            </Grid>
            <Grid container item xs={12} spacing={2}>
                <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                    <Grid item>
                        <IconStatusChange />
                    </Grid>
                    <Grid item sm>
                        <Typography variant="subtitle1" color="inherit">
                            {student_type}
                        </Typography>
                        <Typography textTransform="capitalize" variant="caption">
                            Student Type
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                    <Grid item>
                        <IconSchool />
                    </Grid>
                    <Grid item sm>
                        <Typography variant="subtitle1" color="inherit">
                            {Department}
                        </Typography>
                        <Typography textTransform="capitalize" variant="caption">
                            {CollegeTrack}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                    <Grid item>
                        <IconCertificate />
                    </Grid>
                    <Grid item sm>
                        <Typography variant="subtitle1" color="inherit">
                            {student_program ? Program : YearLevel}
                        </Typography>
                        <Typography variant="caption">
                            {student_program ? YearLevel : 'Level'}
                        </Typography>
                    </Grid>
                </Grid>
                {student_shs_voucher_status && (
                    <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                        <Grid item>
                            <IconAnalyzeFilled />
                        </Grid>
                        <Grid item sm>
                            <Typography variant="subtitle1" color="inherit">
                                {student_shs_voucher_status ? 'Yes' : 'No'}
                            </Typography>
                            <Typography variant="caption">
                                Did you apply for SHS Voucher?
                            </Typography>
                        </Grid>
                    </Grid>
                )}
                {student_esc_grant_status && (
                    <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                        <Grid item>
                            <IconAnalyzeFilled />
                        </Grid>
                        <Grid item sm>
                            <Typography variant="subtitle1" color="inherit">
                                {student_esc_grant_status ? 'Yes' : 'No'}
                            </Typography>
                            <Typography textTransform="capitalize" variant="caption">
                                Did you apply for ESC Grant?
                            </Typography>
                        </Grid>
                    </Grid>
                )}
                {student_returnee_status && (
                    <>
                        <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                            <Grid item>
                                <IconIdBadge />
                            </Grid>
                            <Grid item sm>
                                <Typography variant="subtitle1" color="inherit">
                                    {old_student_number}
                                </Typography>
                                <Typography textTransform="capitalize" variant="caption">
                                    Old Student Number
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                            <Grid item>
                                <IconBuilding />
                            </Grid>
                            <Grid item sm>
                                <Typography variant="subtitle1" color="inherit">
                                    {student_last_school_attended} {student_last_school_year_attended}
                                </Typography>
                                <Typography textTransform="capitalize" variant="caption">
                                    Last School Attended
                                </Typography>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>
            <Grid item xs={12}>
                <Divider textAlign="left"><Typography color='secondary' textTransform="uppercase">Personal Information</Typography></Divider>
            </Grid>
            <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                <Grid item>
                    <IconId />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">
                        {student_last_name}, {student_first_name} {student_middle_name}
                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        Full name
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                <Grid item>
                    <IconHeart />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">
                        {student_civil_status}
                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        Civil Status
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                <Grid item>
                    {student_gender === 'Male' ? <IconGenderMale /> : <IconGenderFemale />}
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">
                        {student_gender}
                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        Gender
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                <Grid item>
                    <IconGenderAgender />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">
                        {student_sexual_orientation}
                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        Sexual Orientation
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                <Grid item>
                    <IconFlag />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">
                        {student_nationality}
                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        Nationality
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                <Grid item>
                    <IconCalendar />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">
                        {new Date(student_birthdate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        Birth Date
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                <Grid item>
                    <IconPhone />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">
                        {student_contact_number}
                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        Contact
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                <Grid item>
                    <IconMail />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">
                        {student_personal_email}
                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        Personal Email
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                <Grid item>
                    <IconHomeCog />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">
                        {region.name}
                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        {province.name}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                <Grid item>
                    <IconBuilding />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">
                        {municipality.name}
                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        {barangay.name}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                <Grid item>
                    <IconHome />
                </Grid>
                <Grid item sm>
                    <Typography variant="subtitle1" color="inherit">
                        {student_present_address}
                    </Typography>
                    <Typography textTransform="capitalize" variant="caption">
                        Present Address
                    </Typography>
                </Grid>
            </Grid>
            {student_same_address === false && (
                <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                    <Grid item>
                        <IconHome />
                    </Grid>
                    <Grid item sm>
                        <Typography variant="subtitle1" color="inherit">
                            {student_permanent_address}
                        </Typography>
                        <Typography textTransform="capitalize" variant="caption">
                            Permanent Address
                        </Typography>
                    </Grid>
                </Grid>
            )}
            <Grid item xs={12}>
                <Divider textAlign="left"><Typography color='secondary' textTransform="uppercase">Family Background</Typography></Divider>
            </Grid>
            {student_father_name && (
                <>
                    <Grid container item xs={12} lg={6} spacing={2}>
                        <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                            <Grid item>
                                <IconId />
                            </Grid>
                            <Grid item sm>
                                <Typography variant="subtitle1" color="inherit">
                                    {student_father_name}
                                </Typography>
                                <Typography textTransform="capitalize" variant="caption">
                                    {!student_father_occupation ? 'No Occupation' : student_father_occupation}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} lg={6} spacing={2}>
                        <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                            <Grid item>
                                <IconMail />
                            </Grid>
                            <Grid item sm>
                                <Typography variant="subtitle1" color="inherit">
                                    {!student_father_email_address ? 'No Email Address' : student_father_email_address}
                                </Typography>
                                <Typography textTransform="capitalize" variant="caption">
                                    {!student_father_contact_number ? 'No Contact Number' : student_father_contact_number}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            )}
            {student_mother_name && (
                <>
                    <Grid container item xs={12} lg={6} spacing={2}>
                        <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                            <Grid item>
                                <IconId />
                            </Grid>
                            <Grid item sm>
                                <Typography variant="subtitle1" color="inherit">
                                    {student_mother_name}
                                </Typography>
                                <Typography textTransform="capitalize" variant="caption">
                                    {!student_mother_occupation ? 'No Occupation' : student_mother_occupation}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} lg={6} spacing={2}>
                        <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                            <Grid item>
                                <IconMail />
                            </Grid>
                            <Grid item sm>
                                <Typography variant="subtitle1" color="inherit">
                                    {!student_mother_email_address ? 'No Email Address' : student_mother_email_address}
                                </Typography>
                                <Typography textTransform="capitalize" variant="caption">
                                    {!student_mother_contact_number ? 'No Contact Number' : student_mother_contact_number}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            )}
            {student_guardian_name && (
                <>
                    <Grid container item xs={12} lg={6} spacing={2}>
                        <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                            <Grid item>
                                <IconId />
                            </Grid>
                            <Grid item sm>
                                <Typography variant="subtitle1" color="inherit">
                                    {student_guardian_name}
                                </Typography>
                                <Typography textTransform="capitalize" variant="caption">
                                    {!student_guardian_occupation ? 'No Occupation' : student_guardian_occupation}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} lg={6} spacing={2}>
                        <Grid container item xs={12} lg={6} alignItems="center" spacing={2}>
                            <Grid item>
                                <IconMail />
                            </Grid>
                            <Grid item sm>
                                <Typography variant="subtitle1" color="inherit">
                                    {!student_guardian_email_address ? 'No Email Address' : student_guardian_email_address}
                                </Typography>
                                <Typography textTransform="capitalize" variant="caption">
                                    {!student_guardian_contact_number ? 'No Contact Number' : student_guardian_contact_number}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            )}
        </Grid>
    );
}

export default ReviewForm;