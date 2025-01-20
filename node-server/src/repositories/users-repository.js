const createError = require("http-errors");
const admin = require("firebase-admin");
const db = admin.firestore();

class UsersRepository {
  static async findByUid(uid) {
    const userDoc = await db.collection("Users").doc(uid).get();

    if (!userDoc.exists) {
      throw new createError.NotFound(`No user found matching token uid:${uid}`);
    }

    const user = userDoc.data();

    return user;
  }

  static async create(firstName, lastName, email, uid) {
    const userDocRef = db.collection("Users").doc(uid);
    const createdAt = admin.firestore.FieldValue.serverTimestamp();

    await userDocRef.set({
      uid,
      createdAt,
      email,
      role: "user",
      firstName,
      lastName,
    });

    const doc = await userDocRef.get();

    if (!doc.exists) {
      throw createError(500, "Failed to create the user document.");
    }
    const user = doc.data();

    return user;
  }
}

module.exports = UsersRepository;
