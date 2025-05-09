import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaw, FaCheck, FaClock, FaExclamationTriangle } from "react-icons/fa";
import { useUserAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const ApplicationsPage = () => {
  const { user, isAuthenticated } = useUserAuth();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submittedApplicationId, setSubmittedApplicationId] = useState(null);
  const [pollingApplications, setPollingApplications] = useState({});

  const fetchApplications = async () => {
    if (!isAuthenticated || !user) {
      setApplications([]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/adoptions?userId=${encodeURIComponent(
          user.uid
        )}&role=adopter`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();

      const formattedApplications = data.map((app) => ({
        id: app._id,
        petName: app.applicantInfo?.petName || app.pet?.name || "Unknown Pet",
        petImage: app.pet?.images?.[0] || "https://via.placeholder.com/150",
        submittedDate: app.createdAt,
        status: app.status,
        shelterName: app.pet?.shelterName || "Adoption Agency",
      }));

      setApplications(formattedApplications);
      setIsLoading(false);

      // Start polling for pending applications
      data.forEach((app) => {
        if (app.status === "pending" && !pollingApplications[app._id]) {
          startPollingApplication(app._id);
        }
      });
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to load your applications. Please try again later.");
      setIsLoading(false);
    }
  };

  const startPollingApplication = (applicationId) => {
    if (pollingApplications[applicationId]) return;

    console.log(`Starting to poll application ${applicationId}`);

    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/adoptions/${applicationId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch application status");
        }

        const application = await response.json();

        if (application.status !== "pending") {
          setApplications((prevApplications) =>
            prevApplications.map((app) =>
              app.id === applicationId
                ? {
                    ...app,
                    status: application.status,
                  }
                : app
            )
          );

          stopPollingApplication(applicationId);

          if (applicationId === submittedApplicationId) {
            setSubmittedApplicationId(null);
          }

          console.log(
            `Application ${applicationId} status updated to ${application.status}`
          );
        }
      } catch (error) {
        console.error(`Error polling application ${applicationId}:`, error);
      }
    }, 3000);

    setPollingApplications((prev) => ({
      ...prev,
      [applicationId]: intervalId,
    }));
  };

  const stopPollingApplication = (applicationId) => {
    if (pollingApplications[applicationId]) {
      clearInterval(pollingApplications[applicationId]);
      setPollingApplications((prev) => {
        const updated = { ...prev };
        delete updated[applicationId];
        return updated;
      });
      console.log(`Stopped polling application ${applicationId}`);
    }
  };

  useEffect(() => {
    fetchApplications();

    return () => {
      Object.values(pollingApplications).forEach((intervalId) => {
        clearInterval(intervalId);
      });
      setPollingApplications({});
    };
  }, [isAuthenticated, user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="text-yellow-600" />;
      case "viewed":
        return <FaCheck className="text-green-600" />;
      case "error":
        return <FaExclamationTriangle className="text-red-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "viewed":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "viewed":
        return "Your application was viewed";
      case "error":
        return "Error processing application";
      default:
        return status;
    }
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150";
    e.target.onerror = null;
  };

  const handleSubmitApplication = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/adoptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Application submitted:", data);

        if (data.application) {
          const newApplication = {
            id: data.applicationId,
            petName: formData.applicantInfo.petName,
            petImage:
              data.application.pet?.images?.[0] ||
              "https://via.placeholder.com/150",
            submittedDate: new Date().toISOString(),
            status: "pending",
            shelterName: data.application.pet?.shelterName || "Adoption Agency",
          };

          setApplications((prev) => [newApplication, ...prev]);
          setSubmittedApplicationId(data.applicationId);
          startPollingApplication(data.applicationId);
        }

        fetchApplications();
      } else {
        const errorData = await response.json();
        console.error("Failed to submit application:", errorData);
        setError(
          errorData.error ||
            "Failed to submit your application. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("An error occurred while submitting your application.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              My Applications
            </h1>
            <p className="text-gray-500 text-base">
              Track the status of your adoption applications
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : applications.length > 0 ? (
            <div className="space-y-6">
              {applications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                      <div className="flex-shrink-0 mb-4 md:mb-0">
                        <img
                          src={application.petImage}
                          alt={application.petName}
                          className="w-24 h-24 rounded-lg object-cover"
                          onError={handleImageError}
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h2 className="text-xl font-semibold mb-2 md:mb-0">
                            {application.petName}
                          </h2>
                          <span
                            className={`px-3 py-1 rounded-full text-sm flex items-center ${getStatusClass(
                              application.status
                            )} whitespace-nowrap mt-2 md:mt-0`}
                          >
                            <span className="mr-2">
                              {getStatusIcon(application.status)}
                            </span>
                            {getStatusText(application.status)}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          {application.shelterName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Submitted on{" "}
                          {new Date(
                            application.submittedDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPaw className="text-2xl text-primary-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                No Applications Yet
              </h2>
              <p className="text-gray-600 mb-6">
                You haven't submitted any adoption applications yet.
              </p>
              <a href="/pets" className="btn-primary btn-lg">
                Find Your Perfect Pet
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ApplicationsPage;
