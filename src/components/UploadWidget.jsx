import { toast } from "react-toastify";

const UploadWidget = ({ name, setFolderName }) => {
  let uploadedFilesCount = 0;
  let totalFilesCount = 0;

  function uploadFiles(e) {
    e.preventDefault();

    const toastId = toast.loading("Loading, please wait...");

    if (name === "") {
      toast.update(toastId, {
        render: "You have to input a folder name",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
        folder: `${import.meta.env.VITE_PARENT_FOLDER}/${name}`,
        resourceType: "auto",
        multiple: true,
        showUploadMoreButton: true,
        showAdvancedOptions: false,
        showPoweredBy: false,
        preBatch: (cb, data) => {
          totalFilesCount = data?.files.length;
          cb();
        },
      },
      function (error, result) {
        if (result?.info === "shown") {
          toast.dismiss();
        }

        if (result?.event === "close") {
          setFolderName("");
        }

        if (!error && result && result.event === "success") {
          // update the number of uploaded file
          uploadedFilesCount++;

          // if total number of files is equal to the total number of updated file, run the notification function
          if (totalFilesCount === uploadedFilesCount) {
            toast.update(toastId, {
              render: `You have successfully uploaded ${uploadedFilesCount} files.`,
              type: "success",
              isLoading: false,
              autoClose: 2000,
            });
          }
        } else if (error) {
          toast.update(toastId, {
            render: `Something went wrong!!`,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
        }
      }
    );

    widget.open();
  }

  return (
    <button className="upload-btn" type="button" onClick={uploadFiles}>
      Upload files
    </button>
  );
};

export default UploadWidget;
