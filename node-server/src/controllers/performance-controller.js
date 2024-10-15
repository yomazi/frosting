const { db } = require("../config/firebase.js");

const getAllPerformances = async (req, res) => {
  try {
    const snapshot = await db.collection("performances").get();
    const shows = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ shows });
  } catch (error) {
    console.error("Error fetching shows:", error);
  }
};

module.exports = { getAllPerformances };
