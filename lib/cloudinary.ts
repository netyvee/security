// Cloudinary fetch mode for Vigil Security
// Cloud: duhicmygg, folder: security

const CLOUD_NAME = 'duhicmygg'
const SECURITY_FOLDER = 'security'

export function getCloudinaryUrl(filename: string, transformations?: string): string {
  const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`
  const transforms = transformations || 'f_auto,q_auto,w_1200'
  return `${baseUrl}/${transforms}/${SECURITY_FOLDER}/${filename}`
}

// Preset transformations
export const ImagePresets = {
  hero: 'f_auto,q_auto,w_1200,h_600,c_fill',
  thumbnail: 'f_auto,q_auto,w_400,h_300,c_fill',
  avatar: 'f_auto,q_auto,w_150,h_150,c_fill,g_face',
  fullWidth: 'f_auto,q_auto,w_1920',
} as const
