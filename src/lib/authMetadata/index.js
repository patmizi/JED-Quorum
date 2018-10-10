import { Address } from "../models/address";

/**
 * Sample form object
 * {
 *   username: string,
 *   password: string,
 *   fullName: string,
 *   firstName: string,
 *   lastName: string,
 *   contactNumber: string,
 *   dateOfBirth: string,
 *   businessRole: string
 * }
 */
/**
 * Transforms the form object into a user_metadata object for identity metadata
 * @param formData
 * @returns {{email: *, full_name: *|fullName, business_role: string, first_name: string, last_name: string, contact_number: *, date_of_birth: string, address: Address}}
 */
export function compileUserRegistrationMetadata(formData) {
  return {
    Email: formData.email,
    Full_Name: formData.fullName,
    Business_Role: formData.businessRole,
    First_Name: formData.firstName,
    Last_Name: formData.lastName,
    Contact_Number: formData.contactNumber,
    Date_Of_Birth: formData.dateOfBirth,
    address: new Address(formData.address).asQuorum()
  }
}
