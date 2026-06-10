import React, { useState } from 'react'
import axios from 'axios'
import { api } from './api/api'

function App() {
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [petIndex, setPetIndex] = useState<number>(0)
  const [petName, setPetName] = useState<string>("")
  const [colorIndex, setColorIndex] = useState<number>(0)
  const [colors, setColors] = useState<String[]>([])

  const handleError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      setError(
        err.response?.data?.error || "Server error"
      );
    }
  };

  import { SignDto } from './types/types'

  const sign = async () => {
    try {
      setError("");

      const data: SignDto = {
        name,
      }

      const response = await api.post("/sign", data)

      setResult(
        JSON.stringify(response.data, null, 2)
      );
    } catch (err) {
      handleError(err);
    }
  };

  import { CheckDto } from './types/types'

  const check = async () => {
    try {
      setError("");

      const data: CheckDto = {
        name,
      }

      const response = await api.post("/check", data)

      setResult(
        JSON.stringify(response.data, null, 2)
      );
    } catch (err) {
      handleError(err);
    }
  };

  import { CreateDto } from './types/types'

  const create = async () => {
    try {
      setError("");

      const data: CreateDto = {
        firstName,
        lastName,
      }

      const response = await api.post("/create", data)

      setResult(
        JSON.stringify(response.data, null, 2)
      );
    } catch (err) {
      handleError(err);
    }
  };

  import { PetDto } from './types/types'

  const addPet = async () => {
    try {
      setError("");

      const data: PetDto = {
        index: petIndex,
        pet: petName,
      }

      const response = await api.post("/pet", data)

      setResult(
        JSON.stringify(response.data, null, 2)
      );
    } catch (err) {
      handleError(err);
    }
  };

  import { ColorsDto } from './types/types'

  const addColors = async () => {
    try {
      setError("");

      const colorsArray = colors
        .split(",")
        .map((item) => item.trim());

      const data: ColorsDto = {
        index: colorIndex,
        colors: colorsArray,
      }
      const response = await api.post("/colors", data)

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