import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/style.home.css";

interface IClient {
  id: number;
  name: string;
  dob: string;
  email: string;
  status: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [clients, setClients] = useState<IClient[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/clients").then((response) => {
      setClients(response.data);
    });
  }, []);

  const deleteClient = (id: number) => {
    axios.delete(`http://localhost:3001/clients/${id}`).then(() => {
      const updatedClients = clients.filter((client) => client.id !== id);
      setClients(updatedClients);
      navigate("/");
    });
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleFilter = (status: string) => {
    console.log("🚀 ~ file: Home.tsx:46 ~ handleFilter ~ status:", status);
    setFilterStatus(status);
  };

  const filteredClients = filterStatus
    ? clients.filter((client) => client.status === filterStatus)
    : clients;

  const sortedClients = filteredClients.sort((a, b) => {
    if (sortColumn === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div>
      {clients.length === 0 && (
        <div className="text-center">
          <h2>No client found at the moment</h2>
        </div>
      )}

      <div className="container">
        <h1>Client List App</h1>
        <div className="row">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col" onClick={() => handleSort("name")}>
                  Name{" "}
                  {sortColumn === "name" && (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th scope="col">Email</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">
                  Status
                  <div className="filter-dropdown">
                    <select onChange={(e) => handleFilter(e.target.value)}>
                      <option value="">All</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="PENDING">PENDING</option>
                      <option value="BLOCKED">BLOCKED</option>
                    </select>
                  </div>
                </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.dob}</td>
                  <td>{client.status}</td>
                  <td>
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        className="btn-group"
                        style={{ marginBottom: "20px" }}
                      >
                        <Link
                          to={`edit/${client.id}`}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit Client
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => deleteClient(client.id)}
                        >
                          Delete Client
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
