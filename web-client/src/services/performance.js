import axios from "axios";

/*
const addShow = async () => {
  const show = {
    name: "KAOS",
    date: "Saturday, Nov 30th 2024",
    times: "Doors: 7:00 PM / Show: 8:00 PM",
  };

  try {
    const docRef = await addDoc(collection(db, "shows"), show);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
*/

const getPerformances = async () => {
  try {
    const response = await axios.get("/api/performances");
    const performances = response.data;

    return performances;
  } catch (error) {
    console.error(error.message);

    return [];
  }
};

export { getPerformances };
