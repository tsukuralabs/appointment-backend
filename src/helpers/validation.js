// 1. Validate format of user fields from req.body
const validateUserFields = (req) => {
  const { username, phone, email } = req.body;

  if (!username || !phone || !email) {
    return "All fields (username, phone, email) are required";
  }

  if (typeof username !== "string" || username.trim().length < 2) {
    return "Username must be at least 2 characters long";
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(String(phone).trim())) {
    return "Phone number must be exactly 10 digits";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email).trim())) {
    return "Invalid email address format";
  }

  return null;
};

// 2. Check that only allowed fields are present in req.body
const validateEditFields = (req) => {
  const allowedEditFields = ["username", "phone", "email"];
  const requestedFields = Object.keys(req.body || {});

  if (requestedFields.length === 0) {
    return false;
  }

  const isEditAllowed = requestedFields.every((field) =>
    allowedEditFields.includes(field),
  );

  return isEditAllowed;
};

module.exports = {
  validateUserFields,
  validateEditFields,
};
