import { useEffect } from "react";
import "./App.css";

function App() {
  // •	Write a function to flatten a deeply nested array.

  // ************************************************************

  function flattenArray(arr) {
    return arr.reduce((acc, item) => {
      // If the item is an array, flatten it
      if (Array.isArray(item)) {
        acc.push(...flattenArray(item));
      } else {
        // Push the item to the accumulator
        acc.push(item);
      }
      return acc;
    }, []);
  }

  const nestedArray = [1, [2, [3, [4, 5], 6], 7], [8, [9, 10]], 11];
  const flattened = flattenArray(nestedArray);
  console.log(flattened);

  // Flatten all levels in the the array
  const flattenedArray = nestedArray.flat(Infinity);
  console.log(flattenedArray);

  // *************************************************************

  // •	The function should take an object as input and return a new object that is a deep copy, meaning changes in the cloned object should not affect the original.

  // *************************************************************

  const userDetails = {
    firstName: "Sam",
    lastname: "Rogers",
    contacts: ["0772222222", "0773333333"],
  };

  function deepCopyObject(obj) {
    // Check if the input is an object or not
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    // Create an array or object to hold the values
    const copy = Array.isArray(obj) ? [] : {};

    // Copy each property
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepCopyObject(obj[key]);
      }
    }

    return copy;
  }

  const copiedObject = deepCopyObject(userDetails);
  console.log(copiedObject);

  // Modifying the user details
  copiedObject.firstName = "George";
  copiedObject.lastname = "Piers";
  copiedObject.contacts.push("0754444444");

  console.log("original object", userDetails);
  console.log("copied object", copiedObject);

  // **************************************************************

  const checkPalindrome = (str) => {
    // remove spaces, commas, semicolons, and single quotes.
    // make all letters to lowercase.
    const normalStr = str.replace(/[\s,;’]/g, "").toLowerCase();
    // split the string into an array of substrings.
    // reverse the array
    // join the substrings to string
    const reverseStr = normalStr.split("").reverse().join("");

    if (normalStr === reverseStr) {
      return "It's a palindrome string";
    } else {
      return "It's not a palindrome string";
    }
  };

  const string = "I made border bard’s drowsy swords; drab, red robed am I";
  const result = checkPalindrome(string);

  // ************************************************************

  useEffect(() => {
    const buttons = document.querySelectorAll("button");

    const handleClick = (e) => {
      e.preventDefault();
      console.log(e.target.innerText, "clicked!");
    };

    buttons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    };
  }, []);

  // // Query the DOM for all button elements
  // const buttons = document.querySelectorAll("button");

  // // Event handler function
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const buttonText = e.target.innerText;
  //   console.log(`${buttonText} clicked!`);
  // };

  // // Attach event listeners to each button
  // buttons.forEach((button) => {
  //   button.addEventListener("click", handleClick);
  // });

  // // Add event listeners after the DOM has loaded
  // document.addEventListener("DOMContentLoaded", handleClick);

  // Review the below code, debug and provide recommendations on how to fix and improve it. Choose either language

  // ******************************************************************

  async function fetchUserData(userIds) {
    try {
      const users = await Promise.all(
        userIds.map((id) => {
          return new Promise((res, rej) => {
            getUser(id, (user) => {
              user ? res(user) : rej(`Error fetching user ID ${id}`);
            });
          });
        })
      );
      console.log("All users fetched:", users);
    } catch (error) {
      console.log("Not all users were fetched.", error);
    }
  }

  // Simulated async API call
  function getUser(id, callback) {
    setTimeout(() => {
      callback({ id: id, name: "User" + id });
    }, Math.random() * 1000);
  }

  // Example usage
  let userIds = [1, 2, 3, 4, 5];
  fetchUserData(userIds);

  return (
    <div className="App">
      <h2>Question 01</h2>
      <h4>
        Write a function to check if a given string is a palindrome. The
        function should ignore case and spaces.
      </h4>
      <p>
        {string}: <strong>{result}</strong>
      </p>
      <hr />
      <h1>Question 04</h1>
      <h4>
        The function should query the DOM for all button elements, attach event
        listeners, and handle the event
      </h4>
      <button>btn 1</button> &nbsp;
      <button>btn 2</button> &nbsp;
      <button>btn 3</button> &nbsp;
    </div>
  );
}

export default App;
