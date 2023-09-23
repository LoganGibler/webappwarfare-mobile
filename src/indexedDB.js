import Dexie from "dexie";

export const db = new Dexie("WAW_DB");

db.version(1).stores({
  user: "++id, _id, username, logStatus",
});

// import { useLiveQuery } from "dexie-react-hooks";
// import { db } from "../../indexedDB";

// const { user } = db;
//   const allItems = useLiveQuery(() => user.toArray(), []);

// let [activeUser, setActiveUser] = useState([]);

// in useeffect:
// if (allItems) {
//       var userQuery = allItems[0];
//       setActiveUser(userQuery);
//     }
