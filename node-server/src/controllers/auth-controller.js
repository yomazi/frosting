const { auth, db } = require("../config/firebase");

const authenticate = async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await auth.verifyIdToken(token);
    const uid = decodedToken.uid;

    console.log("token verified. uid:", uid);

    const userDoc = await db.collection("Users").doc(uid).get();

    if (!userDoc.exists) {
      return res
        .status(404)
        .json({ error: `No user found matching token uid:${uid}` });
    }

    const user = userDoc.data();

    return res.status(200).json({ message: "Authenticated", uid, user });
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(`registering user: ${email}, ${password}`);
    const userRecord = await auth.createUser({
      email: email,
      password: password,
    });

    const userDocRef = db.collection("Users").doc(userRecord.uid);
    await userDocRef.set({
      uid: userRecord.uid,
      createdAt: new Date().toISOString(),
      email: userRecord.email,
      role: "user",
      firstName,
      lastName,
    });

    return res
      .status(201)
      .json({ message: "User created successfully.", uid: userRecord.uid });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { authenticate, register };
