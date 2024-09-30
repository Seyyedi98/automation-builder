"use client";

import React, { useEffect } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { useRouter } from "next/navigation";

const UploadCareButton = (onUpload) => {
  const router = useRouter();

  useEffect(() => {
    const handleUpload = async (e) => {
      const result = await uploadFile(fileData, {
        publicKey: "1a25f8fa59e90c064f39",
        store: "auto",
        metadata: {
          subsystem: "js-client",
        },
      });

      console.log(result.uuid);

      // const file = await onUpload(e.detail.cdnurl);
      // if (file) {
      //   router.refresh();
      // }
    };
  }, []);

  return (
    <div>
      <FileUploaderRegular
        sourceList="local, url, camera"
        classNameUploader="uc-light"
        pubkey="1a25f8fa59e90c064f39"
      />
    </div>
  );
};

export default UploadCareButton;
