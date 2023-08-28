
import { storage } from "../firebase.js";
import { ref } from "firebase/storage";
import axios from "axios";

const env = "QA";
if (env === "main") {
  var BASE = "https://webappwarfare-api.onrender.com";
} else {
  var BASE = "http://localhost:8000";
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

  export async function getUserByID(_id) {
    try {
      const { data } = await axios.post(`${BASE}/getUserByID`, {
        _id: _id,
      });
      return data;
    } catch (error) {
      throw error;
    }
  }