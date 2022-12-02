import React from "react";

const SightForm = () => {
  return (
    <>
      <div class="catgories-detail position-relative">
        <form action="">
          <div class="form-group position-relative">
            <div class="categories-icon">
              <img src="assets/images/location.svg" alt="location" />
            </div>
            <div class="categories-detail-list">
              <label for="">Airport</label>
              <input type="search" placeholder="Dubai, United Arab... " />
            </div>
          </div>
          <div class="form-group">
            <div class="categories-icon">
              <img src="assets/images/location.svg" alt="location" />
            </div>
            <div class="categories-detail-list">
              <label for="">Date</label>
              <input type="date" placeholder="01/07/2022" />
            </div>
          </div>
          <div>
            <a
              href="sightseeing-lists.php"
              class="cmn-btn search-btn position-absolute"
            >
              Search
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default SightForm;
