import Employee from "models/Employee";
import { dbConection } from "utils/mongoose";

dbConection();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const empleado = await Employee.findById(id);
        if (!empleado) {
          return res.status(400).json({ msg: "Employee not found" });
        }
        return res.status(200).json(empleado);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "PUT":
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!updatedEmployee) {
          return res.status(404).json({ msg: "Employee not found" });
        }
        return res.status(200).json(updatedEmployee);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "DELETE":
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
          return res.status(400).json({ msg: "Employee not found" });
        }
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
};
