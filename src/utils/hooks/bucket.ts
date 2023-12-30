import { useEffect } from "react";
import { supabase } from "../../services/supabase";

type BucketName = "pictures";

const useBucket = (bucketName: BucketName = "pictures") => {
  useEffect(() => {
    supabase.storage.getBucket(bucketName).then(({ data }) => {
      console.log("SINGLE BUCKET: ", data);
    });
  }, []);

  useEffect(() => {
    supabase.storage.listBuckets().then(({ data }) => {
      console.log("ALL BUCKET: ", data);
    });
  }, []);
};

export default useBucket