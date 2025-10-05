// resetVishalPassword.js
// Usage: node resetVishalPassword.js
// This will set email "vishal@gmail.com" password to "123456"

const bcrypt = require('bcryptjs');

async function main() {
  const email = 'vishal@gmail.com';
  const newPassword = '123456';

  // adjust path if your models are elsewhere
  const db = require('./src/models'); // should export { sequelize, User, ... }

  try {
    await db.sequelize.authenticate();
    console.log('DB connected.');

    const hash = await bcrypt.hash(newPassword, 10);

    const [updated] = await db.User.update(
      { password: hash },
      { where: { email } }
    );

    if (updated) {
      console.log(`Password for ${email} updated successfully.`);
    } else {
      console.log(`No user found with email ${email}.`);
    }

    await db.sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message || err);
    try { await db.sequelize.close(); } catch(e) {}
    process.exit(1);
  }
}

main();
