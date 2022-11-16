export type ICameraFile = { uri: string }

export type IAppCameraProps = {
  handleShow: (files?: ICameraFile[]) => void;
}