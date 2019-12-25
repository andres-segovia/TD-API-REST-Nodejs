const settings = {
    "DEFAULT_NAME": "Andy",
    "DEFAULT_PASS": "passqaws",
    "TOKEN_SECRET": process.env.TOKEN_SECRET || "DEFAULT-TOKEN-SECRET",
    "DEFAULT_PORT": process.env.PORT || 8000,
    "JSON_SPACES": 2,
    "TIME_TO_EXPIRE": 60 * 60 * 24 * 2 // Expires in 2 days
};

module.exports = settings;
