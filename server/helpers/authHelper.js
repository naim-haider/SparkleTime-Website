const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);
    return hashedPass;
  } catch (error) {
    console.log(error);
  }
};
const comparePassword = async (password, hashedPass) => {
  return bcrypt.compare(password, hashedPass);
};

module.exports = { hashPassword, comparePassword };
