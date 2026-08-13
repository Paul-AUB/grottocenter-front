import { useContext, useEffect, useState } from 'react';
import { usePapaParse } from 'react-papaparse';
import { useIntl } from 'react-intl';
import { Box, Typography } from '@mui/material';
import Alert from '../../../common/Alert';
import FileSelectorInput, {
  REJECTION_REASONS
} from '../../../common/FileSelectorInput';
import { ImportPageContentContext } from '../Provider';
import checkData from '../checkData';

const ACCEPT = { 'text/csv': ['.csv'] };
const EXTENSIONS = ['.csv'];

const formatBytes = bytes => {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(
    units.length - 1,
    Math.floor(Math.log(bytes) / Math.log(1024))
  );
  const value = bytes / 1024 ** exponent;
  return `${value.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
};

const Step2 = () => {
  const { updateAttribute, selectedType, importSession } = useContext(
    ImportPageContentContext
  );
  const { reset: resetImportSession } = importSession;
  const { formatMessage } = useIntl();
  const { readString } = usePapaParse();

  const [rowErrors, setRowErrors] = useState([]);
  const [rejectionError, setRejectionError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Clear any residual import state whenever the step mounts, so a batchId /
  // progress / result from a previous run does not leak into the next one.
  useEffect(() => {
    updateAttribute('importData', undefined);
    updateAttribute('fileImported', false);
    resetImportSession();
  }, [updateAttribute, resetImportSession]);

  const clearImportedFile = () => {
    setSelectedFile(null);
    setRowErrors([]);
    updateAttribute('importData', undefined);
    updateAttribute('fileImported', false);
    resetImportSession();
  };

  const parseFile = async file => {
    setRejectionError(null);
    setRowErrors([]);
    const text = await file.text();
    readString(text, {
      transformHeader: header => header.trim(),
      header: true,
      skipEmptyLines: true,
      complete: results => {
        const errors = [];
        if (results.errors.length !== 0) {
          const importErrors = results.errors.map(e => ({
            errorMessage: `Import error ${e.message}`,
            row: e.row + 2
          }));
          errors.push(...importErrors);
        }
        errors.push(...checkData(results.data, selectedType, formatMessage));
        if (errors.length === 0) {
          updateAttribute('importData', results.data);
          updateAttribute('fileImported', true);
          setRowErrors([]);
          setSelectedFile(file);
        } else {
          setRowErrors(errors);
          setSelectedFile(file);
          updateAttribute('importData', undefined);
          updateAttribute('fileImported', false);
        }
      }
    });
  };

  const handleFilesAdd = files => {
    const [file] = files;
    if (!file) return;
    parseFile(file);
  };

  const handleFileRejections = rejections => {
    const [rejection] = rejections;
    if (!rejection) return;
    setSelectedFile(null);
    updateAttribute('importData', undefined);
    updateAttribute('fileImported', false);
    if (rejection.reasons.includes(REJECTION_REASONS.TYPE_NOT_ACCEPTED)) {
      setRejectionError(
        formatMessage({
          id: 'Only CSV files are accepted.',
          defaultMessage: 'Only CSV files are accepted.'
        })
      );
    } else {
      setRejectionError(
        formatMessage({
          id: 'This file was rejected.',
          defaultMessage: 'This file was rejected.'
        })
      );
    }
  };

  const files = selectedFile
    ? [{ fileName: selectedFile.name, file: selectedFile }]
    : [];

  return (
    <>
      <FileSelectorInput
        files={files}
        multiple={false}
        accept={ACCEPT}
        extensions={EXTENSIONS}
        onFilesAdd={handleFilesAdd}
        onFileRemove={clearImportedFile}
        onFileRejections={handleFileRejections}
      />
      {selectedFile && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {formatBytes(selectedFile.size)}
          </Typography>
        </Box>
      )}
      {rejectionError && <Alert content={rejectionError} severity="error" />}
      {rowErrors.map(err => (
        <Alert
          content={`${formatMessage({ id: 'Row' })} ${err.row} : ${err.errorMessage}`}
          key={err.row + err.errorMessage}
          severity="error"
        />
      ))}
    </>
  );
};

Step2.propTypes = {};

export default Step2;
