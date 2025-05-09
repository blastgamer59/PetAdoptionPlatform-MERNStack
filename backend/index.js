const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

const uri =
  "mongodb+srv://admin:admin@petsadoptionplatform.qfrafqv.mongodb.net/?retryWrites=true&w=majority&appName=Petsadoptionplatform";
const port = 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Client
const client = new MongoClient(uri);

// Firebase Admin SDK Setup
const serviceAccount = require("./ServiceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hellopawmates@gmail.com", //Replace with your actual email id
    pass: "logd yigm kose dwkg",
  },
});

// Function to generate a random time between 10:00 AM and 5:00 PM IST
function getRandomMeetingTime() {
  const hours = Math.floor(Math.random() * 7) + 10; // 10 to 16 (10:00 AM to 4:00 PM)
  const minutes = Math.random() < 0.5 ? "00" : "30";
  return `${hours}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;
}

// Function to generate a random meeting date (at least one day after submission)
function getRandomMeetingDate() {
  const daysAhead = Math.floor(Math.random() * 5) + 1; // 1 to 5 days after submission
  const meetingDate = new Date();
  meetingDate.setDate(meetingDate.getDate() + daysAhead);
  return meetingDate;
}

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("database").collection("users");
    const favoritesCollection = client.db("database").collection("favorites");
    const adoptionsCollection = client.db("database").collection("adoptions");
    const petsCollection = client.db("database").collection("pets");

    // Ensure pets collection is populated with mock data initially
    const petsCount = await petsCollection.countDocuments();
    if (petsCount === 0) {
      const mockPets = [
        {
          id: 1,
          name: "Luna",
          species: "Dog",
          breed: "Golden Retriever",
          age: 2,
          size: "Large",
          gender: "Female",
          color: "Golden",
          description:
            "Luna is a playful and friendly Golden Retriever. She loves to play fetch and go for long walks. She's great with kids and other pets.",
          location: "Tenali, Andhra Pradesh",
          images: [
            "https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          ],
          status: "available",
          shelterId: 1,
          vaccinated: true,
          neutered: true,
          goodWith: ["children", "dogs", "cats"],
          adoptionFee: 250,
          postedDate: "2023-06-15",
          featured: true,
        },
        {
          id: 2,
          name: "Oliver",
          species: "Cat",
          breed: "Domestic Shorthair",
          age: 1,
          size: "Medium",
          gender: "Male",
          color: "Orange Tabby",
          description:
            "Oliver is a sweet and curious cat who loves to explore. He's very affectionate and enjoys cuddling on the couch. He gets along well with other cats.",
          location: "Vijayawada, Andhra Pradesh",
          images: [
            "https://images.pexels.com/photos/2061057/pexels-photo-2061057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          ],
          status: "available",
          shelterId: 2,
          vaccinated: true,
          neutered: true,
          goodWith: ["cats", "adults"],
          adoptionFee: 120,
          postedDate: "2023-06-20",
          featured: false,
        },
        {
          id: 3,
          name: "Max",
          species: "Dog",
          breed: "German Shepherd",
          age: 3,
          size: "Large",
          gender: "Male",
          color: "Black and Tan",
          description:
            "Max is an intelligent and loyal German Shepherd. He has completed basic training and is very obedient. He would thrive in an active household.",
          location: "Tenali, Andhra Pradesh",
          images: [
            "https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          ],
          status: "available",
          shelterId: 3,
          vaccinated: true,
          neutered: true,
          goodWith: ["adults", "dogs"],
          adoptionFee: 300,
          postedDate: "2023-06-25",
          featured: true,
        },
        {
          id: 4,
          name: "Bella",
          species: "Dog",
          breed: "Beagle",
          age: 4,
          size: "Medium",
          gender: "Female",
          color: "Tricolor",
          description:
            "Bella is a sweet Beagle with a gentle temperament. She loves sniffing around outdoors and cuddling inside. She's great with children of all ages.",
          location: "Hyderabad, Telangana",
          images: [
            "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          ],
          status: "available",
          shelterId: 4,
          vaccinated: true,
          neutered: true,
          goodWith: ["children", "dogs", "cats"],
          adoptionFee: 200,
          postedDate: "2023-07-01",
          featured: false,
        },
        {
          id: 5,
          name: "Cleo",
          species: "Cat",
          breed: "Siamese",
          age: 2,
          size: "Medium",
          gender: "Female",
          color: "Seal Point",
          description:
            "Cleo is a talkative Siamese cat with stunning blue eyes. She's very social and loves to be the center of attention. She would do best as the only pet in the household.",
          location: "Warangal, Telangana",
          images: [
            "https://images.pexels.com/photos/1770918/pexels-photo-1770918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          ],
          status: "available",
          shelterId: 5,
          vaccinated: true,
          neutered: true,
          goodWith: ["adults"],
          adoptionFee: 150,
          postedDate: "2023-07-05",
          featured: true,
        },
        {
          id: 6,
          name: "Rocky",
          species: "Dog",
          breed: "Boxer",
          age: 5,
          size: "Large",
          gender: "Male",
          color: "Fawn",
          description:
            "Rocky is an energetic Boxer who loves to play. He's very loyal and protective of his family. He needs an experienced owner who understands the breed.",
          location: "Vishakapatanam, Andhra Pradesh",
          images: [
            "https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          ],
          status: "available",
          shelterId: 6,
          vaccinated: true,
          neutered: true,
          goodWith: ["adults", "dogs"],
          adoptionFee: 250,
          postedDate: "2023-07-10",
          featured: false,
        },
        {
          id: 7,
          name: "Mittens",
          species: "Cat",
          breed: "Maine Coon",
          age: 3,
          size: "Large",
          gender: "Female",
          color: "Brown Tabby",
          description:
            "Mittens is a gentle giant with a fluffy coat and sweet personality. She loves to be brushed and will purr loudly when content. She gets along with respectful children and other pets.",
          location: "Vijayawada, Andhra Pradesh",
          images: [
            "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          ],
          status: "available",
          shelterId: 7,
          vaccinated: true,
          neutered: true,
          goodWith: ["children", "cats", "dogs"],
          adoptionFee: 180,
          postedDate: "2023-07-15",
          featured: true,
        },
        {
          id: 8,
          name: "Charlie",
          species: "Dog",
          breed: "Poodle Mix",
          age: 1,
          size: "Small",
          gender: "Male",
          color: "Apricot",
          description:
            "Charlie is a happy, bouncy puppy with lots of love to give. He's smart and eager to please, making him easy to train. He would thrive in an active home with a yard.",
          location: "Hyderabad, Telangana",
          images: [
            "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          ],
          status: "available",
          shelterId: 8,
          vaccinated: true,
          neutered: false,
          goodWith: ["children", "dogs", "cats"],
          adoptionFee: 300,
          postedDate: "2023-07-20",
          featured: false,
        },
      ];

      await petsCollection.insertMany(mockPets);
      console.log("Inserted updated mock pets data.");
    }

    // Check if email is registered
    app.post("/check-email", async (req, res) => {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      try {
        // First check in MongoDB
        const user = await userCollection.findOne({ email });

        if (user) {
          // User exists in MongoDB
          return res.json({ registered: true });
        }

        // If not in MongoDB, check Firebase
        try {
          await admin.auth().getUserByEmail(email);
          return res.json({ registered: true });
        } catch (firebaseError) {
          if (firebaseError.code === "auth/user-not-found") {
            return res.json({ registered: false });
          }
          throw firebaseError; // Re-throw for the outer catch block
        }
      } catch (error) {
        console.error("Error checking email:", error);
        res.status(500).json({
          error: "Internal Server Error",
          message: error.message,
          code: error.code || "unknown",
        });
      }
    });

    
    // Register user
    app.post("/register", async (req, res) => {
      const { fullName, email, password, confirmPassword } = req.body;
      if (!fullName || !email || !password || !confirmPassword) {
        return res.status(400).json({
          error:
            "Full name, email, password, and confirm password are required",
        });
      }
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
      try {
        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ error: "Email already registered" });
        }
        const user = {
          fullName,
          email,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await userCollection.insertOne(user);
        res.status(201).json({
          message: "User registered successfully",
          userId: result.insertedId,
        });
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Get logged-in user
    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      try {
        const user = await userCollection.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Get user's favorites
    app.get("/favorites", async (req, res) => {
      const email = req.query.email;
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      try {
        const favorites = await favoritesCollection
          .find({ userEmail: email })
          .toArray();
        res.json(favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Add a pet to favorites
    app.post("/favorites", async (req, res) => {
      const { userEmail, pet } = req.body;
      if (!userEmail || !pet || !pet.id) {
        return res
          .status(400)
          .json({ error: "User email and pet details are required" });
      }
      try {
        const existingFavorite = await favoritesCollection.findOne({
          userEmail,
          "pet.id": pet.id,
        });
        if (existingFavorite) {
          return res.status(409).json({ error: "Pet already in favorites" });
        }
        const favorite = {
          userEmail,
          pet,
          createdAt: new Date(),
        };
        const result = await favoritesCollection.insertOne(favorite);
        res.status(201).json({
          message: "Pet added to favorites",
          favoriteId: result.insertedId,
        });
      } catch (error) {
        console.error("Error adding favorite:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Remove a pet from favorites
    app.delete("/favorites/:petId", async (req, res) => {
      const { petId } = req.params;
      const { userEmail } = req.query;

      console.log("DELETE request received for:", { petId, userEmail });

      if (!userEmail || !petId) {
        return res
          .status(400)
          .json({ error: "User email and pet ID are required" });
      }

      try {
        // Try matching petId as string and number
        const query = {
          userEmail,
          $or: [
            { "pet.id": petId },
            { "pet.id": parseInt(petId) },
            { "pet.id": petId.toString() },
          ],
        };

        // Log the query for debugging
        console.log("Querying favorites with:", query);

        // Find the document
        const document = await favoritesCollection.findOne(query);
        if (!document) {
          console.log("No matching favorite found with:", query);
          return res.status(404).json({ error: "Favorite not found" });
        }

        // Delete the document
        const result = await favoritesCollection.deleteOne(query);
        console.log("Delete operation result:", result);

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Favorite not found" });
        }

        res.json({
          message: "Pet removed from favorites",
          success: true,
        });
      } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Get user's adoption applications with pet details
    app.get("/adoptions", async (req, res) => {
      const { userId, role } = req.query;
      if (!userId || !role) {
        return res.status(400).json({ error: "User ID and role are required" });
      }
      if (role !== "adopter") {
        return res.status(400).json({ error: "Invalid role" });
      }
      try {
        // Looking up pet details from the mock data
        // In a production environment, this would be a lookup to your pet collection
        const applications = await adoptionsCollection
          .find({ adopterId: userId })
          .sort({ createdAt: -1 }) // Sort by newest first
          .toArray();

        // Enhanced response with pet details
        const enhancedApplications = await Promise.all(
          applications.map(async (app) => {
            // Find the pet in the petsCollection if it exists
            let petDetails = null;
            if (app.petId) {
              // Try to find by id (string or numeric)
              petDetails = await petsCollection.findOne({
                $or: [
                  { id: app.petId },
                  { id: parseInt(app.petId) },
                  { id: app.petId.toString() },
                ],
              });
            }

            return {
              ...app,
              pet: petDetails || {
                // Fallback if pet isn't found
                images: ["https://via.placeholder.com/150"],
                name: app.applicantInfo?.petName || "Unknown Pet",
              },
            };
          })
        );

        res.json(enhancedApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Submit adoption application
    app.post("/adoptions", async (req, res) => {
      const { petId, adopterId, applicantInfo } = req.body;
      if (!petId || !adopterId || !applicantInfo) {
        return res.status(400).json({
          error: "Pet ID, adopter ID, and applicant info are required",
        });
      }

      const {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        state,
        zip,
        housingType,
        experience,
        additionalInfo,
        agreement,
        petName,
      } = applicantInfo;

      // Validate Indian phone number (10 digits, starts with 6-9)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: "Invalid Indian phone number" });
      }

      // Validate Indian zip code (6 digits)
      const zipRegex = /^\d{6}$/;
      if (!zipRegex.test(zip)) {
        return res.status(400).json({ error: "Invalid Indian zip code" });
      }

      // Basic address validation (non-empty)
      if (!address || address.trim().length < 5) {
        return res.status(400).json({ error: "Valid address is required" });
      }

      try {
        // Find the pet to include its details in the application
        const pet = await petsCollection.findOne({
          $or: [
            { id: petId },
            { id: parseInt(petId) },
            { id: petId.toString() },
          ],
        });

        const application = {
          petId,
          adopterId,
          applicantInfo: {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            state,
            zip,
            housingType,
            experience,
            additionalInfo,
            agreement,
            petName,
          },
          createdAt: new Date(),
          status: "pending",
          pet: pet || null, // Include pet details if found
        };

        const result = await adoptionsCollection.insertOne(application);
        const applicationId = result.insertedId;

        // Sending email
        const scheduleTime = new Date(Date.now() + 1 * 60 * 1000);
        schedule.scheduleJob(scheduleTime, async () => {
          const meetingTime = getRandomMeetingTime();
          const meetingDate = getRandomMeetingDate();
          const mailOptions = {
            from: "your-email@gmail.com",
            to: email,
            subject: `Adoption Meeting Schedule for ${petName}`,
            html: `
              <h2>Adoption Meeting Scheduled</h2>
              <p>Dear ${firstName} ${lastName},</p>
              <p>Thank you for applying to adopt ${petName}. We have scheduled a meeting for you to meet ${petName}.</p>
              <p>
                <strong>Date:</strong> ${meetingDate.toLocaleDateString(
                  "en-IN"
                )}<br>
                <strong>Time:</strong> ${meetingTime} IST<br>
                <strong>Location:</strong> 123 Adoption Street, Hyderabad, Telangana 522202
              </p>
              <p>Please arrive 10 minutes early. Bring any questions you may have about ${petName}.</p>
              <p>We look forward to meeting you!</p>
              <p>Best regards,<br>Pet Adoption Team</p>
            `,
          };

          try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${email} for meeting at ${meetingTime}`);

            // Update application status to "viewed" after email is sent
            await adoptionsCollection.updateOne(
              { _id: applicationId },
              { $set: { status: "viewed", updatedAt: new Date() } }
            );
            console.log(
              `Application ${applicationId} status updated to viewed`
            );
          } catch (error) {
            console.error("Error sending email:", error);
          }
        });

        res.status(201).json({
          message: "Adoption application submitted successfully",
          applicationId,
          application: {
            _id: applicationId,
            petId,
            adopterId,
            applicantInfo: {
              firstName,
              lastName,
              email,
              phone,
              address,
              city,
              state,
              zip,
              housingType,
              experience,
              additionalInfo,
              agreement,
              petName,
            },
            status: "pending",
            createdAt: new Date(),
            pet: pet || null,
          },
        });
      } catch (error) {
        console.error("Error submitting adoption application:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Add an endpoint to check application status (useful for polling)
    app.get("/adoptions/:applicationId", async (req, res) => {
      const { applicationId } = req.params;
      if (!applicationId) {
        return res.status(400).json({ error: "Application ID is required" });
      }

      try {
        const application = await adoptionsCollection.findOne({
          _id: new ObjectId(applicationId),
        });

        if (!application) {
          return res.status(404).json({ error: "Application not found" });
        }

        // Find the associated pet
        let pet = null;
        if (application.petId) {
          pet = await petsCollection.findOne({
            $or: [
              { id: application.petId },
              { id: parseInt(application.petId) },
              { id: application.petId.toString() },
            ],
          });
        }

        application.pet = pet;
        res.json(application);
      } catch (error) {
        console.error("Error fetching application:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Pet Adoption backend is working");
});

app.listen(port, () => {
  console.log(`Pet Adoption backend server is running on port ${port}`);
});
