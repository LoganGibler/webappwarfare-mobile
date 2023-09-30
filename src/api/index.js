import { storage } from "../firebase.js";
import { ref } from "firebase/storage";
import axios from "axios";

const env = "main";
if (env === "main") {
  var BASE = "https://waw-node-js-api.onrender.com";
} else {
  var BASE = "http://localhost:8000";
}
// console.log(process.env.REACT_APP_API_PASS);
const api_pass = process.env.REACT_APP_API_PASS;
// USER API CALLS

export async function getUserByID(_id) {
  try {
    const { data } = await axios.post(`${BASE}/getUserByID`, {
      _id: _id,
      api_pass: api_pass,
    });
    // console.log("data", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createUser(username, password) {
  try {
    const user = await axios.post(`${BASE}/Register`, {
      username: username,
      password: password,
      api_pass: api_pass,
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(username, password) {
  try {
    const user = await axios.post(`${BASE}/Login`, {
      username: username,
      password: password,
      api_pass: api_pass,
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUserByUsername(username) {
  try {
    const user = await axios.post(`${BASE}/getUserByUsername`, {
      username: username,
      api_pass: api_pass,
    });
    // console.log("response from frontend api:", user);
    return user;
  } catch (error) {
    throw error;
  }
}
/////////////////////////////////////////////////////////////////
// GUIDE API CALLS
export async function getAllPublishedGuides() {
  try {
    const { data } = await axios.post(`${BASE}/allPublishedGuides`, {
      api_pass: api_pass,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// export async function getPublishedUnapprovedGuides() {
//   try {
//     const { data } = axios.post(`${BASE}/getPublishedunapprovedGuides`, {
//       api_pass: api_pass,
//     });
//     return data
//   } catch (error) {
//     throw error;
//   }
// }

export async function getGuidesBySearch(search) {
  try {
    const { data } = await axios.post(`${BASE}/getGuidesBySearch`, {
      search: search,
      api_pass: api_pass,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getFeaturedGuides() {
  try {
    const { data } = await axios.post(`${BASE}/getFeaturedGuides`, {
      api_pass: api_pass,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
export async function unpublishGuide(_id) {
  try {
    const { data } = axios.post(`${BASE}/unpublishGuide`, {
      _id: _id,
      api_pass: api_pass,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
export async function publishGuide(_id) {
  try {
    const { data } = await axios.post(`${BASE}/publishGuide`, {
      _id: _id,
      api_pass: api_pass,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteGuide(_id) {
  try {
    const { data } = await axios.post(
      `${BASE}/removeGuided126d2c7cd71ad50a20e59f89afaf380`,
      {
        _id: _id,
        api_pass: api_pass,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getGuideByID(_id) {
  try {
    const { data } = await axios.post(`${BASE}/getBlogById`, {
      _id: _id,
      api_pass: api_pass,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPublishedUnapprovedGuides() {
  try {
    const { data } = await axios.post(`${BASE}/getPublishedUnapprovedGuides`, {
      api_pass: api_pass,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getGuidesByUsername(author) {
  try {
    const { data } = await axios.post(`${BASE}/getGuidesByAuthor`, {
      author: author,
      api_pass: api_pass,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDescription(id, description) {
  try {
    const { data } = await axios.post(`${BASE}/updateDescription`, {
      id: id,
      description: description,
      api_pass: api_pass,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addStep(_id, step) {
  // console.log("_id on api:", _id);
  // console.log("step on api:", step);
  try {
    const { data } = await axios.post(`${BASE}/addstep`, {
      _id: _id,
      step: step,
      api_pass: api_pass,
    });

    // console.log("this is data after frontend api", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteStep(_id, index) {
  try {
    // console.log("This is passed in index", index);
    const deletedStep = await axios.post(`${BASE}/deleteStep`, {
      _id: _id,
      index: index,
      api_pass: api_pass,
    });

    return deletedStep;
  } catch (error) {
    throw error;
  }
}

export async function updateSteppie(id, index, newStepData) {
  try {
    const { data } = await axios.post(`${BASE}/updateStep`, {
      id: id,
      index: index,
      newStepData: newStepData,
      api_pass: api_pass,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createGuide(
  vmtitle,
  hostedby,
  description,
  difficulty,
  author
) {
  let published = false;
  let featured = false;
  let approved = false;
  let preformattedDate = new Date();
  let day = preformattedDate.getDate();
  let month = preformattedDate.getMonth() + 1;
  let year = preformattedDate.getFullYear();
  let date = `${month}-${day}-${year}`;

  try {
    const { data } = await axios.post(`${BASE}/createPost`, {
      vmtitle: vmtitle,
      hostedby: hostedby,
      description: description,
      published: published,
      author: author,
      date: date,
      difficulty: difficulty,
      approved: approved,
      featured: featured,
      api_pass: api_pass,
    });

    // console.log("this is data after frontend api", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function approveGuide(_id) {
  try {
    const { data } = await axios.post(`${BASE}/approveGuide`, {
      _id: _id,
      api_pass: api_pass,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function rejectGuide(_id) {
  try {
    const { data } = await axios.post(`${BASE}/rejectGuide`, {
      _id: _id,
      api_pass: api_pass,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
