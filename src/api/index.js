import { storage } from "../firebase.js";
import { ref } from "firebase/storage";
import axios from "axios";

const env = "QA";
if (env === "main") {
  var BASE = "https://webappwarfare-api.onrender.com";
} else {
  var BASE = "http://localhost:8000";
}

// USER API CALLS

export async function getUserByID(_id) {
  try {
    const { data } = await axios.post(`${BASE}/getUserByID`, {
      _id: _id,
    });
    console.log("data", data);
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
    });
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
}
/////////////////////////////////////////////////////////////////
// GUIDE API CALLS
export async function getAllPublishedGuides() {
  try {
    const { data } = await axios.get(`${BASE}/allPublishedGuides`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getGuidesBySearch(search) {
  try {
    const { data } = await axios.post(`${BASE}/getGuidesBySearch`, {
      search: search,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getFeaturedGuides() {
  try {
    const { data } = await axios.get(`${BASE}/getFeaturedGuides`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getGuideByID(_id) {
  try {
    const { data } = await axios.post(`${BASE}/getBlogById`, {
      _id: _id,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPublishedUnapprovedGuides() {
  try {
    const { data } = await axios.get(`${BASE}/getPublishedUnapprovedGuides`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getGuidesByUsername(author) {
  try {
    const { data } = await axios.post(`${BASE}/getGuidesByAuthor`, {
      author: author,
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
    });

    // console.log("this is data after frontend api", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteStep(_id, index) {
  try {
    console.log("This is passed in index", index);
    const deletedStep = await axios.post(`${BASE}/deleteStep`, {
      _id: _id,
      index: index,
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
    });

    // console.log("this is data after frontend api", data);
    return data;
  } catch (error) {
    throw error;
  }
}
