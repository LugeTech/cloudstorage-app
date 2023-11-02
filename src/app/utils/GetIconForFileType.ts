const getIconForFileType = (files: File[]) => {
  return files.map((file) => {
    const mainType = file.type.split('/')[0];

    switch (mainType) {
      case 'image':
        return URL.createObjectURL(file);
      case 'application':
        if (file.type === 'application/zip') {
          return '/zip_icon.svg';
        } else if (file.type === 'application/pdf') {
          return '/pdf_icon.svg';
        } else if (
          file.type === 'application/msword' ||
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
          return '/doc_icon.svg';
        }
        // Handle other document types as needed
        return '/document_icon.svg';
      case 'audio':
        return '/audio_icon.svg';
      case 'video':
        return '/video_icon.svg';
      default:
        return '/unknown_file_type.svg';
    }
  })
}
export default getIconForFileType
