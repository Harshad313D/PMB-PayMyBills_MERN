import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers.jsx";
function Users() {
  const [receiver, loading] = useGetAllUsers();

  // console.log("Loading:", loading); // Check loading status
  // console.log("All Users:", allUsers); // Check the structure and content of allUsers

  return (
    <div
      style={{ maxHeight: "calc(84vh - 1vh )" }}
      className=" py-2 flex-scrollbar overflow-y-auto "
    >
      {/* {loading && <p>Loading...</p>} Show loading message */}
      {!receiver && <p>No users found</p>} {/* Show no users message */}
      {receiver && (
        <div>
          {/* {allUsers.map((user, index) => ( */}

          <User
            user={receiver} // pass the user object directly if User expects a `user` prop
          />
          {/* ))} */}
        </div>
      )}
    </div>
  );
}

export default Users;
