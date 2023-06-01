import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import plusIcon from "./../../assets/plusIcon.svg";

import styles from "./ModalUploadImage.module.scss";

const baseStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "rgb(203 213 225)",
    borderStyle: "dashed",
    backgroundColor: "rgb(241 245 249)",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
};

const focusedStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};

// image preview
const thumbsContainer = {
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
};

const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
};

const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
};

const img = {
    display: "block",
    borderRadius: "8px",
    width: "auto",
    height: "100%",
};

const ModalUploadImage = () => {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
        maxFiles: 1,
        accept: { "image/*": [] },
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    const thumbs = files.map((file) => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                    }}
                />
            </div>
        </div>
    ));

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <section className={styles.container}>
            <div {...getRootProps({ style })}>
                <div className={styles.content}>
                    <input {...getInputProps()} />
                    {console.log(acceptedFiles)}
                    {acceptedFiles.length > 0 ? (
                        <div style={thumbsContainer}>{thumbs}</div>
                    ) : (
                        <>
                            <img src={plusIcon} />
                            <p className={styles.uploadImageText}>Upload your Image</p>
                            <p className={styles.fileTypeText}>PNG and JPG files are allowed</p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ModalUploadImage;
