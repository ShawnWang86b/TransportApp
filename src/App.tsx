import "./App.css";
import HomePage from "./pages/HomePage";
import Post from "./pages/Post";
import HomeCommute from "./pages/HomeCommute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { CommuteProvider } from "./contexts/CommuteProvider";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <CommuteProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post" element={<Post />} />
            <Route path="/home-commute" element={<HomeCommute />} />
          </Routes>
        </CommuteProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
