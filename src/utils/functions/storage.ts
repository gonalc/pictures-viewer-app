import { supabase } from "../../services/supabase";
import type { BucketName, FileWithURL } from "../hooks/bucket";

export async function getImages(bucketName: BucketName = "pictures") {
  const { data, error } = await supabase.storage.from(bucketName).list("", {
    sortBy: {
      column: "created_at",
      order: "desc",
    },
  });

  if (error) {
    console.log("There has been an error fetching images: ", error);
  }

  return data;
}

export async function deleteImages(
  files: FileWithURL[],
  bucketName: BucketName = "pictures"
) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove(files.map(file => file.name));

  if (error) {
    console.log("There has been an error removing this file: ", error);
  }

  if (!data) {
    return null;
  }

  return data[0].id;
}
