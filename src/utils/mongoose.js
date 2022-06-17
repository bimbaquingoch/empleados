import { connect, connection } from "mongoose";

const conexion = {
  isConected: false,
};

export const dbConection = async () => {
  try {
    if (conexion.isConected) return;

    const db = await connect(process.env.MONGO_URL);
    conexion.isConected = db.connections[0].readyState;
    console.log(db.connection.db.databaseName);
  } catch (error) {
    console.log(error);
  }
};

connection.on("connected", () => {
  console.log("conectado a ATLAS");
});

connection.on("error", (err) => {
  console.log(err);
});
