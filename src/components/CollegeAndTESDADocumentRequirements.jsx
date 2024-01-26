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
  Tooltip,
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

import {
  deleteBirthCertificate,
  deleteGoodMoralCertificate,
  deleteMarriageCertificate,
  deletePWDDocument,
  deleteReportCard,
  deleteTranscriptOfRecords,
  deleteTransferCredential,
  removeFileFromAWS,
  updateBirthCertificate,
  updateGoodMoralCertificate,
  updateMarriageCertificate,
  updatePWDDocument,
  updateReportCard,
  updateTranscriptOfRecords,
  updateTransferCredential,
} from '../features/fileUploadFeatures/fileUploadSlice';
import FilePreviewModal from './FilePreviewModal';
import FileUploadComponent from './FileUploadComponent';
import { ExternalLinkComponent } from './OtherComponents';
import AntSwitchComponent from './utilities/AntSwitch';

const CollegeDocumentRequirements = ({
  student_type,
  isAdmissionsAdmin,
  isPWDStudent,
  isApplicant,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [reportCard, setReportCard] = useState(null);
  const [birthCertificate, setBirthCertificate] = useState(null);
  const [marriageCertificate, setMarriageCertificate] = useState(null);
  const [goodMoralCertificate, setGoodMoralCertificate] = useState(null);
  const [transcriptOfRecords, setTranscriptOfRecords] = useState(null);
  const [transferCredential, setTransferCredential] = useState(null);
  const [PWDDocument, setPWDDocument] = useState(null);
  const [report_card_remarks, setReportCardRemarks] = useState('');
  const [birth_certificate_remarks, setBirthCertificateRemarks] = useState('');
  const [marriage_certificate_remarks, setMarriageCertificateRemarks] =
    useState('');
  const [good_moral_certificate_remarks, setGoodMoralCertificateRemarks] =
    useState('');
  const [transcript_of_records_remarks, setTranscriptOfRecordsRemarks] =
    useState('');
  const [transfer_credential_remarks, setTransferCredentialRemarks] =
    useState('');
  const [pwd_document_remarks, setPWDDocumentRemarks] = useState('');

  const {
    studentProfile: { _id: student_id },
  } = useSelector((state) => state.registrar);
  const {
    studentProfile: { _id: admissions_student_id },
  } = useSelector((state) => state.admissions);
  const {
    student_report_card,
    student_birth_certificate,
    student_good_moral_certificate,
    student_marriage_certificate,
    student_transcript_of_records,
    student_transfer_credential,
    student_pwd_document,
  } = useSelector((state) => state.fileUpload);
  const {
    userProfile: { _id: userId },
  } = useSelector((state) => state.users);

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
              <TableCell sx={{ maxWidth: '70px' }}>Actions</TableCell>
              {isAdmissionsAdmin && !isApplicant && (
                <TableCell>Approve/Decline</TableCell>
              )}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Report Card */}
            {student_type === 'New' && (
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
                      <Stack
                        direction={'row'}
                        spacing={1}
                        alignItems={'center'}
                      >
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
                      <Stack
                        direction={'row'}
                        spacing={1}
                        alignItems={'center'}
                      >
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
                  {student_report_card?._id ? (
                    <Stack
                      direction={{
                        xs: 'column',
                        sm: 'row',
                      }}
                      spacing={1}
                      alignItems="center"
                    >
                      <Tooltip title="View File">
                        <IconButton
                          variant="outlined"
                          color="primary"
                          onClick={() =>
                            handleModalOpen(student_report_card.filePath)
                          }
                        >
                          <IconFiles />
                        </IconButton>
                      </Tooltip>

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
                              student_report_card?.firstApprovalStatus || ''
                            }
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

                        <FormControl fullWidth size="small">
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
                          dispatch(
                            updateReportCard({
                              id: student_report_card._id,
                              hardCopySubmitted:
                                !student_report_card?.hardCopySubmitted,
                            })
                          );
                        }}
                      />
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            )}

            {/* TOR and Transfer Credential */}
            {student_type === 'Transferee' && (
              <>
                <TableRow>
                  <TableCell>Transcript of Records/Copy of Grades</TableCell>
                  <TableCell>
                    {student_transcript_of_records?._id
                      ? student_transcript_of_records.status
                      : 'Pending Upload'}
                  </TableCell>
                  {!isApplicant && !isAdmissionsAdmin && (
                    <TableCell sx={{ py: 0, px: 1 }}>
                      {/* Document Remarks */}
                      {student_transcript_of_records?.remarks && (
                        <Stack
                          direction={'row'}
                          spacing={1}
                          alignItems={'center'}
                        >
                          <Typography variant="body2">
                            {student_transcript_of_records?.remarks}
                          </Typography>

                          {!isAdmissionsAdmin && (
                            <Stack spacing={1}>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => {
                                  setTranscriptOfRecordsRemarks(
                                    student_transcript_of_records?.remarks
                                  );
                                  dispatch(
                                    updateTranscriptOfRecords({
                                      id: student_transcript_of_records._id,
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
                                    updateTranscriptOfRecords({
                                      id: student_transcript_of_records._id,
                                      remarks: '',
                                    })
                                  );
                                  setTranscriptOfRecordsRemarks('');
                                }}
                              >
                                <IconTrash />
                              </IconButton>
                            </Stack>
                          )}
                        </Stack>
                      )}

                      {!student_transcript_of_records?.remarks && (
                        <Stack
                          direction={'row'}
                          spacing={1}
                          alignItems={'center'}
                        >
                          <TextField
                            label="Remarks"
                            id="remarks"
                            value={transcript_of_records_remarks}
                            name="remarks"
                            onChange={(e) =>
                              setTranscriptOfRecordsRemarks(e.target.value)
                            }
                            size="small"
                          />

                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                              dispatch(
                                updateTranscriptOfRecords({
                                  id: student_transcript_of_records._id,
                                  remarks: transcript_of_records_remarks,
                                })
                              );
                            }}
                            disabled={!student_transcript_of_records?._id}
                          >
                            Save
                          </Button>
                        </Stack>
                      )}
                    </TableCell>
                  )}

                  <TableCell>
                    {student_transcript_of_records?._id ? (
                      <Stack
                        direction={{
                          xs: 'column',
                          sm: 'row',
                        }}
                        spacing={1}
                        alignItems="center"
                      >
                        <Tooltip title="View File">
                          <IconButton
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                              handleModalOpen(
                                student_transcript_of_records.filePath
                              )
                            }
                          >
                            <IconFiles />
                          </IconButton>
                        </Tooltip>

                        <ExternalLinkComponent
                          to={student_transcript_of_records.filePath}
                        >
                          <IconCloudDownload color="#0b7a39" />
                        </ExternalLinkComponent>

                        <IconButton
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            handleDelete(
                              student_transcript_of_records.fileName
                            );
                            dispatch(
                              deleteTranscriptOfRecords(
                                student_transcript_of_records._id
                              )
                            );
                          }}
                        >
                          <IconTrash />
                        </IconButton>
                      </Stack>
                    ) : (
                      <FileUploadComponent
                        file={transcriptOfRecords}
                        setFile={setTranscriptOfRecords}
                        path="transcript_of_records"
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
                                student_transcript_of_records?.firstApprovalStatus ||
                                ''
                              }
                              onChange={(e) => {
                                dispatch(
                                  updateTranscriptOfRecords({
                                    id: student_transcript_of_records._id,
                                    firstApprovalStatus: e.target.value,
                                    firstApprovedBy: userId,
                                    firstApprovedDate: new Date(),
                                  })
                                );
                              }}
                              disabled={
                                student_transcript_of_records?.firstApprovalStatus ===
                                  'approved' ||
                                student_transcript_of_records?.firstApprovalStatus ===
                                  'rejected' ||
                                !student_transcript_of_records?._id
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
                                student_transcript_of_records?.secondApprovalStatus ||
                                ''
                              }
                              onChange={(e) => {
                                dispatch(
                                  updateTranscriptOfRecords({
                                    id: student_transcript_of_records._id,
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
                                student_transcript_of_records?.secondApprovalStatus ===
                                  'rejected' ||
                                student_transcript_of_records?.secondApprovalStatus ===
                                  'approved' ||
                                !student_transcript_of_records?._id
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
                          value={
                            student_transcript_of_records?.softCopySubmitted
                          }
                          onClick={() => {
                            dispatch(
                              updateTranscriptOfRecords({
                                id: student_transcript_of_records._id,
                                softCopySubmitted:
                                  !student_transcript_of_records?.softCopySubmitted,
                              })
                            );
                          }}
                        />

                        <AntSwitchComponent
                          start=""
                          end="Hard Copy"
                          value={
                            student_transcript_of_records?.hardCopySubmitted
                          }
                          onClick={() => {
                            dispatch(
                              updateTranscriptOfRecords({
                                id: student_transcript_of_records._id,
                                hardCopySubmitted:
                                  !student_transcript_of_records?.hardCopySubmitted,
                              })
                            );
                          }}
                        />
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>

                {/* Transfer Credential */}
                <TableRow>
                  <TableCell>Transfer Credential</TableCell>
                  <TableCell>
                    {student_transfer_credential?._id
                      ? student_transfer_credential.status
                      : 'Pending Upload'}
                  </TableCell>
                  {!isApplicant && !isAdmissionsAdmin && (
                    <TableCell sx={{ py: 0, px: 1 }}>
                      {/* Document Remarks */}
                      {student_transfer_credential?.remarks && (
                        <Stack
                          direction={'row'}
                          spacing={1}
                          alignItems={'center'}
                        >
                          <Typography variant="body2">
                            {student_transfer_credential?.remarks}
                          </Typography>

                          {!isAdmissionsAdmin && (
                            <Stack spacing={1}>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => {
                                  setTransferCredentialRemarks(
                                    student_transfer_credential?.remarks
                                  );
                                  dispatch(
                                    updateTransferCredential({
                                      id: student_transfer_credential._id,
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
                                    updateTransferCredential({
                                      id: student_transfer_credential._id,
                                      remarks: '',
                                    })
                                  );
                                  setTransferCredentialRemarks('');
                                }}
                              >
                                <IconTrash />
                              </IconButton>
                            </Stack>
                          )}
                        </Stack>
                      )}

                      {!student_transfer_credential?.remarks && (
                        <Stack
                          direction={'row'}
                          spacing={1}
                          alignItems={'center'}
                        >
                          <TextField
                            label="Remarks"
                            id="remarks"
                            value={transfer_credential_remarks}
                            name="remarks"
                            onChange={(e) =>
                              setTransferCredentialRemarks(e.target.value)
                            }
                            size="small"
                          />

                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                              dispatch(
                                updateTransferCredential({
                                  id: student_transfer_credential._id,
                                  remarks: transfer_credential_remarks,
                                })
                              );
                            }}
                            disabled={!student_transfer_credential?._id}
                          >
                            Save
                          </Button>
                        </Stack>
                      )}
                    </TableCell>
                  )}

                  <TableCell>
                    {student_transfer_credential?._id ? (
                      <Stack
                        direction={{
                          xs: 'column',
                          sm: 'row',
                        }}
                        spacing={1}
                        alignItems="center"
                      >
                        <Tooltip title="View File">
                          <IconButton
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                              handleModalOpen(
                                student_transfer_credential.filePath
                              )
                            }
                          >
                            <IconFiles />
                          </IconButton>
                        </Tooltip>

                        <ExternalLinkComponent
                          to={student_transfer_credential.filePath}
                        >
                          <IconCloudDownload color="#0b7a39" />
                        </ExternalLinkComponent>

                        <IconButton
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            handleDelete(student_transfer_credential.fileName);
                            dispatch(
                              deleteTransferCredential(
                                student_transfer_credential._id
                              )
                            );
                          }}
                        >
                          <IconTrash />
                        </IconButton>
                      </Stack>
                    ) : (
                      <FileUploadComponent
                        file={transferCredential}
                        setFile={setTransferCredential}
                        path="transfer_credential"
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
                                student_transfer_credential?.firstApprovalStatus ||
                                ''
                              }
                              onChange={(e) => {
                                dispatch(
                                  updateTransferCredential({
                                    id: student_transfer_credential._id,
                                    firstApprovalStatus: e.target.value,
                                    firstApprovedBy: userId,
                                    firstApprovedDate: new Date(),
                                  })
                                );
                              }}
                              disabled={
                                student_transfer_credential?.firstApprovalStatus ===
                                  'approved' ||
                                student_transfer_credential?.firstApprovalStatus ===
                                  'rejected' ||
                                !student_transfer_credential?._id
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
                                student_transfer_credential?.secondApprovalStatus ||
                                ''
                              }
                              onChange={(e) => {
                                dispatch(
                                  updateTransferCredential({
                                    id: student_transfer_credential._id,
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
                                student_transfer_credential?.secondApprovalStatus ===
                                  'rejected' ||
                                student_transfer_credential?.secondApprovalStatus ===
                                  'approved' ||
                                !student_transfer_credential?._id
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
                          value={student_transfer_credential?.softCopySubmitted}
                          onClick={() => {
                            dispatch(
                              updateTransferCredential({
                                id: student_transfer_credential._id,
                                softCopySubmitted:
                                  !student_transfer_credential?.softCopySubmitted,
                              })
                            );
                          }}
                        />

                        <AntSwitchComponent
                          start=""
                          end="Hard Copy"
                          value={student_transfer_credential?.hardCopySubmitted}
                          onClick={() => {
                            dispatch(
                              updateTransferCredential({
                                id: student_transfer_credential._id,
                                hardCopySubmitted:
                                  !student_transfer_credential?.hardCopySubmitted,
                              })
                            );
                          }}
                        />
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              </>
            )}

            {/* Birth Certificate */}
            <TableRow>
              <TableCell>Photocopy of PSA/NSO Birth Certificate</TableCell>
              <TableCell>
                {student_birth_certificate?._id
                  ? student_birth_certificate.status
                  : 'Pending Upload'}
              </TableCell>
              {!isApplicant && !isAdmissionsAdmin && (
                <TableCell sx={{ py: 0, px: 1 }}>
                  {/* Document Remarks */}
                  {student_birth_certificate?.remarks && (
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <Typography variant="body2">
                        {student_birth_certificate?.remarks}
                      </Typography>

                      {!isAdmissionsAdmin && (
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
                      )}
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
                {student_birth_certificate?._id ? (
                  <Stack
                    direction={{
                      xs: 'column',
                      sm: 'row',
                    }}
                    spacing={1}
                    alignItems="center"
                  >
                    <Tooltip title="View File">
                      <IconButton
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          handleModalOpen(student_birth_certificate.filePath)
                        }
                      >
                        <IconFiles />
                      </IconButton>
                    </Tooltip>

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
                        dispatch(
                          updateBirthCertificate({
                            id: student_birth_certificate._id,
                            hardCopySubmitted:
                              !student_birth_certificate?.hardCopySubmitted,
                          })
                        );
                      }}
                    />
                  </Stack>
                </TableCell>
              )}
            </TableRow>

            {/* Good Moral Certificate */}
            <TableRow>
              <TableCell>Certificate of Good Moral Character</TableCell>
              <TableCell>
                {student_good_moral_certificate?._id
                  ? student_good_moral_certificate.status
                  : 'Pending Upload'}
              </TableCell>
              {!isApplicant && !isAdmissionsAdmin && (
                <TableCell sx={{ py: 0, px: 1 }}>
                  {/* Document Remarks */}
                  {student_good_moral_certificate?.remarks && (
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <Typography variant="body2">
                        {student_good_moral_certificate?.remarks}
                      </Typography>

                      {!isAdmissionsAdmin && (
                        <Stack spacing={1}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              setGoodMoralCertificateRemarks(
                                student_good_moral_certificate?.remarks
                              );
                              dispatch(
                                updateGoodMoralCertificate({
                                  id: student_good_moral_certificate._id,
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
                                updateGoodMoralCertificate({
                                  id: student_good_moral_certificate._id,
                                  remarks: '',
                                })
                              );
                              setGoodMoralCertificateRemarks('');
                            }}
                          >
                            <IconTrash />
                          </IconButton>
                        </Stack>
                      )}
                    </Stack>
                  )}

                  {!student_good_moral_certificate?.remarks && (
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <TextField
                        label="Remarks"
                        id="remarks"
                        value={good_moral_certificate_remarks}
                        name="remarks"
                        onChange={(e) =>
                          setGoodMoralCertificateRemarks(e.target.value)
                        }
                        size="small"
                      />

                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          dispatch(
                            updateGoodMoralCertificate({
                              id: student_good_moral_certificate._id,
                              remarks: good_moral_certificate_remarks,
                            })
                          );
                        }}
                        disabled={!student_good_moral_certificate?._id}
                      >
                        Save
                      </Button>
                    </Stack>
                  )}
                </TableCell>
              )}

              <TableCell>
                {student_good_moral_certificate?._id ? (
                  <Stack
                    direction={{
                      xs: 'column',
                      sm: 'row',
                    }}
                    spacing={1}
                    alignItems="center"
                  >
                    <Tooltip title="View File">
                      <IconButton
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          handleModalOpen(
                            student_good_moral_certificate.filePath
                          )
                        }
                      >
                        <IconFiles />
                      </IconButton>
                    </Tooltip>

                    <ExternalLinkComponent
                      to={student_good_moral_certificate.filePath}
                    >
                      <IconCloudDownload color="#0b7a39" />
                    </ExternalLinkComponent>

                    <IconButton
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        handleDelete(student_good_moral_certificate.fileName);
                        dispatch(
                          deleteGoodMoralCertificate(
                            student_good_moral_certificate._id
                          )
                        );
                      }}
                    >
                      <IconTrash />
                    </IconButton>
                  </Stack>
                ) : (
                  <FileUploadComponent
                    file={goodMoralCertificate}
                    setFile={setGoodMoralCertificate}
                    path="good_moral_certificate"
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
                            student_good_moral_certificate?.firstApprovalStatus ||
                            ''
                          }
                          onChange={(e) => {
                            dispatch(
                              updateGoodMoralCertificate({
                                id: student_good_moral_certificate._id,
                                firstApprovalStatus: e.target.value,
                                firstApprovedBy: userId,
                                firstApprovedDate: new Date(),
                              })
                            );
                          }}
                          disabled={
                            student_good_moral_certificate?.firstApprovalStatus ===
                              'approved' ||
                            student_good_moral_certificate?.firstApprovalStatus ===
                              'rejected' ||
                            !student_good_moral_certificate?._id
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
                            student_good_moral_certificate?.secondApprovalStatus ||
                            ''
                          }
                          onChange={(e) => {
                            dispatch(
                              updateGoodMoralCertificate({
                                id: student_good_moral_certificate._id,
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
                            student_good_moral_certificate?.secondApprovalStatus ===
                              'rejected' ||
                            student_good_moral_certificate?.secondApprovalStatus ===
                              'approved' ||
                            !student_good_moral_certificate?._id
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
                      value={student_good_moral_certificate?.softCopySubmitted}
                      onClick={() => {
                        dispatch(
                          updateGoodMoralCertificate({
                            id: student_good_moral_certificate._id,
                            softCopySubmitted:
                              !student_good_moral_certificate?.softCopySubmitted,
                          })
                        );
                      }}
                    />

                    <AntSwitchComponent
                      start=""
                      end="Hard Copy"
                      value={student_good_moral_certificate?.hardCopySubmitted}
                      onClick={() => {
                        dispatch(
                          updateGoodMoralCertificate({
                            id: student_good_moral_certificate._id,
                            hardCopySubmitted:
                              !student_good_moral_certificate?.hardCopySubmitted,
                          })
                        );
                      }}
                    />
                  </Stack>
                </TableCell>
              )}
            </TableRow>

            {/* Marriage Certificate */}
            <TableRow>
              <TableCell>
                PSA/NSO Marriage Certificate (for married female)
              </TableCell>
              <TableCell>
                {student_marriage_certificate?._id
                  ? student_marriage_certificate.status
                  : 'Pending Upload'}
              </TableCell>
              {!isApplicant && !isAdmissionsAdmin && (
                <TableCell sx={{ py: 0, px: 1 }}>
                  {/* Document Remarks */}
                  {student_marriage_certificate?.remarks && (
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <Typography variant="body2">
                        {student_marriage_certificate?.remarks}
                      </Typography>

                      {!isAdmissionsAdmin && (
                        <Stack spacing={1}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => {
                              setMarriageCertificateRemarks(
                                student_marriage_certificate?.remarks
                              );
                              dispatch(
                                updateMarriageCertificate({
                                  id: student_marriage_certificate._id,
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
                                updateMarriageCertificate({
                                  id: student_marriage_certificate._id,
                                  remarks: '',
                                })
                              );
                              setMarriageCertificateRemarks('');
                            }}
                          >
                            <IconTrash />
                          </IconButton>
                        </Stack>
                      )}
                    </Stack>
                  )}

                  {!student_marriage_certificate?.remarks && (
                    <Stack direction={'row'} spacing={1} alignItems={'center'}>
                      <TextField
                        label="Remarks"
                        id="remarks"
                        value={marriage_certificate_remarks}
                        name="remarks"
                        onChange={(e) =>
                          setMarriageCertificateRemarks(e.target.value)
                        }
                        size="small"
                      />

                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          dispatch(
                            updateMarriageCertificate({
                              id: student_marriage_certificate._id,
                              remarks: marriage_certificate_remarks,
                            })
                          );
                        }}
                        disabled={!student_marriage_certificate?._id}
                      >
                        Save
                      </Button>
                    </Stack>
                  )}
                </TableCell>
              )}

              <TableCell>
                {student_marriage_certificate?._id ? (
                  <Stack
                    direction={{
                      xs: 'column',
                      sm: 'row',
                    }}
                    spacing={1}
                    alignItems="center"
                  >
                    <Tooltip title="View File">
                      <IconButton
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          handleModalOpen(student_marriage_certificate.filePath)
                        }
                      >
                        <IconFiles />
                      </IconButton>
                    </Tooltip>

                    <ExternalLinkComponent
                      to={student_marriage_certificate.filePath}
                    >
                      <IconCloudDownload color="#0b7a39" />
                    </ExternalLinkComponent>

                    <IconButton
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        handleDelete(student_marriage_certificate.fileName);
                        dispatch(
                          deleteMarriageCertificate(
                            student_marriage_certificate._id
                          )
                        );
                      }}
                    >
                      <IconTrash />
                    </IconButton>
                  </Stack>
                ) : (
                  <FileUploadComponent
                    file={marriageCertificate}
                    setFile={setMarriageCertificate}
                    path="marriage_certificate"
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
                            student_marriage_certificate?.firstApprovalStatus ||
                            ''
                          }
                          onChange={(e) => {
                            dispatch(
                              updateMarriageCertificate({
                                id: student_marriage_certificate._id,
                                firstApprovalStatus: e.target.value,
                                firstApprovedBy: userId,
                                firstApprovedDate: new Date(),
                              })
                            );
                          }}
                          disabled={
                            student_marriage_certificate?.firstApprovalStatus ===
                              'approved' ||
                            student_marriage_certificate?.firstApprovalStatus ===
                              'rejected' ||
                            !student_marriage_certificate?._id
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
                            student_marriage_certificate?.secondApprovalStatus ||
                            ''
                          }
                          onChange={(e) => {
                            dispatch(
                              updateMarriageCertificate({
                                id: student_marriage_certificate._id,
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
                            student_marriage_certificate?.secondApprovalStatus ===
                              'rejected' ||
                            student_marriage_certificate?.secondApprovalStatus ===
                              'approved' ||
                            !student_marriage_certificate?._id
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
                      value={student_marriage_certificate?.softCopySubmitted}
                      onClick={() => {
                        dispatch(
                          updateMarriageCertificate({
                            id: student_marriage_certificate._id,
                            softCopySubmitted:
                              !student_marriage_certificate?.softCopySubmitted,
                          })
                        );
                      }}
                    />

                    <AntSwitchComponent
                      start=""
                      end="Hard Copy"
                      value={student_marriage_certificate?.hardCopySubmitted}
                      onClick={() => {
                        dispatch(
                          updateMarriageCertificate({
                            id: student_marriage_certificate._id,
                            hardCopySubmitted:
                              !student_marriage_certificate?.hardCopySubmitted,
                          })
                        );
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

export default CollegeDocumentRequirements;
