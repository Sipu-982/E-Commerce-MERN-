const bcrypt = require('bcrypt');

const hashPswd = async () => {
    try {
        const encrypt = await bcrypt.hash("Ecommerce#2025", 10); // Await here
        console.log("Hashed password:", encrypt);
    } catch (error) {
        console.error("Something went wrong!", error);
    } 
}

hashPswd();

module.exports = hashPswd;
