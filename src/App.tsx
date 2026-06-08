import React, { useState } from 'react'
import axios from 'axios'
import { api } from './api/api'

function App() {
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [name, setName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [petIndex, setPetIndex] = useState("")
  const [petName, setPetName] = useState("")
  const [colorIndex, setColorIndex] = useState("")
  const [colors, setColors] = useState("")

  const handleError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      setError(
        err.response?.data?.error || "Server error"
      );
    }
  };

  const sign = async () => {
    try {
      setError("");

      const response = await api.post("/sign", {
        name,
      });

      setResult(
        JSON.stringify(response.data, null, 2)
      );
    } catch (err) {
      handleError(err);
    }
  };

  const check = async () => {
    try {
      setError("");

      const response = await api.post("/check", {
        name,
      });

      setResult(
        JSON.stringify(response.data, null, 2)
      );
    } catch (err) {
      handleError(err);
    }
  };

  const create = async () => {
    try {
      setError("");

      const response = await api.post("/create", {
        firstName,
        lastName,
      });

      setResult(
        JSON.stringify(response.data, null, 2)
      );
    } catch (err) {
      handleError(err);
    }
  };

  const addPet = async () => {
    try {
      setError("");

      const response = await api.post("/pet", {
        index: Number(petIndex),
        pet: petName,
      });

      setResult(
        JSON.stringify(response.data, null, 2)
      );
    } catch (err) {
      handleError(err);
    }
  };

  const addColors = async () => {
    try {
      setError("");

      const colorsArray = colors
        .split(",")
        .map((item) => item.trim());

      const response = await api.post("/colors", {
        index: Number(colorIndex),
        colors: colorsArray,
      });

      setResult(
        JSON.stringify(response.data, null, 2)
      );
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users App</h1>

      <h2>Sign</h2>

      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Name"
      />

      <button onClick={sign}>
        Sign
      </button>

      <button onClick={check}>
        Check
      </button>

      <hr />

      <h2>Create</h2>

      <input
        value={firstName}
        onChange={(e) =>
          setFirstName(e.target.value)
        }
        placeholder="First name"
      />

      <input
        value={lastName}
        onChange={(e) =>
          setLastName(e.target.value)
        }
        placeholder="Last name"
      />

      <button onClick={create}>
        Create
      </button>

      <hr />

      <h2>Add Pet</h2>

      <input
        value={petIndex}
        onChange={(e) =>
          setPetIndex(e.target.value)
        }
        placeholder="Index"
      />

      <input
        value={petName}
        onChange={(e) =>
          setPetName(e.target.value)
        }
        placeholder="Pet"
      />

      <button onClick={addPet}>
        Add Pet
      </button>

      <hr />

      <h2>Add Colors</h2>

      <input
        value={colorIndex}
        onChange={(e) =>
          setColorIndex(e.target.value)
        }
        placeholder="Index"
      />

      <input
        value={colors}
        onChange={(e) =>
          setColors(e.target.value)
        }
        placeholder="red, green, blue"
      />

      <button onClick={addColors}>
        Add Colors
      </button>

      <hr />

      {error && (
        <h3 style={{ color: "red" }}>
          {error}
        </h3>
      )}

      <pre>{result}</pre>
    </div>
  );
}

export default App;