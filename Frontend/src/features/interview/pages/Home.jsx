import React from "react";
import "../style/home.scss";

const Home = () => {
  return (
    <main className="home">
      <div className="interview-input-group">
        <div className="left">
          <label htmlFor="jobDescription">
            <strong>Job Description</strong>
          </label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder="Enter the job description here"
          ></textarea>
        </div>
        <div className="right">
          <div className="input-group">
            <p>
              <strong>Resume </strong>
              <small className="highlight">
                (Use resume and self-description together for best results.)
              </small>
            </p>
            <label htmlFor="resume" className="file-label">
              Upload Resume
            </label>
            <input hidden type="file" id="resume" name="resume" accept=".pdf" />
          </div>
          <div className="input-group">
            <label htmlFor="selfDescription">
              <strong>Self Description</strong>
            </label>
            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Describe yourself here"
            ></textarea>
          </div>
          <button className="button primary-button">
            Generate Interview Report
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
