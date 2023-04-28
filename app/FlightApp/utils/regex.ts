export const validationPhoneOrEmail = /^(?![-_.+])([a-zA-Z0-9-_+](?![-_.+]{2,}))+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$|^\d{10,11}$/;
export const validationEmail = /^(?![-_.+])([a-zA-Z0-9-_+](?![-_.+]{2,}))+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/
export const validationSpacePassword = /^\S*$/
export const validationPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
export const validationPasswordFullSize = /^([a-zA-Z0-9]|[!@#\$%\^&\*])+$/
export const validationPhone = /^\d{10,11}$/;
export const validationCCID = /^\d{9,13}$/;
export const validationEmoji =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
