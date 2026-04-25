import connect from "../db.js";
const isOwnerMiddleware = (type = "users") => {
  return async (req, res, next) => {
    const { id } = req.params;
    const { uid, role, company_id } = req.user;
  if (role === "admin")next();
    let query, params;
    switch (type) {
      case "users":
        if (id && id != uid) {
          return res.status(401).json({ message: "You're not a Owner of This Route." });
        }
        query = "select exists(select 1 from users where uid=$1)";
        params=[uid]
        break;
      case "jobs":
        query = "select exists(select 1 from jobs j where j.uid=$1 and j.company_id=$2)";
        params=[id, company_id]
        break;
      case "applications":
        query = "select exists(select 1 from applications where user_id=$1 and uid=$2)";
        params=[uid, id]
        break;
        case "company":
          query = "select exists(select 1 from companies where created_by=$1 and uid=$2)";
          params=[uid, id]
      default:
        return res.status(400).json({ message: "Invalid  type" });
        break;
    }
    try {
      const { rows } = await connect.query(query, params);
      if (!rows[0].exists) {
        return res.status(401).json({ message: `Not Authorized of ${type}` });
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
};
export default isOwnerMiddleware;
