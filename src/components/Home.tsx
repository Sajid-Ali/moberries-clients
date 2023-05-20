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
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
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