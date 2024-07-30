## React EntropyKey

EntropyKey is a React component that generates unique tokens by leveraging the camera feed for randomness. This makes it suitable for creating secure identifiers, such as passwords.

## Installation

To install the package, use npm:

```bash
npm install react-entropykey
```

## Usage
First, import the EntropyKey component into your React application:

```javascript
import React from 'react'
import EntropyKey from "react-entropykey"

const ReactEntropyKey = () => {
  return (
    <div>
      <EntropyKey character="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" tokenlen={16} />
    </div>
  )
}

export default ReactEntropyKey


export default App;

```

# Props

* character: (Optional) A string of characters to use for generating the token. If not provided, a default set including alphanumeric and special characters is used.
* tokenlen: (Optional) Specifies the length of the generated token. The default length is 16 characters.

## Example
```javascript
<EntropyKey character="ABC123" tokenlen={8} />
```

## How It Works

EntropyKey captures an image from the user's camera feed and extracts data from the image to generate a random token. This ensures high entropy and randomness, making it suitable for secure applications.

## License
This project is licensed under the ISC License.

## Author
Amruth L P

[GitHub](https://github.com/AmruthLP12/react-entropykey.git)
