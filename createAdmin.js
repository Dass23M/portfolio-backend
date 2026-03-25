/**
 * Create Admin Script
 * Run with: node createAdmin.js
 * 
 * This creates the initial admin user in MongoDB Atlas.
 * Only needs to be run ONCE.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');

const ADMIN_CREDENTIALS = {
  username: 'admin',
  email: 'dasunmethmal23@gmail.com',
  password: 'Admin@1234',   // ← Change this after first login!
  name: 'Dasun Methmal',
  role: 'superadmin',
};

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Check if admin already exists
    const existing = await Admin.findOne({ username: ADMIN_CREDENTIALS.username });
    if (existing) {
      console.log('⚠️  Admin already exists! No changes made.');
      console.log(`   Username: ${existing.username}`);
      console.log(`   Email: ${existing.email}`);
      process.exit(0);
    }

    const admin = await Admin.create(ADMIN_CREDENTIALS);
    console.log('\n🎉 Admin account created successfully!');
    console.log('─────────────────────────────────────');
    console.log(`   Name:     ${admin.name}`);
    console.log(`   Username: ${admin.username}`);
    console.log(`   Email:    ${admin.email}`);
    console.log(`   Password: Admin@1234`);
    console.log('─────────────────────────────────────');
    console.log('⚠️  Please change your password after first login!');
    console.log('🔑 Login at: http://localhost:3000/admin/login\n');
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdmin();
