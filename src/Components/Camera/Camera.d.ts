export type ICameraFile = {uri: string; filename: string};

export type IAppCameraProps = {
  handleShow: (files?: ICameraFile[]) => void;
};
