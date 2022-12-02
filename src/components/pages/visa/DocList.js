import React from "react";

const DocList = () => {
  return (
    <>
      <div>
        <h4 className="title mt-5">List of Documents</h4>
        <div className="name-detail">
          <div className="list-of-documents">
            <h6>IDENTITY</h6>
            <div className="list-of-documents-wrapper">
              <div>
                <div className="list-of-documents-img">
                  <img src="assets/images/passbook.svg" alt="passbook" />
                </div>
                <div className="list-of-documents-text">
                  <h4>Passport Front</h4>
                  <p>Upload colored passport copies.</p>
                  <p>
                    Passport should be valid 6 months from the date of entry in
                    UAE.
                  </p>
                </div>
              </div>
              <div>
                <div className="list-of-documents-img">
                  <img src="assets/images/passbook.svg" alt="passbook" />
                </div>
                <div className="list-of-documents-text">
                  <h4>Passport Back</h4>
                  <p>Upload colored passport copies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocList;
