export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    res.status(200).json({
      success: true,
      url: req.file.path,
      public_id: req.file.filename
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Upload failed"
    });
  }
};


export const uploadEditorImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: 0
      });
    }

    res.status(200).json({
      success: 1,
      file: {
        url: req.file.path,
        public_id: req.file.filename
      }
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: 0
    });
  }
};
