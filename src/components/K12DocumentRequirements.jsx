import {
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  IconCloudDownload,
  IconEdit,
  IconFiles,
  IconSquareCheck,
  IconSquareX,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleChange } from 'src/features/registrarFeatures/registrarSlice';
import {
  deleteBirthCertificate,
  deletePWDDocument,
  deleteReportCard,
  removeFileFromAWS,
  saveBirthCertificate,
  saveReportCard,
  updateBirthCertificate,
  updatePWDDocument,
  updateReportCard,
} from '../features/fileUploadFeatures/fileUploadSlice';
import FilePreviewModal from './FilePreviewModal';
import FileUploadComponent from './FileUploadComponent';
import { ExternalLinkComponent } from './OtherComponents';
import AntSwitchComponent from './utilities/AntSwitch';

const K12DocumentRequirements = ({
  isAdmissionsAdmin,
  isPWDStudent,
  isApplicant,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [reportCard, setReportCard] = useState(null);
  const [PWDDocument, setPWDDocument] = useState(null);
  const [birthCertificate, setBirthCertificate] = useState(null);
  const [report_card_remarks, setReportCardRemarks] = useState('');
  const [birth_certificate_remarks, setBirthCertificateRemarks] = useState('');
  const [pwd_document_remarks, setPWDDocumentRemarks] = useState('');

  const {
    studentProfile: { _id: student_id },
  } = useSelector((state) => state.registrar);
  const {
    studentProfile: { _id: admissions_student_id },
  } = useSelector((state) => state.admissions);
  const {
    userProfile: { _id: userId },
  } = useSelector((state) => state.users);
  const {
    student_birth_certificate,
    student_report_card,
    student_pwd_document,
  } = useSelector((state) => state.fileUpload);

  const handleModalOpen = (url) => {
    setImageUrl(url);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (fileName) => {
    dispatch(
      removeFileFromAWS({
        key: `academic-documents/${fileName}`,
      })
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Stack mt={2}>
      {/* File Preview Component */}
      <FilePreviewModal
        open={isModalOpen}
        handleClose={handleModalClose}
        url={imageUrl}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Document</TableCell>
              <TableCell>Status</TableCell>
              {!isApplicant && !isAdmissionsAdmin && (
                <TableCell>Remarks</TableCell>
              )}
              <TableCell>Actions</TableCell>
              {isAdmissionsAdmin && !isApplicant && (
                <TableCell>Approve/Decline</TableCell>
              )}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Report Card */}

            <TableRow>
              <TableCell>
                Original Report Card/School Form9 (Form 138/SF)
              </TableCell>
              <TableCell>
                {student_report_card?._id
                  ? student_report_card.status
                  : 'Pending Upload'}
              </TableCell>
              {!isApplicant && !isAdmissionsAdmin && (
                <TableCell sx={{ py: 0, px: 1 }}>
                  {/* Document Remarks */}
                  {student_report_card?.remarks && (
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <Typography variant="body2">
                        {student_report_card?.remarks}
                      </Typography>

                      {!isAdmissionsAdmin && (
                        <Stack spacing={1}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              setReportCardRemarks(
                                student_report_card?.remarks
                              );
                              dispatch(
                                updateReportCard({
                                  id: student_report_card._id,
                                  remarks: '',
                                })
                              );
                            }}
                          >
                            <IconEdit />
                          </IconButton>

                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => {
                              dispatch(
                                updateReportCard({
                                  id: student_report_card._id,
                                  remarks: '',
                                })
                              );
                              setReportCardRemarks('');
                            }}
                          >
                            <IconTrash />
                          </IconButton>
                        </Stack>
                      )}
                    </Stack>
                  )}

                  {!student_report_card?.remarks && (
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <TextField
                        label="Remarks"
                        id="remarks"
                        value={report_card_remarks}
                        name="remarks"
                        onChange={(e) => setReportCardRemarks(e.target.value)}
                        size="small"
                      />

                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          dispatch(
                            updateReportCard({
                              id: student_report_card._id,
                              remarks: report_card_remarks,
                            })
                          );
                        }}
                        disabled={!student_report_card?._id}
                      >
                        Save
                      </Button>
                    </Stack>
                  )}
                </TableCell>
              )}
              <TableCell>
                {student_report_card?.filePath ? (
                  <Stack
                    direction={{
                      xs: 'column',
                      sm: 'row',
                    }}
                    spacing={1}
                    alignItems="center"
                  >
                    <IconButton
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        handleModalOpen(student_report_card.filePath)
                      }
                    >
                      <IconFiles />
                    </IconButton>

                    <ExternalLinkComponent to={student_report_card.filePath}>
                      <IconCloudDownload color="#0b7a39" />
                    </ExternalLinkComponent>

                    <IconButton
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        handleDelete(student_report_card.fileName);
                        dispatch(deleteReportCard(student_report_card._id));
                      }}
                    >
                      <IconTrash />
                    </IconButton>
                  </Stack>
                ) : (
                  <FileUploadComponent
                    file={reportCard}
                    setFile={setReportCard}
                    path="report_card"
                    student_id={admissions_student_id ?? student_id}
                    updateDocument={
                      student_report_card?.hardCopySubmitted
                        ? student_report_card?._id
                        : null
                    }
                  />
                )}
              </TableCell>

              {isAdmissionsAdmin && !isApplicant && (
                <TableCell>
                  <Grid item xs={12}>
                    <Stack
                      direction={{
                        xs: 'column',
                        sm: 'row',
                      }}
                      spacing={1}
                      alignItems="center"
                    >
                      <FormControl size="small" fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="first-approval-status"
                          value={student_report_card?.firstApprovalStatus || ''}
                          onChange={(e) => {
                            dispatch(
                              updateReportCard({
                                id: student_report_card._id,
                                firstApprovalStatus: e.target.value,
                                firstApprovedBy: userId,
                                firstApprovedDate: new Date(),
                              })
                            );
                          }}
                          disabled={
                            student_report_card?.firstApprovalStatus ===
                              'approved' ||
                            student_report_card?.firstApprovalStatus ===
                              'rejected' ||
                            !student_report_card?._id
                          }
                        >
                          <MenuItem value="approved">
                            <IconSquareCheck color="#0b7a39" />
                          </MenuItem>
                          <MenuItem value="rejected">
                            <IconSquareX color="#f44336" />
                          </MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl size="small" fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={
                            student_report_card?.secondApprovalStatus || ''
                          }
                          onChange={(e) => {
                            dispatch(
                              updateReportCard({
                                id: student_report_card._id,
                                secondApprovalStatus: e.target.value,
                                secondApprovedBy: userId,
                                secondApprovedDate: new Date(),
                                status:
                                  e.target.value === 'approved'
                                    ? 'Document Approved'
                                    : 'Declined',
                              })
                            );
                          }}
                          disabled={
                            student_report_card?.secondApprovalStatus ===
                              'rejected' ||
                            student_report_card?.secondApprovalStatus ===
                              'approved' ||
                            !student_report_card?._id
                          }
                        >
                          <MenuItem value="approved">
                            <IconSquareCheck color="#0b7a39" />
                          </MenuItem>
                          <MenuItem value="rejected">
                            <IconSquareX color="#f44336" />
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </Grid>
                </TableCell>
              )}

              {!isApplicant && (
                <TableCell>
                  <Stack spacing={1}>
                    <AntSwitchComponent
                      start=""
                      end="Soft Copy"
                      value={student_report_card?.softCopySubmitted}
                      onClick={() => {
                        dispatch(
                          updateReportCard({
                            id: student_report_card._id,
                            softCopySubmitted:
                              !student_report_card?.softCopySubmitted,
                          })
                        );
                      }}
                    />

                    <AntSwitchComponent
                      start=""
                      end="Hard Copy"
                      value={student_report_card?.hardCopySubmitted}
                      onClick={() => {
                        if (!student_report_card?._id) {
                          dispatch(
                            saveReportCard({
                              studentId: admissions_student_id ?? student_id,
                              status: 'Document Submitted',
                              hardCopySubmitted: true,
                              softCopySubmitted: false,
                            })
                          );
                        } else {
                          dispatch(
                            updateReportCard({
                              id: student_report_card._id,
                              hardCopySubmitted:
                                !student_report_card?.hardCopySubmitted,
                            })
                          );
                        }
                      }}
                    />
                  </Stack>
                </TableCell>
              )}
            </TableRow>

            {/* Birth Certificate */}

            <TableRow>
              <TableCell>Photocopy of PSA Birth Certificate</TableCell>
              <TableCell>
                {student_birth_certificate?._id
                  ? student_birth_certificate.status
                  : 'Pending Upload'}
              </TableCell>
              {!isAdmissionsAdmin && !isApplicant && (
                <TableCell sx={{ py: 0, px: 1 }}>
                  {/* Document Remarks */}
                  {student_birth_certificate?.remarks && (
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <Typography variant="body2">
                        {student_birth_certificate?.remarks}
                      </Typography>

                      <Stack spacing={1}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {
                            setBirthCertificateRemarks(
                              student_birth_certificate?.remarks
                            );
                            dispatch(
                              updateBirthCertificate({
                                id: student_birth_certificate._id,
                                remarks: '',
                              })
                            );
                          }}
                        >
                          <IconEdit />
                        </IconButton>

                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            dispatch(
                              updateBirthCertificate({
                                id: student_birth_certificate._id,
                                remarks: '',
                              })
                            );
                            setBirthCertificateRemarks('');
                          }}
                        >
                          <IconTrash />
                        </IconButton>
                      </Stack>
                    </Stack>
                  )}

                  {!student_birth_certificate?.remarks && (
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <TextField
                        label="Remarks"
                        id="remarks"
                        value={birth_certificate_remarks}
                        name="remarks"
                        onChange={(e) =>
                          setBirthCertificateRemarks(e.target.value)
                        }
                        size="small"
                      />

                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          dispatch(
                            updateBirthCertificate({
                              id: student_birth_certificate._id,
                              remarks: birth_certificate_remarks,
                            })
                          );
                        }}
                        disabled={!student_birth_certificate?._id}
                      >
                        Save
                      </Button>
                    </Stack>
                  )}
                </TableCell>
              )}

              <TableCell>
                {student_birth_certificate?.filePath ? (
                  <Stack
                    direction={{
                      xs: 'column',
                      sm: 'row',
                    }}
                    spacing={1}
                    alignItems="center"
                  >
                    <IconButton
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        handleModalOpen(student_birth_certificate.filePath)
                      }
                    >
                      <IconFiles />
                    </IconButton>

                    <ExternalLinkComponent
                      to={student_birth_certificate.filePath}
                    >
                      <IconCloudDownload color="#0b7a39" />
                    </ExternalLinkComponent>

                    <IconButton
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        handleDelete(student_birth_certificate.fileName);
                        dispatch(
                          deleteBirthCertificate(student_birth_certificate._id)
                        );
                      }}
                    >
                      <IconTrash />
                    </IconButton>
                  </Stack>
                ) : (
                  <FileUploadComponent
                    file={birthCertificate}
                    setFile={setBirthCertificate}
                    path="birth_certificate"
                    student_id={admissions_student_id ?? student_id}
                  />
                )}
              </TableCell>

              {isAdmissionsAdmin && !isApplicant && (
                <TableCell>
                  <Grid item xs={12}>
                    <Stack
                      direction={{
                        xs: 'column',
                        sm: 'row',
                      }}
                      spacing={1}
                      alignItems="center"
                    >
                      <FormControl fullWidth size="small">
                        <Select
                          labelId="demo-simple-select-label"
                          id="first-approval-status"
                          value={
                            student_birth_certificate?.firstApprovalStatus || ''
                          }
                          onChange={(e) => {
                            dispatch(
                              updateBirthCertificate({
                                id: student_birth_certificate._id,
                                firstApprovalStatus: e.target.value,
                                firstApprovedBy: userId,
                                firstApprovedDate: new Date(),
                              })
                            );
                          }}
                          disabled={
                            student_birth_certificate?.firstApprovalStatus ===
                              'approved' ||
                            student_birth_certificate?.firstApprovalStatus ===
                              'rejected' ||
                            !student_birth_certificate?._id
                          }
                        >
                          <MenuItem value="approved">
                            <IconSquareCheck color="#0b7a39" />
                          </MenuItem>
                          <MenuItem value="rejected">
                            <IconSquareX color="#f44336" />
                          </MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl fullWidth size="small">
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={
                            student_birth_certificate?.secondApprovalStatus ||
                            ''
                          }
                          onChange={(e) => {
                            dispatch(
                              updateBirthCertificate({
                                id: student_birth_certificate._id,
                                secondApprovalStatus: e.target.value,
                                secondApprovedBy: userId,
                                secondApprovedDate: new Date(),
                                status:
                                  e.target.value === 'approved'
                                    ? 'Document Approved'
                                    : 'Declined',
                              })
                            );
                          }}
                          disabled={
                            student_birth_certificate?.secondApprovalStatus ===
                              'rejected' ||
                            student_birth_certificate?.secondApprovalStatus ===
                              'approved' ||
                            !student_birth_certificate?._id
                          }
                        >
                          <MenuItem value="approved">
                            <IconSquareCheck color="#0b7a39" />
                          </MenuItem>
                          <MenuItem value="rejected">
                            <IconSquareX color="#f44336" />
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                  </Grid>
                </TableCell>
              )}

              {!isApplicant && (
                <TableCell>
                  <Stack spacing={1}>
                    <AntSwitchComponent
                      start=""
                      end="Soft Copy"
                      value={student_birth_certificate?.softCopySubmitted}
                      onClick={() => {
                        dispatch(
                          updateBirthCertificate({
                            id: student_birth_certificate._id,
                            softCopySubmitted:
                              !student_birth_certificate?.softCopySubmitted,
                          })
                        );
                      }}
                    />

                    <AntSwitchComponent
                      start=""
                      end="Hard Copy"
                      value={student_birth_certificate?.hardCopySubmitted}
                      onClick={() => {
                        if (!student_report_card?._id) {
                          dispatch(
                            saveBirthCertificate({
                              studentId: admissions_student_id ?? student_id,
                              status: 'Document Submitted',
                              hardCopySubmitted: true,
                            })
                          );
                        } else {
                          dispatch(
                            updateBirthCertificate({
                              id: student_birth_certificate._id,
                              hardCopySubmitted:
                                !student_birth_certificate?.hardCopySubmitted,
                            })
                          );
                        }
                      }}
                    />
                  </Stack>
                </TableCell>
              )}
            </TableRow>

            {/* PWD Student DOCS */}

            {isPWDStudent && (
              <TableRow>
                <TableCell>Person with Disabilities (PWD) Document</TableCell>
                <TableCell>
                  {student_pwd_document?._id
                    ? student_pwd_document.status
                    : 'Pending Upload'}
                </TableCell>
                {!isApplicant && !isAdmissionsAdmin && (
                  <TableCell sx={{ py: 0, px: 1 }}>
                    {/* Document Remarks */}
                    {student_pwd_document?.remarks && (
                      <Stack
                        direction={'row'}
                        spacing={1}
                        alignItems={'center'}
                      >
                        <Typography variant="body2">
                          {student_pwd_document?.remarks}
                        </Typography>

                        {!isAdmissionsAdmin && (
                          <Stack spacing={1}>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                setPWDDocumentRemarks(
                                  student_pwd_document?.remarks
                                );
                                dispatch(
                                  updatePWDDocument({
                                    id: student_pwd_document._id,
                                    remarks: '',
                                  })
                                );
                              }}
                            >
                              <IconEdit />
                            </IconButton>

                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => {
                                dispatch(
                                  updatePWDDocument({
                                    id: student_pwd_document._id,
                                    remarks: '',
                                  })
                                );
                                setPWDDocumentRemarks('');
                              }}
                            >
                              <IconTrash />
                            </IconButton>
                          </Stack>
                        )}
                      </Stack>
                    )}

                    {!student_pwd_document?.remarks && (
                      <Stack
                        direction={'row'}
                        spacing={1}
                        alignItems={'center'}
                      >
                        <TextField
                          label="Remarks"
                          id="remarks"
                          value={pwd_document_remarks}
                          name="remarks"
                          onChange={(e) =>
                            setPWDDocumentRemarks(e.target.value)
                          }
                          size="small"
                        />

                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            dispatch(
                              updatePWDDocument({
                                id: student_pwd_document._id,
                                remarks: pwd_document_remarks,
                              })
                            );
                          }}
                          disabled={!student_pwd_document?._id}
                        >
                          Save
                        </Button>
                      </Stack>
                    )}
                  </TableCell>
                )}

                <TableCell>
                  {student_pwd_document?._id ? (
                    <Stack
                      direction={{
                        xs: 'column',
                        sm: 'row',
                      }}
                      spacing={1}
                      alignItems="center"
                    >
                      <IconButton
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          handleModalOpen(student_pwd_document.filePath)
                        }
                      >
                        <IconFiles />
                      </IconButton>

                      <ExternalLinkComponent to={student_pwd_document.filePath}>
                        <IconCloudDownload color="#0b7a39" />
                      </ExternalLinkComponent>

                      <IconButton
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          handleDelete(student_pwd_document.fileName);
                          dispatch(deletePWDDocument(student_pwd_document._id));
                        }}
                      >
                        <IconTrash />
                      </IconButton>
                    </Stack>
                  ) : (
                    <FileUploadComponent
                      file={PWDDocument}
                      setFile={setPWDDocument}
                      path="pwd_document"
                      student_id={admissions_student_id ?? student_id}
                    />
                  )}
                </TableCell>
                {isAdmissionsAdmin && (
                  <TableCell>
                    <Grid item xs={12}>
                      <Stack
                        direction={{
                          xs: 'column',
                          sm: 'row',
                        }}
                        spacing={1}
                        alignItems="center"
                      >
                        <FormControl fullWidth size="small">
                          <Select
                            labelId="demo-simple-select-label"
                            id="first-approval-status"
                            value={
                              student_pwd_document?.firstApprovalStatus || ''
                            }
                            onChange={(e) => {
                              dispatch(
                                updatePWDDocument({
                                  id: student_pwd_document._id,
                                  firstApprovalStatus: e.target.value,
                                  firstApprovedBy: userId,
                                  firstApprovedDate: new Date(),
                                })
                              );
                            }}
                            disabled={
                              student_pwd_document?.firstApprovalStatus ===
                                'approved' ||
                              student_pwd_document?.firstApprovalStatus ===
                                'rejected' ||
                              !student_pwd_document?._id
                            }
                          >
                            <MenuItem value="approved">
                              <IconSquareCheck color="#0b7a39" />
                            </MenuItem>
                            <MenuItem value="rejected">
                              <IconSquareX color="#f44336" />
                            </MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={
                              student_pwd_document?.secondApprovalStatus || ''
                            }
                            onChange={(e) => {
                              dispatch(
                                updatePWDDocument({
                                  id: student_pwd_document._id,
                                  secondApprovalStatus: e.target.value,
                                  secondApprovedBy: userId,
                                  secondApprovedDate: new Date(),
                                  status:
                                    e.target.value === 'approved'
                                      ? 'Document Approved'
                                      : 'Declined',
                                })
                              );
                            }}
                            disabled={
                              student_pwd_document?.secondApprovalStatus ===
                                'rejected' ||
                              student_pwd_document?.secondApprovalStatus ===
                                'approved' ||
                              !student_pwd_document?._id
                            }
                          >
                            <MenuItem value="approved">
                              <IconSquareCheck color="#0b7a39" />
                            </MenuItem>
                            <MenuItem value="rejected">
                              <IconSquareX color="#f44336" />
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Stack>
                    </Grid>
                  </TableCell>
                )}

                {!isApplicant && (
                  <TableCell>
                    <Stack spacing={1}>
                      <AntSwitchComponent
                        start=""
                        end="Soft Copy"
                        value={student_pwd_document?.softCopySubmitted}
                        onClick={() => {
                          dispatch(
                            updatePWDDocument({
                              id: student_pwd_document._id,
                              softCopySubmitted:
                                !student_pwd_document?.softCopySubmitted,
                            })
                          );
                        }}
                      />

                      <AntSwitchComponent
                        start=""
                        end="Hard Copy"
                        value={student_pwd_document?.hardCopySubmitted}
                        onClick={() => {
                          dispatch(
                            updatePWDDocument({
                              id: student_pwd_document._id,
                              hardCopySubmitted:
                                !student_pwd_document?.hardCopySubmitted,
                            })
                          );
                        }}
                      />
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default K12DocumentRequirements;
