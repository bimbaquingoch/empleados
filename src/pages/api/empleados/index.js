const { dbConection } = require("utils/mongoose");
import Employee from "models/Employee";

dbConection();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const empleados = await Employee.find();
        return res.status(200).json(empleados);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "POST":
      try {
        const newEmployee = new Employee(body);
        const employeeSaved = await newEmployee.save();
        return res.status(201).json(employeeSaved);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
