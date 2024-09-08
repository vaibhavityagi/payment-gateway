const { jwtVerify } = require("jose");

const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to convert secret to Uint8Array
function getKey() {
  return new TextEncoder().encode(JWT_SECRET); // Required for 'jose' library
}

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using jose
    const { payload } = await jwtVerify(token, getKey());

    // Extract the userId from the payload (assuming it's in the payload)
    req.userId = payload.userId;

    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
}

module.exports = {
  authMiddleware,
};
