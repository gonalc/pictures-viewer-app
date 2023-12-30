import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import type { FileObject } from "@supabase/storage-js/src/lib/types";

type BucketName = "pictures";

type FileWithURL = FileObject & {
  url: string;
};

const ONE_HOUR = 3600;

const useBucket = (bucketName: BucketName = "pictures") => {
  const [files, setFiles] = useState<FileWithURL[]>([]);

  useEffect(() => {
    supabase.storage
      .from(bucketName)
      .list()
      .then(async ({ data }) => {
        const parsedFiles: FileWithURL[] = [];

        if (data) {
          for (const file of data) {
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
      });
  }, []);

  return files;
};

export default useBucket;
