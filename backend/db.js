const mongoose = require("mongoose");
// hashinh password-
const bcrypt = require("bcrypt");

// mongoose.connect(
//   "mongodb+srv://gourishmarkan13:Gourish1@paytm-clone-frontend.dbuywex.mongodb.net/"
// );
const dbConnect = async () => {
  const connDb = await mongoose.connect("mongodb://localhost:27017/paytm");

  console.log("db call");
};

// create a Schema for users-
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLenght: 50,
  },
});
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, //Reference to User Model
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
// Method to generate a hash from plain text
userSchema.methods.createHash = async function (plainTextPassword) {
  // Hashing user's salt and password with 13 iterations,
  const saltRounds = 10;

  // First method to generate a salt and then create hash
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
  // Second mehtod - Or we can create salt and hash in a single method also
  // return await bcrypt.hash(plainTextPassword, saltRounds);
};
// Validating the candidate password with stored hash and hash function

userSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account, dbConnect };
