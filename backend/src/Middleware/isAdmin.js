const isAdminMIddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only Admin Allowed' });
  }
  next();
};


export default isAdminMIddleware;