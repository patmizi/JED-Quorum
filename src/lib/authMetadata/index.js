/**
 * Sample form object
 * {
 *   username: string,
 *   password: string,
 *   fullName: string,
 *   businessRole: string
 * }
 */
/**
 * Transforms the form object into a user_metadata object for identity metadata
 * @param formData
 * @returns {{email: string, full_name: string, business_role: string}}
 */
export function compileUserRegistrationMetadata(formData) {
  return {
    email: formData.username,
    full_name: formData.fullName,
    business_role: formData.businessRole,
  }
}
