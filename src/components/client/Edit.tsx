import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import '../../styles/style.edit.css'

export interface IValues {
  [key: string]: any;
}

export interface IFormState {
  id: number;
  client: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}

const EditClient: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<IFormState>({
    id: Number(id),
    client: {},
    values: [],
    loading: false,
    submitSuccess: false,
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/clients/${state.id}`).then((response) => {
      setState((prevState) => ({ ...prevState, client: response.data }));
    });
  }, [state.id]);

  const processFormSubmission = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, loading: true }));

    axios
      .patch(`http://localhost:3001/clients/${state.id}`, state.values)
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          submitSuccess: true,
          loading: false,
        }));
        setTimeout(() => {
          navigate("/");
        }, 1500);
      });
  };

  const setValues = (values: IValues) => {
    setState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, ...values },
    }));
  };

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValues({ [e.currentTarget.id]: e.currentTarget.value });
  };

  const { submitSuccess, loading, client } = state;

  return (
    <div className="App">
      {client && (
        <div>
          <div>
            <div className="col-md-12 form-wrapper">
              <h2>Edit Client</h2>

              {submitSuccess && (
                <div className="alert alert-info" role="alert">
                  Client's details have been edited successfully
                </div>
              )}

              <form
                id="create-post-form"
                onSubmit={processFormSubmission}
                noValidate
              >
                <div className="form-group col-md-12">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={client.name}
                    onChange={handleInputChanges}
                    name="name"
                    className="form-control"
                    placeholder="Enter client's name"
                  />
                </div>

                <div className="form-group col-md-12">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={client.email}
                    onChange={handleInputChanges}
                    name="email"
                    className="form-control"
                    placeholder="Enter client's email address"
                  />
                </div>

                <div className="form-group col-md-12">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="text"
                    id="dob"
                    defaultValue={client.dob}
                    onChange={handleInputChanges}
                    name="dob"
                    className="form-control"
                    placeholder="Enter client's Date of Birth"
                  />
                </div>

                <div className="form-group col-md-12">
                  <label htmlFor="status">Status</label>
                  <input
                    type="text"
                    id="status"
                    defaultValue={client.status}
                    onChange={handleInputChanges}
                    name="status"
                    className="form-control"
                    placeholder="Enter client's status"
                  />
                </div>

                <div className="form-group col-md-4 pull-right">
                  <button className="btn btn-success" type="submit">
                    Edit Client
                  </button>
                  {loading && <span className="fa fa-circle-o-notch fa-spin" />}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditClient;
