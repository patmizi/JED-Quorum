export function Address(addressObj) {
  this.Suburb = addressObj.Suburb || addressObj.locality || null;
  this.Country = addressObj.Country || addressObj.country || null;
  this.State = addressObj.State || addressObj.administrative_area_level_1 || null;
  this.Postcode = addressObj.Postcode || addressObj.postal_code || null;
  this.Street = addressObj.Street || addressObj.name || null;

  /**
   * @deprecated because Google handles unit numbers in their placesAPI
   */
  this.Unit = null;

  Address.prototype.toString = function() {
    let address = "";
    if(this.Unit !== null && this.Unit !== undefined && this.Unit !== "") {
      address += this.Unit + "/";
    }
    if(this.Street !== null && this.Street !== undefined && this.Street !== "") {
      address += this.Street + ", ";
    }
    if(this.Suburb !== null && this.Suburb !== undefined && this.Suburb !== "") {
      address += this.Suburb + ' ';
    }
    if(this.Postcode !== null && this.Postcode !== undefined && this.Postcode !== "") {
      address += this.Postcode;
    }
    return address;
  };

  /**
   * Returns a google address object from the current address
   * @returns {Object}
   */
  Address.prototype.asGoogle = function() {
    let res = {};
    if (this.Suburb !== null && this.Suburb !== undefined) res.locality = this.Suburb;
    if (this.Country !== null && this.Country !== undefined) res.country = this.Country;
    if (this.State !== null && this.State !== undefined) res.administrative_area_level_1 = this.State;
    if (this.Postcode !== null && this.Postcode !== undefined) res.postal_code = this.Postcode;
    if (this.Street !== null && this.Street !== undefined) res.name = this.Street;
    return res;
  };

  /**
   * @returns {Address}
   */
  Address.prototype.asQuorum = function() {
    let res = {};
    if (this.Suburb !== null && this.Suburb !== undefined) res.Street = this.Street;
    if (this.Country !== null && this.Country !== undefined) res.Country = this.Country;
    if (this.State !== null && this.State !== undefined) res.State = this.State;
    if (this.Postcode !== null && this.Postcode !== undefined) res.Postcode = this.Postcode;
    if (this.Street !== null && this.Street !== undefined) res.Street = this.Street;
    if (this.Unit !== null && this.Unit !== undefined) res.Unit = this.Unit;
    return res;
  };

  return this;
}
