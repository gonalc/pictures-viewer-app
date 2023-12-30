import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import type { FileObject } from "@supabase/storage-js/src/lib/types";
import { getImages } from "../functions/storage";

export type BucketName = "pictures";

export type FileWithURL = FileObject & {
  url: string;
};

const ONE_HOUR = 3600;

const useBucket = (bucketName: BucketName = "pictures") => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileWithURL[]>([]);

  const fetchImages = async (bucketName: BucketName = "pictures") => {
    setLoading(true);

    const files = await getImages(bucketName);

    if (files) {
      const parsedFiles: FileWithURL[] = [];

      if (files) {
        for (const file of files) {
          const isEmpty = !file.metadata.size;

          if (!isEmpty) {
            const signedData = await supabase.storage
              .from(bucketName)
              .createSignedUrl(file.name, ONE_HOUR);

            const parsedFile: FileWithURL = {
              ...file,
              url: signedData.data?.signedUrl || "",
            };

            parsedFiles.push(parsedFile);
          }
        }
      }

      setFiles(parsedFiles);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchImages(bucketName);
  }, []);

  return { files, loading, fetchImages };
};

export default useBucket;
