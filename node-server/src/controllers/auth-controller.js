const { auth } = require("../config/firebase");

const authenticate = async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await auth.verifyIdToken(token);
    res.status(200).json({ message: "Authenticated", uid: decodedToken.uid });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`registering user: ${email}, ${password}`);
    const userRecord = await auth.createUser({
      email: email,
      password: password,
    });
    console.log("User created successfully:", userRecord.uid);
    res
      .status(201)
      .json({ message: "User created successfully.", uid: userRecord.uid });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { authenticate, register };
