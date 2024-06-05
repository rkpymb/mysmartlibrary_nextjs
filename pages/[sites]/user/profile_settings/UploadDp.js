// components/FileUpload.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { useDropzone } from 'react-dropzone';
import Badge from '@mui/material/Badge';
import { FiEdit, FiChevronLeft } from "react-icons/fi";
import CheckloginContext from '/context/auth/CheckloginContext'
import MYS from 'Styles/library.module.css'
import { MediaFilesUrl, MediaFilesFolder } from '/Data/config'

import {
    styled,
    IconButton,
    TextField,
    useTheme,
} from '@mui/material';
const FileUpload = () => {
    const Contextdata = useContext(CheckloginContext)
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [LoadDp, setLoadDp] = useState(true);


    const [UserDp, setUserDp] = useState(Contextdata.Data.image);

    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 32,
        height: 32,
        border: `2px solid ${theme.palette.background.paper}`,
        backgroundColor: 'white',
        cursor: 'pointer',
    }));
    useEffect(() => {

    }, [LoadDp]);



    const onDrop = async (acceptedFiles) => {
        setUploadProgress(0)
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);

        try {
            const url = MediaFilesUrl + 'users/Uploaddp'
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    setUploadProgress(progress);
                },
            });

            setUploadedFile(response.data.fileName);
            document.getElementById("FinalFileName").value = response.data.fileName;
            const Fimg = MediaFilesUrl + MediaFilesFolder + '/' + response.data.fileName
            setUserDp(response.data.fileName)
            // document.getElementById("Dpimg").src = Fimg;

        } catch (error) {
            console.error('File upload error:', error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <div className={MYS.UserDpEditbox}>
                {LoadDp &&
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={

                            <div {...getRootProps()} style={dropzoneStyles}>
                                <input {...getInputProps()} />
                                <SmallAvatar alt={Contextdata.Data.name} src="/img/uploadicon.png" />
                            </div>

                        }
                    >
                        <Avatar

                            alt={Contextdata.Data.name}
                            sx={{ width: 100, height: 100 }}
                            src={`${MediaFilesUrl}${MediaFilesFolder}/${Contextdata.Data.dp}`}
                        />
                    </Badge>

                }
            </div>

            <div style={{ fontSize: '10px' , padding:'5px'}}>
                {uploadProgress > 0 && (
                    <p>Uploading: {uploadProgress.toFixed(2)}%</p>
                )}
                {uploadedFile && <p>File uploaded please click on update to save new profile image into your account</p>}
            </div>

        </div>
    );
};

const dropzoneStyles = {

    padding: '2px',
    textAlign: 'center',
    borderRadius: '50%'
};

export default FileUpload;
