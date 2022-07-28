"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(terraformers) {
    let dataSubmitted = {
      fullName: terraformers.request.body.fullName,
      email: terraformers.request.body.email,
      password: terraformers.request.body.password,
      dateOfBirth: terraformers.request.body.dateOfBirth,
      mobile: terraformers.request.body.mobile,
    };
    await strapi.services.terraformers.create(dataSubmitted);
    return { status: "success", message: "data added successfully" };
  },
};
