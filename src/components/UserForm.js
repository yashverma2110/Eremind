import React, { useState } from "react";
import { addReminder } from "../apis/api";
import "../styles/form.css";

export const UserForm = ({ setMsg, logsRefresh, setLogsRefresh }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    let error = { ...errors };
    if (!data?.origin_lon) error.origin_lon = true;
    else delete error.origin_lon;
    if (!data?.origin_lat) error.origin_lat = true;
    else delete error.origin_lat;
    if (!data?.destination_lon) error.destination_lon = true;
    else delete error.destination_lon;
    if (!data?.destination_lat) error.destination_lat = true;
    else delete error.destination_lat;
    if (!data?.time) error.time = true;
    else delete error.time;
    if (!data?.email || !emailRegx.test(data.email)) error.email = true;
    else delete error.email;
    setErrors(error);
  };

  const handleChangeInput = ({ target }) => {
    const temp = { ...formData };
    temp[target.name] = target.value;
    validate(temp);
    setFormData(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate(formData);
    const check = Object.keys(errors) !== 0;
    if (check) {
      const origins = [formData.origin_lat, formData.origin_lon];
      const destination = [formData.destination_lat, formData.destination_lon];
      addReminder(
        { origins, destination, time: formData.time, email: formData.email },
        apiCallback
      );
    }
  };

  const apiCallback = (data) => {
    console.log(data);
    if (data?.error) setMsg({ background: "red", msg: data.error });
    else
      setMsg({
        background: "green",
        msg: `Reminder set for ${data.reminderTime[0]}:${data.reminderTime[1]}`,
      });
    setLogsRefresh(!logsRefresh);
  };

  return (
    <form id="form">
      <div className="form-field" style={{ flexDirection: "column" }}>
        <span>Source</span>
        <div>
          <input
            type="number"
            name="origin_lat"
            onChange={handleChangeInput}
            placeholder="latitude"
            style={{
              border: `1px solid ${
                errors?.origin_lat && errors.origin_lat !== ""
                  ? "red"
                  : "#396afc"
              }`,
            }}
          />
          <input
            type="number"
            name="origin_lon"
            onChange={handleChangeInput}
            placeholder="longitude"
            style={{
              border: `1px solid ${
                errors?.origin_lon && errors.origin_lon !== ""
                  ? "red"
                  : "#396afc"
              }`,
            }}
          />
        </div>
      </div>
      <div className="form-field" style={{ flexDirection: "column" }}>
        <span>Destination</span>
        <div>
          <input
            type="number"
            name="destination_lat"
            onChange={handleChangeInput}
            placeholder="latitude"
            style={{
              border: `1px solid ${
                errors?.destination_lat && errors.destination_lat !== ""
                  ? "red"
                  : "#396afc"
              }`,
            }}
          />
          <input
            type="number"
            name="destination_lon"
            onChange={handleChangeInput}
            placeholder="longitude"
            style={{
              border: `1px solid ${
                errors?.destination_lon && errors.destination_lon !== ""
                  ? "red"
                  : "#396afc"
              }`,
            }}
          />
        </div>
      </div>
      <div className="form-field">
        <span>Time</span>
        <input
          type="time"
          name="time"
          onChange={handleChangeInput}
          style={{
            border: `1px solid ${
              errors?.time && errors.time !== "" ? "red" : "#396afc"
            }`,
          }}
        />
      </div>
      <div className="form-field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          style={{
            border: `1px solid ${
              errors?.email && errors.email !== "" ? "red" : "#396afc"
            }`,
          }}
          onChange={handleChangeInput}
        />
      </div>
      <button type="submit" className="btn" onClick={handleSubmit}>
        Remind Me
      </button>
    </form>
  );
};

const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
