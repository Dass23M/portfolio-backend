/**
 * Reset Admin Script
 * Run with: node resetAdmin.js
 *
 * This DELETES the existing admin and re-creates it so the password
 * is properly hashed by the Mongoose pre('save') hook.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');

const ADMIN_CREDENTIALS = {
  username: 'admin',
  email: 'dasunmethmal23@gmail.com',
  password: 'Admin@1234',
  name: 'Dasun Methmal',
  role: 'superadmin',
};

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Delete any existing admin with that username or email
    const deleted = await Admin.deleteMany({
      $or: [
        { username: ADMIN_CREDENTIALS.username },
        { email: ADMIN_CREDENTIALS.email },
      ],
    });
    if (deleted.deletedCount > 0) {
      console.log(`🗑️  Removed ${deleted.deletedCount} existing admin record(s)`);
    }

    // Create fresh admin – the pre('save') hook will hash the password
    const admin = new Admin(ADMIN_CREDENTIALS);
    await admin.save();

    console.log('\n🎉 Admin account reset successfully!');
    console.log('─────────────────────────────────────');
    console.log(`   Name:     ${admin.name}`);
    console.log(`   Username: ${admin.username}`);
    console.log(`   Email:    ${admin.email}`);
    console.log(`   Password: ${ADMIN_CREDENTIALS.password}`);
    console.log('─────────────────────────────────────');
    console.log('🔑 Login at: http://localhost:5000/api/auth/login');
  } catch (error) {
    console.error('❌ Error resetting admin:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

resetAdmin();
