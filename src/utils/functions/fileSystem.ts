import * as fs from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import type { FileWithURL } from "../hooks/bucket";
import { showToast } from "./toast";

export async function downloadPicture(file: FileWithURL) {
  try {
    const { url, name } = file;

    const download = await fs.downloadAsync(url, fs.documentDirectory + name);

    const { uri } = download;
    await saveFile(uri);

    showToast('Picture has been downloaded')
    return download;
  } catch (error) {
    console.error("There was an error downloading the picture: ", error);
  }
}

export async function saveFile(fileUri: string) {
  try {
    const result = await MediaLibrary.requestPermissionsAsync(true);

    if (result.granted) {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync("Download");

      if (!album) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } else {
        console.log('Permission has not been granted')
    }
  } catch (error) {
    console.log("Save error: ", error);
  }
}
