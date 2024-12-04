import { useState, useEffect } from "react";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [receiver, setReceiver] = useState();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));

        const response = await fetch(
          "http://localhost:8000/api/v1/request/get-receiveres",
          {
            method: "POST", // Specify the request method
            headers: {
              "Content-Type": "application/json", // Indicate JSON payload
            },
            body: JSON.stringify({
              sender: userData.data._id, // Send the sender ID in the request body
            }),
          }
        ); // Replace with your API endpoint
        const data = await response.json();
        console.log("sender data : ", data);

        setReceiver(data.receiversData);

        // if (data && data.filteredUsers) {
        //   setAllUsers(data.filteredUsers);
        // } else if (Array.isArray(data)) {
        //   setAllUsers(data);
        // } else {
        //   console.error("Unexpected data format:", data);
        // }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return [receiver, loading];
}

export default useGetAllUsers;

// import { useState, useEffect } from "react";

// function useGetAllUsers() {
//   const [allUsers, setAllUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("userData"));
//     const token = userData?.accessToken;

//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:8000/api/v1/users/getUserProfile",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`, // Optional if auth required
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }

//         const data = await response.json();
//         setAllUsers(data.filteredUsers);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return [allUsers, loading];
// }

// export default useGetAllUsers;
