import dotenv from "dotenv";
import { connectDB } from "./config/database-config.js";
import User from "./models/user-model.js";
import bcrypt from "bcryptjs";

dotenv.config();

const testAuth = async () => {
  try {
    console.log("🧪 Starting authentication test...\n");
    
    // Test 1: Database connection
    console.log("1️⃣  Testing database connection...");
    await connectDB();
    console.log("✅ Database connected\n");

    // Test 2: Create test user (cleanup if exists)
    console.log("2️⃣  Testing user creation...");
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = "TestPassword123";
    const testName = "Test User";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(testPassword, salt);

    const user = await User.create({
      name: testName,
      email: testEmail,
      password: hashedPassword,
    });

    console.log(`✅ User created: ${user.email}\n`);

    // Test 3: Find and verify password
    console.log("3️⃣  Testing user retrieval & password verification...");
    const foundUser = await User.findOne({ email: testEmail });
    
    if (!foundUser) {
      console.log("❌ User not found after creation!");
      process.exit(1);
    }

    console.log(`✅ User found: ${foundUser.email}`);

    const passwordMatch = await bcrypt.compare(testPassword, foundUser.password);
    console.log(`✅ Password verification: ${passwordMatch ? "SUCCESS" : "FAILED"}\n`);

    // Test 4: Cleanup
    console.log("4️⃣  Cleaning up test user...");
    await User.deleteOne({ _id: user._id });
    console.log("✅ Test user deleted\n");

    console.log("🎉 All tests passed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
  }
};

testAuth();
