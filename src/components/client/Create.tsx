import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/style.create.css";

export interface IValues {
  dob: string;
  name: string;
  email: string;
  status: string;
}

export interface IFormState {
  [key: string]: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}

const Create: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = React.useState<IFormState>({
    dob: "",
    name: "",
    email: "",
    values: [],
    status: "",
    loading: false,
    submitSuccess: false,
  });

  const processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setFormState({ ...formState, loading: true });

    const formData = {
      dob: formState.dob,
      name: formState.name,
      email: formState.email,
      status: formState.status,
    };

    setFormState({
      ...formState,
      submitSuccess: true,
      values: [...formState.values, formData],
      loading: false,
    });

    axios.post(`http://localhost:3001/clients`, formData).then((data) => [
      setTimeout(() => {
        navigate("/");
      }, 1500),
    ]);
  };

  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleDropdownChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const { submitSuccess, loading } = formState;

  return (
    <div>
      <div className={"col-md-12 form-wrapper"}>
        <h2> Create Client </h2>
        {!submitSuccess && (
          <div className="alert alert-info" role="alert">
            Fill the form below to create a new client
          </div>
        )}

        {submitSuccess && (
          <div className="alert alert-info" role="alert">
            The form was successfully submitted!
          </div>
        )}

        <form id="create-client-form" onSubmit={processFormSubmission}>
          <div className="form-group col-md-12">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => handleInputChanges(e)}
              name="name"
              className="form-control"
              placeholder="Enter client's name"
              required
            />
          </div>

          <div className="form-group col-md-12">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => handleInputChanges(e)}
              name="email"
              className="form-control"
              placeholder="Enter client's email email"
              required
            />
          </div>

          <div className="form-group col-md-12">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="text"
              id="dob"
              onChange={(e) => handleInputChanges(e)}
              name="dob"
              className="form-control"
              placeholder="Enter client's Date of Birth"
              required
            />
          </div>

          <div className="form-group col-md-12">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              onChange={(e) => handleDropdownChanges(e)}
              name="status"
              className="form-control"
              required
            >
              <option value="">Select status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="PENDING">PENDING</option>
              <option value="BLOCKED">BLOCKED</option>
            </select>
          </div>

          <div className="form-group col-md-4 pull-right">
            <button className="btn btn-success" type="submit">
              Create Client
            </button>
            {loading && <span className="fa fa-circle-o-notch fa-spin" />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
