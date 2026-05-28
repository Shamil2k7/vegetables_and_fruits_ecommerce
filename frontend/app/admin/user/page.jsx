"use client";

import React,
{
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./block.css";
// import "../AdminDashboard.css";

export default function UsersPage() {

  const [users, setUsers] =
    useState([]);

  const fetchUsers =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(

            "http://localhost:5000/api/auth/all",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }

          );

        setUsers(
          response.data.users
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchUsers();

  }, []);

  /* =========================
     BLOCK USER
  ========================= */

  const handleBlock =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(

          `http://localhost:5000/api/auth/block/${id}`,

          {},

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );

        fetchUsers();

      } catch (error) {

        console.log(error);

      }

    };

  /* =========================
     UNBLOCK USER
  ========================= */

  const handleUnblock =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(

          `http://localhost:5000/api/auth/unblock/${id}`,

          {},

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );

        fetchUsers();

      } catch (error) {

        console.log(error);

      }

    };

 return (
  <div className="users-page">
    <h1>User Management</h1>

    <table className="management-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              {/* Added a dynamic class for the text color of the status */}
              <span className={user.isBlocked ? "status-blocked" : "status-active"}>
                {user.isBlocked ? "Blocked" : "Active"}
              </span>
            </td>
            <td>
              {user.isBlocked ? (
                <button
                  className=" unblock-btn"
                  onClick={() => handleUnblock(user._id)}
                >
                  Unblock
                </button>
              ) : (
                <button
                  className="block-btn"
                  onClick={() => handleBlock(user._id)}
                >
                  Block
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}